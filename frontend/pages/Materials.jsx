// App.jsx
import React, { useState } from 'react';

export default function Materials() {
  const [activeTab, setActiveTab] = useState('overview');

  const courseData = {
    title: "Administrasi Server Linux",
    code: "ASL-2024-01",
    instructor: {
      name: "Prof. Ahmad Riyadi",
      title: "Senior System Administrator",
      avatar: "👨‍🏫",
      email: "ahmad.riyadi@devclass.id",
      students: 35
    },
    schedule: "Senin, 09:00 - 11:00 WIB",
    room: "Lab Komputer 301",
    progress: 75,
    description: "Mata kuliah ini membahas konsep dan praktik administrasi server Linux, mencakup instalasi, konfigurasi, keamanan, manajemen user, dan troubleshooting sistem operasi Linux untuk lingkungan server production.",
    materials: [
      { week: 1, topic: "Pengantar Linux & Instalasi", status: "completed" },
      { week: 2, topic: "File System & Permission", status: "completed" },
      { week: 3, topic: "User & Group Management", status: "completed" },
      { week: 4, topic: "Process Management", status: "completed" },
      { week: 5, topic: "Network Configuration", status: "ongoing" },
      { week: 6, topic: "Security & Firewall", status: "upcoming" },
      { week: 7, topic: "Web Server (Apache/Nginx)", status: "upcoming" },
      { week: 8, topic: "Database Server", status: "upcoming" }
    ],
    announcements: [
      { id: 1, title: "Perubahan Jadwal UTS", date: "2 Mar 2026", content: "UTS dimajukan menjadi minggu depan. Materi mencakup week 1-5." },
      { id: 2, title: "Tugas Kelompok", date: "28 Feb 2026", content: "Buat dokumentasi konfigurasi web server di Linux." }
    ],
    assignments: [
      { id: 1, title: "Praktikum Instalasi Linux", due: "5 Mar 2026", submitted: 28, total: 35 },
      { id: 2, title: "Konfigurasi SSH Server", due: "12 Mar 2026", submitted: 15, total: 35 }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-slate-800">DevClass</h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-700">Dashboard</a>
              <i className="fa-solid fa-chevron-right text-xs"></i>
              <a href="#" className="hover:text-slate-700">Classes</a>
              <i className="fa-solid fa-chevron-right text-xs"></i>
              <span className="text-slate-700 font-medium">Administrasi Server Linux</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full relative">
              <i className="fa-regular fa-bell text-slate-600"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <i className="fa-regular fa-message text-slate-600"></i>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">AR</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Course Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-800">{courseData.title}</h2>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {courseData.code}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4 max-w-2xl">{courseData.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-calendar text-slate-400"></i>
                  <span className="text-slate-600">{courseData.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-building text-slate-400"></i>
                  <span className="text-slate-600">{courseData.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-user text-slate-400"></i>
                  <span className="text-slate-600">{courseData.instructor.students} siswa</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm flex items-center gap-2">
                <i className="fa-regular fa-share-from-square"></i>
                Share
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2">
                <i className="fa-regular fa-bookmark"></i>
                Enrolled
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-600 font-medium mb-1">
              <span>Course Progress</span>
              <span>{courseData.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${courseData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button 
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fa-regular fa-eye"></i>
            Overview
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === 'materials' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('materials')}
          >
            <i className="fa-regular fa-folder-open"></i>
            Materials
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === 'assignments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('assignments')}
          >
            <i className="fa-regular fa-clipboard"></i>
            Assignments
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeTab === 'students' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('students')}
          >
            <i className="fa-regular fa-users"></i>
            Students
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Instructor Info */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fa-regular fa-circle-user text-blue-600"></i>
                    Instructor
                  </h3>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl">
                      {courseData.instructor.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{courseData.instructor.name}</h4>
                      <p className="text-sm text-slate-500">{courseData.instructor.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <i className="fa-regular fa-envelope text-slate-400"></i>
                          <span className="text-slate-600">{courseData.instructor.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fa-regular fa-clock text-slate-400"></i>
                          <span className="text-slate-600">Office hour: Rabu, 13:00-15:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Announcements */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fa-regular fa-bullhorn text-blue-600"></i>
                    Announcements
                  </h3>
                  <div className="space-y-4">
                    {courseData.announcements.map(announcement => (
                      <div key={announcement.id} className="border-l-4 border-blue-600 pl-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-slate-800">{announcement.title}</h4>
                          <span className="text-xs text-slate-400">{announcement.date}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{announcement.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fa-regular fa-bolt text-blue-600"></i>
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-center">
                      <i className="fa-regular fa-circle-play text-xl text-blue-600 mb-2"></i>
                      <p className="text-xs font-medium">Join Class</p>
                    </button>
                    <button className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-center">
                      <i className="fa-regular fa-file-lines text-xl text-green-600 mb-2"></i>
                      <p className="text-xs font-medium">Materials</p>
                    </button>
                    <button className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-center">
                      <i className="fa-regular fa-pen-to-square text-xl text-purple-600 mb-2"></i>
                      <p className="text-xs font-medium">Submit Task</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Course Materials</h3>
                <div className="space-y-2">
                  {courseData.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        {material.status === 'completed' ? (
                          <i className="fa-regular fa-circle-check text-green-600"></i>
                        ) : material.status === 'ongoing' ? (
                          <i className="fa-regular fa-circle-play text-blue-600"></i>
                        ) : (
                          <i className="fa-regular fa-circle text-slate-300"></i>
                        )}
                        <div>
                          <p className="font-medium text-slate-800">Week {material.week}: {material.topic}</p>
                          <p className="text-xs text-slate-400">
                            {material.status === 'completed' ? 'Completed' : material.status === 'ongoing' ? 'In Progress' : 'Upcoming'}
                          </p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <i className="fa-regular fa-arrow-right"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Server Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-server text-blue-600"></i>
                Server Status
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">CPU Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-green-600 rounded-full h-1.5" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Memory</span>
                    <span className="font-medium">2.3/4 GB</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-blue-600 rounded-full h-1.5" style={{ width: '57%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Disk Usage</span>
                    <span className="font-medium">35/50 GB</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-yellow-600 rounded-full h-1.5" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-sm flex items-center justify-center gap-2">
                <i className="fa-regular fa-terminal"></i>
                SSH Connection
              </button>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-regular fa-clock text-blue-600"></i>
                Upcoming Assignments
              </h3>
              <div className="space-y-4">
                {courseData.assignments.map(assignment => (
                  <div key={assignment.id} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-slate-800">{assignment.title}</p>
                      <span className="text-xs text-orange-600 font-medium">Due {assignment.due}</span>
                    </div>
                    <p className="text-xs text-slate-400">{assignment.submitted}/{assignment.total} submitted</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-regular fa-folder-open text-blue-600"></i>
                Resources
              </h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600">
                  <i className="fa-regular fa-file-pdf text-red-500"></i>
                  Modul Praktikum Week 1-4
                </a>
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600">
                  <i className="fa-regular fa-file-video text-blue-500"></i>
                  Video Tutorial Instalasi
                </a>
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600">
                  <i className="fa-regular fa-file-zipper text-yellow-600"></i>
                  VM Image Ubuntu Server
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};