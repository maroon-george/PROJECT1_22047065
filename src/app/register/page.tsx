import RegisterForm from './RegisterForm';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Registration - Computer Engineering Department',
  description: 'Create your student account. Register to access the academic portal with your personal information, program details, and academic records.',
  keywords: 'student registration, academic portal, computer engineering, university signup',
  authors: [{ name: 'Computer Engineering Department' }],
  openGraph: {
    title: 'Student Registration - Computer Engineering Department',
    description: 'Create your student account and join the academic portal',
    type: 'website',
  },
}

export default function Register(){
    return (
        <div className="flex justify-center align-center">
            <RegisterForm />
        </div>
    )
} 