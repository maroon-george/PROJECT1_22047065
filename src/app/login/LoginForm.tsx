'use client'
import Form from '@/app/components/Form';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function LoginForm(){
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push('/dashboard');
                router.refresh(); // Force a refresh to update the page
            } else {
                const { error } = await res.json();
                alert(error);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form handleSubmit={handleLogin}>
            <div className="p-4">
                <p className="text-5xl font-bold text-green-950 text-center mt-2 mb-6">Login</p>
                {/* <Input label="Username" type="text" name="username" placeholder="Enter your name" /> */}
                <Input label="Email" type="email" name="email" placeholder="Enter your email" onChange={handleChange} value={form.email}/>
                <Input label="Password" type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={form.password}/>            
                <Button value={isLoading ? "Logging in..." : "Login"} disabled={isLoading}/>
                <p className="text-gray-400 text-center mt-2 font-sans text-sm">Don&apos;t have an account? <a href="/register" className="text-blue-800">Register</a></p>
            </div>
        </Form>
    )
} 