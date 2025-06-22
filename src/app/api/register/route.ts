import { PrismaClient } from '@prisma/client';
import { signToken } from '@/app/lib/jwt';
import { cookies } from 'next/headers'; 
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, program, year_of_study, password } = body;

    // Input validation
    if (!first_name || !last_name || !email || !program || !year_of_study || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Validate year of study
    if (typeof year_of_study !== 'number' || year_of_study < 1 || year_of_study > 10) {
      return NextResponse.json(
        { error: 'Year of study must be a number between 1 and 10' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.student.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.student.create({
      data: {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.toLowerCase().trim(),
        program: program.trim(),
        year_of_study,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = signToken({
      userId: user.id.toString(),
      email: user.email
    });

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    // Return success response (don't include password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { 
        success: true, 
        user: userWithoutPassword 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 