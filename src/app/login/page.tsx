import LoginForm from './LoginForm';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Login - Computer Engineering Department',
  description: 'Access your student dashboard. Login to view your academic information, fees, course enrollments, and more.',
  keywords: 'student login, academic portal, computer engineering, university dashboard',
  authors: [{ name: 'Computer Engineering Department' }],
  openGraph: {
    title: 'Student Login - Computer Engineering Department',
    description: 'Access your student dashboard and academic information',
    type: 'website',
  },
}

export default function Login(){
    return (
        <div className="h-screen flex justify-center items-center ">
            <LoginForm />
        </div>
    )
}