import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Solid Icons
import {
  faHome,
  faCalendar,
  faComment,
  faUser,
  faCog,
  faSearch,
  faBell,
  faPlus,
  faFilter,
  faSort,
  faBook,
  faTasks,
  faUsers,
  faChartBar,
  faClock,
  faCheckCircle,
  faExclamationCircle,
  faFolder,
  faChevronRight,
  faChevronDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("classes");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data kelas contoh
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Administrasi Server Linux",
      code: "ASL-2024-01",
      teacher: "Prof. Ahmad Riyadi",
      color: "bg-blue-500",
      assignmentsDue: 2,
      announcements: 1,
      students: 35,
      schedule: "Senin, 09:00 - 11:00",
      progress: 75,
    },
    {
      id: 2,
      name: "Jaringan Komputer Lanjut",
      code: "JKL-2024-02",
      teacher: "Dr. Siti Mawar",
      color: "bg-green-500",
      assignmentsDue: 0,
      announcements: 0,
      students: 28,
      schedule: "Selasa, 13:00 - 15:00",
      progress: 60,
    },
    {
      id: 3,
      name: "Keamanan Jaringan",
      code: "KJ-2024-01",
      teacher: "Ir. Bambang Sutrisno",
      color: "bg-red-500",
      assignmentsDue: 3,
      announcements: 2,
      students: 42,
      schedule: "Rabu, 10:00 - 12:00",
      progress: 40,
    },
    {
      id: 4,
      name: "Virtualisasi Server",
      code: "VS-2024-01",
      teacher: "Diana Putri, M.Kom",
      color: "bg-purple-500",
      assignmentsDue: 1,
      announcements: 0,
      students: 31,
      schedule: "Kamis, 14:00 - 16:00",
      progress: 90,
    },
    {
      id: 5,
      name: "Cloud Computing",
      code: "CC-2024-01",
      teacher: "Dr. Rizky Pratama",
      color: "bg-yellow-500",
      assignmentsDue: 0,
      announcements: 1,
      students: 39,
      schedule: "Jumat, 08:00 - 10:00",
      progress: 25,
    },
  ]);

  // Data tugas contoh
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Konfigurasi Apache Web Server",
      class: "Administrasi Server Linux",
      dueDate: "15 Des 2024",
      dueTime: "23:59",
      status: "pending",
      submitted: false,
      points: 100,
      classId: 1,
    },
    {
      id: 2,
      title: "Setup DNS Server dengan BIND9",
      class: "Administrasi Server Linux",
      dueDate: "18 Des 2024",
      dueTime: "23:59",
      status: "pending",
      submitted: false,
      points: 100,
      classId: 1,
    },
    {
      id: 3,
      title: "Implementasi Firewall dengan iptables",
      class: "Keamanan Jaringan",
      dueDate: "12 Des 2024",
      dueTime: "23:59",
      status: "overdue",
      submitted: false,
      points: 100,
      classId: 3,
    },
    {
      id: 4,
      title: "Analisis Paket Jaringan dengan Wireshark",
      class: "Jaringan Komputer Lanjut",
      dueDate: "20 Des 2024",
      dueTime: "23:59",
      status: "pending",
      submitted: true,
      points: 100,
      classId: 2,
    },
    {
      id: 5,
      title: "Setup Virtual Machine dengan KVM",
      class: "Virtualisasi Server",
      dueDate: "14 Des 2024",
      dueTime: "23:59",
      status: "pending",
      submitted: false,
      points: 100,
      classId: 4,
    },
  ]);

  // Data pengumuman contoh
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Maintenance Server Praktikum",
      class: "Administrasi Server Linux",
      teacher: "Prof. Ahmad Riyadi",
      date: "10 Des 2024",
      content: "Server praktikum akan offline pada Sabtu, 14 Desember 2024 pukul 00:00 - 06:00 WIB untuk maintenance rutin.",
      important: true,
      classId: 1,
    },
    {
      id: 2,
      title: "Jadwal Ujian Akhir Semester",
      class: "Keamanan Jaringan",
      teacher: "Ir. Bambang Sutrisno",
      date: "8 Des 2024",
      content: "UAS akan dilaksanakan pada tanggal 22 Desember 2024 secara online melalui platform DevClass.",
      important: true,
      classId: 3,
    },
    {
      id: 3,
      title: "Materi Tambahan: Docker Container",
      class: "Virtualisasi Server",
      teacher: "Diana Putri, M.Kom",
      date: "5 Des 2024",
      content: "Saya telah menambahkan materi tambahan tentang Docker Container di bagian materi minggu ini.",
      important: false,
      classId: 4,
    },
  ]);

  // Data kalender contoh
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, title: "Batas Pengumpulan Tugas Apache", date: "15 Des", class: "ASL", type: "assignment" },
    { id: 2, title: "Kuis Jaringan Komputer", date: "16 Des", class: "JKL", type: "quiz" },
    { id: 3, title: "Ujian Keamanan Jaringan", date: "22 Des", class: "KJ", type: "exam" },
    { id: 4, title: "Presentasi Proyek", date: "18 Des", class: "VS", type: "presentation" },
  ]);

  // Handle logout
  const handleLogout = () => {
    navigate("/");
  };

  // Handle navigasi ke kelas tertentu
  const handleClassClick = (classId) => {
    setSelectedClass(classId);
    navigate(`/class/${classId}`);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Tampilkan konten berdasarkan tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case "classes":
        return renderClasses();
      case "assignments":
        return renderAssignments();
      case "calendar":
        return renderCalendar();
      case "announcements":
        return renderAnnouncements();
      default:
        return renderClasses();
    }
  };

  // Render daftar kelas
  const renderClasses = () => (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Kelas Anda</h2>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Bergabung dengan Kelas
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div 
            key={classItem.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleClassClick(classItem.id)}
          >
            <div className={`h-3 ${classItem.color}`}></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800">{classItem.name}</h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {classItem.code}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{classItem.teacher}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  {classItem.students} siswa
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  {classItem.schedule}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{classItem.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${classItem.progress === 100 ? 'bg-green-500' : classItem.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                    style={{ width: `${classItem.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  {classItem.assignmentsDue > 0 && (
                    <div className="flex items-center text-red-600">
                      <FontAwesomeIcon icon={faTasks} className="mr-1" />
                      <span className="text-sm font-medium">{classItem.assignmentsDue}</span>
                    </div>
                  )}
                  {classItem.announcements > 0 && (
                    <div className="flex items-center text-blue-600">
                      <FontAwesomeIcon icon={faComment} className="mr-1" />
                      <span className="text-sm font-medium">{classItem.announcements}</span>
                    </div>
                  )}
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Buka <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Card tambah kelas baru */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors flex flex-col items-center justify-center p-10 cursor-pointer">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faPlus} className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Buat Kelas Baru</h3>
          <p className="text-gray-500 text-center text-sm mb-4">Hanya tersedia untuk pengajar</p>
          <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Buat Kelas
          </button>
        </div>
      </div>
    </div>
  );

  // Render daftar tugas
  const renderAssignments = () => (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Tugas Anda</h2>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faSort} className="mr-2" />
            Urutkan
          </button>
        </div>
      </div>
      
      {/* Status Tugas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faTasks} className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tugas Belum Selesai</p>
              <p className="text-2xl font-bold text-gray-800">4</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Terlambat</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Telah Dikumpulkan</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daftar Tugas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Daftar Tugas</h3>
            <span className="text-sm text-gray-500">5 tugas</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-3 ${assignment.status === 'overdue' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    <h4 className="font-bold text-gray-800">{assignment.title}</h4>
                    {assignment.submitted && (
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Terkumpul</span>
                    )}
                    {assignment.status === 'overdue' && (
                      <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Terlambat</span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 ml-6">
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    <span className="mr-4">{assignment.class}</span>
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    <span className={`font-medium ${assignment.status === 'overdue' ? 'text-red-600' : 'text-gray-700'}`}>
                      Batas: {assignment.dueDate} {assignment.dueTime}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Nilai</p>
                    <p className="font-bold text-gray-800">{assignment.points} poin</p>
                  </div>
                  <button className={`px-4 py-2 rounded-lg font-medium ${assignment.submitted ? 'bg-gray-100 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {assignment.submitted ? 'Lihat Detail' : 'Kerjakan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render kalender
  const renderCalendar = () => (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Kalender */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Kalender</h2>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Hari Ini
              </button>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Tambah Acara
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                <div key={day} className="py-3 text-center font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {Array.from({ length: 35 }).map((_, index) => {
                const day = index - 4 + 1; // Mulai dari 1 Des
                const isToday = day === 10;
                const hasEvent = [10, 15, 16, 18, 22].includes(day);
                
                return (
                  <div 
                    key={index} 
                    className={`min-h-32 bg-white p-2 ${day < 1 || day > 31 ? 'bg-gray-50' : ''}`}
                  >
                    {day > 0 && day <= 31 && (
                      <>
                        <div className={`flex justify-center items-center w-8 h-8 rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-800'}`}>
                          {day}
                        </div>
                        {hasEvent && (
                          <div className="mt-2 space-y-1">
                            {day === 10 && <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Maintenance</div>}
                            {day === 15 && <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Tugas Apache</div>}
                            {day === 16 && <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Kuis Jaringan</div>}
                            {day === 18 && <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Presentasi</div>}
                            {day === 22 && <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">UAS Keamanan</div>}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Acara Mendatang */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="font-bold text-gray-800 mb-6 text-lg">Acara Mendatang</h3>
            
            <div className="space-y-6">
              {calendarEvents.map((event) => (
                <div key={event.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 text-center mr-4">
                      <div className="text-2xl font-bold text-blue-600">{event.date.split(' ')[0]}</div>
                      <div className="text-sm text-gray-500">{event.date.split(' ')[1]}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">{event.title}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded text-xs font-medium mr-2 ${
                          event.type === 'assignment' ? 'bg-blue-100 text-blue-800' :
                          event.type === 'quiz' ? 'bg-yellow-100 text-yellow-800' :
                          event.type === 'exam' ? 'bg-red-100 text-red-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {event.class}
                        </span>
                        <FontAwesomeIcon icon={faClock} className="mr-1" />
                        <span>23:59 WIB</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Tambah Acara Pribadi
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render pengumuman
  const renderAnnouncements = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pengumuman</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Buat Pengumuman
        </button>
      </div>
      
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{announcement.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    <span className="mr-4">{announcement.class}</span>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <span className="mr-4">{announcement.teacher}</span>
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    <span>{announcement.date}</span>
                  </div>
                </div>
                {announcement.important && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">PENTING</span>
                )}
              </div>
              
              <p className="text-gray-700 mb-4">{announcement.content}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    <span>Komentar</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm">
                    <FontAwesomeIcon icon={faFolder} className="mr-2" />
                    <span>Lampiran</span>
                  </button>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Selengkapnya
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo and menu toggle */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
              </button>
              
              <div className="flex items-center ml-2 lg:ml-0">
                
                <h1 className="text-xl font-bold text-blue-900">DevClass</h1>
              </div>
            </div>
            
            {/* Center: Search */}
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari kelas, tugas, atau materi..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Right: User menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
                <FontAwesomeIcon icon={faBell} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 md:hidden">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    AS
                  </div>
                  <span className="hidden lg:inline font-medium text-gray-700">Ahmad Student</span>
                  <FontAwesomeIcon icon={faChevronDown} className="hidden lg:inline text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-gray-200 fixed lg:static inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 pt-16 lg:pt-0`}>
          <div className="h-full flex flex-col">
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <button
                onClick={() => setActiveTab("classes")}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "classes" ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FontAwesomeIcon icon={faHome} className="mr-3" />
                <span className="font-medium">Kelas</span>
              </button>
              
              <button
                onClick={() => setActiveTab("assignments")}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "assignments" ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FontAwesomeIcon icon={faTasks} className="mr-3" />
                <span className="font-medium">Tugas</span>
                <span className="ml-auto bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">4</span>
              </button>
              
              <button
                onClick={() => setActiveTab("calendar")}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "calendar" ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-3" />
                <span className="font-medium">Kalender</span>
              </button>
              
              <button
                onClick={() => setActiveTab("announcements")}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "announcements" ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FontAwesomeIcon icon={faComment} className="mr-3" />
                <span className="font-medium">Pengumuman</span>
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">3</span>
              </button>
            </nav>
            
            {/* Bottom section */}
            <div className="px-4 py-6 border-t border-gray-200">
              <button
                onClick={() => navigate("/settings")}
                className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faCog} className="mr-3" />
                <span className="font-medium">Pengaturan</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 mt-2"
              >
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                <span className="font-medium">Keluar</span>
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status Server</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Semua Sistem Online
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <FontAwesomeIcon icon={faChartBar} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">Dashboard</span>
              <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-xs" />
              <span className="capitalize">{activeTab}</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="pb-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;