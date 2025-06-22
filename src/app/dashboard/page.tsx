import React from 'react'
import { cookies } from 'next/headers';
import { verifyToken, JWTPayload } from '@/app/lib/jwt';
import { redirect } from 'next/navigation';
import LogoutButton from '@/app/components/LogoutButton'
import { prisma } from '@/app/lib/prisma'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Dashboard - Computer Engineering Department',
  description: 'Your comprehensive student dashboard. View academic information, fees payment history, course enrollments, lecturer assignments, and teaching assistant details.',
  keywords: 'student dashboard, academic portal, fees payment, course enrollment, lecturer assignment, computer engineering',
  authors: [{ name: 'Computer Engineering Department' }],
  openGraph: {
    title: 'Student Dashboard - Computer Engineering Department',
    description: 'Access your complete academic information and records',
    type: 'website',
  },
}

const Dashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    redirect('/login');
  }

  const email = decoded.email;
  
  const currentUser = await prisma.student.findUnique({
    where: {
      email: email
    }
  });
  
  if (!currentUser) {
    redirect('/login');
  }

  // Fetch data from all tables with error handling
  let userFees = [];
  let userEnrollments = [];
  let lecturerCourses = [];
  let lecturerTAs = [];

  try {
    // Fetch fees for the current user
    userFees = await prisma.fee.findMany({
      where: {
        student_id: currentUser.id
      },
      orderBy: {
        payment_date: 'desc'
      }
    });
  } catch (error) {
    console.log('Fees table not available yet');
  }

  try {
    // Fetch enrollments for the current user
    userEnrollments = await prisma.enrollment.findMany({
      where: {
        student_id: currentUser.id
      },
      include: {
        course: true
      },
      orderBy: {
        enrollment_date: 'desc'
      }
    });
  } catch (error) {
    console.log('Enrollments table not available yet');
  }

  try {
    // Fetch lecturer-course assignments
    lecturerCourses = await prisma.lecturer_course.findMany({
      include: {
        lecturer: true,
        course: true
      },
      orderBy: {
        academic_year: 'desc'
      }
    });
  } catch (error) {
    console.log('Lecturer-course table not available yet');
  }

  try {
    // Fetch lecturer-TA assignments
    lecturerTAs = await prisma.lecturer_ta.findMany({
      include: {
        lecturer: true,
        teaching_assistant: true
      },
      orderBy: {
        academic_year: 'desc'
      }
    });
  } catch (error) {
    console.log('Lecturer-TA table not available yet');
  }
  
  return (
    <div className='flex min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50'>
      <div className="bg-gradient-to-b from-teal-700 to-teal-800 fixed h-screen w-64 p-6 text-white hidden md:block shadow-xl z-50">
        <div className="grid grid-cols-1 gap-8"> 
          <h2 className="font-bold text-lg mt-3 rounded-lg p-2 bg-white/10 backdrop-blur-sm">Computer Engineering Dashboard</h2>
          
          <a href="#" className="px-2 rounded-lg p-2 hover:bg-white/20 transition-all duration-300">Student Info</a>
          <a href="#" className="px-2 rounded-lg p-2 hover:bg-white/20 transition-all duration-300">Fees Payment</a>
          <a href="#" className="px-2 rounded-lg p-2 hover:bg-white/20 transition-all duration-300">Course Enrollment</a>
          <a href="#" className="px-2 rounded-lg p-2 hover:bg-white/20 transition-all duration-300">Lecturer-Course</a>
          <a href="#" className="px-2 rounded-lg p-2 hover:bg-white/20 transition-all duration-300">Lecturer-TA</a>
        </div>
      </div>
      
      <div className="flex-1 md:ml-64">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Welcome to the Department Dashboard</h1>
              <p className="text-gray-600 text-sm md:text-base">Logged in as: <span className="font-semibold text-cyan-700 break-all">{email}</span></p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg self-start md:self-auto">
              <LogoutButton />
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-cyan-800">Your Student Information</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Student ID</label>
                      <p className="text-base md:text-lg font-semibold text-gray-900">{currentUser.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                      <p className="text-base md:text-lg font-semibold text-gray-900">{currentUser.first_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                      <p className="text-base md:text-lg font-semibold text-gray-900">{currentUser.last_name}</p>
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                      <p className="text-base md:text-lg font-semibold text-gray-900 break-all">{currentUser.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Program</label>
                      <p className="text-base md:text-lg font-semibold text-gray-900">{currentUser.program}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Year of Study</label>
                      <p className="text-base md:text-lg font-semibold text-gray-900">{currentUser.year_of_study}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          {/* Fees Payment Section */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-cyan-800">Fees Payment History</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Payment Date</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Semester</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Academic Year</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userFees.map((fee: any) => (
                      <tr key={fee.id} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${fee.amount}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{new Date(fee.payment_date).toLocaleDateString()}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{fee.semester}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">{fee.academic_year}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            fee.status === 'PAID' ? 'bg-green-100 text-green-800' :
                            fee.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {userFees.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No fee records found.
                </div>
              )}
            </div>
          </div>

          {/* Course Enrollment Section */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-cyan-800">Course Enrollments</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Course Name</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Credits</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Semester</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Academic Year</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userEnrollments.map((enrollment: any) => (
                      <tr key={enrollment.id} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enrollment.course?.code || 'N/A'}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">{enrollment.course?.name || 'N/A'}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{enrollment.course?.credits || 'N/A'}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">{enrollment.semester}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">{enrollment.academic_year}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enrollment.grade || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {userEnrollments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No course enrollments found.
                </div>
              )}
            </div>
          </div>

          {/* Lecturer-Course Assignment Section */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-cyan-800">Lecturer-Course Assignments</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecturer</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Title</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Course</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Semester</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden 2xl:table-cell">Academic Year</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lecturerCourses.map((assignment: any) => (
                      <tr key={assignment.id} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {assignment.lecturer?.first_name} {assignment.lecturer?.last_name}
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{assignment.lecturer?.title || 'N/A'}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                          {assignment.course?.code} - {assignment.course?.name}
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">{assignment.semester}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden 2xl:table-cell">{assignment.academic_year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {lecturerCourses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No lecturer-course assignments found.
                </div>
              )}
            </div>
          </div>

          {/* Lecturer-TA Assignment Section */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-cyan-800">Lecturer-TA Assignments</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecturer</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Teaching Assistant</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Department</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden 2xl:table-cell">Semester</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden 2xl:table-cell">Academic Year</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lecturerTAs.map((assignment: any) => (
                      <tr key={assignment.id} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {assignment.lecturer?.first_name} {assignment.lecturer?.last_name}
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                          {assignment.teaching_assistant?.first_name} {assignment.teaching_assistant?.last_name}
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">{assignment.teaching_assistant?.department || 'N/A'}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden 2xl:table-cell">{assignment.semester}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden 2xl:table-cell">{assignment.academic_year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {lecturerTAs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No lecturer-TA assignments found.
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard