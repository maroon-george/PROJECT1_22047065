// import Register from 'register';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Engineering Student Portal - Welcome',
  description: 'Welcome to the Computer Engineering Student Portal. Access your academic dashboard, manage your courses, and track your progress.',
  keywords: 'student portal, computer engineering, academic dashboard, university portal',
  authors: [{ name: 'Computer Engineering Department' }],
  openGraph: {
    title: 'Computer Engineering Student Portal - Welcome',
    description: 'Welcome to the comprehensive student management system',
    type: 'website',
  },
}

const Button = ({children, href}: { children: React.ReactNode, href: string }) => {
    return (
      <Link href={href}>
        <button type="button" className="group relative bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl px-8 py-4 text-white hover:from-cyan-700 hover:to-teal-700 hover:-translate-y-2 transition-all duration-300 transform shadow-lg hover:shadow-xl font-semibold text-lg">
          <span className="relative z-10">{children}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </Link>
    )
}

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-200 to-transparent rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-200 to-transparent rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-10"></div>
      </div>

      <div className='relative z-10 p-4 md:p-8'>
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-4'>
              Welcome to
            </h1>
            <h2 className='text-3xl md:text-5xl font-bold text-gray-800 mb-6'>
              Computer Engineering Portal
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your comprehensive academic management system for tracking courses, fees, and academic progress
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Get Started Today
              </h3>
              <p className="text-gray-600 text-lg">
                Choose from the options below to access your academic dashboard
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">New Student?</h4>
                  <p className="text-gray-600 text-sm mb-4">Create your account to get started</p>
                </div>
                <Button href="/register">Register Now</Button>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full shadow-lg mb-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Returning Student?</h4>
                  <p className="text-gray-600 text-sm mb-4">Sign in to access your dashboard</p>
                </div>
                <Button href="/login">Login</Button>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 text-center mb-6">
                What you can do with our portal
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h5 className="font-semibold text-gray-800 mb-2">Academic Records</h5>
                  <p className="text-sm text-gray-600">View your grades, courses, and academic progress</p>
                </div>
                <div className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h5 className="font-semibold text-gray-800 mb-2">Fee Management</h5>
                  <p className="text-sm text-gray-600">Track payments and view fee history</p>
                </div>
                <div className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h5 className="font-semibold text-gray-800 mb-2">Course Management</h5>
                  <p className="text-sm text-gray-600">Enroll in courses and view assignments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>&copy; 2024 Computer Engineering Department. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}