import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import ClassesPage from "./ClassesPage";
import AssignmentsPage from "./AssignmentsPage";
import AnnouncementsPage from "./AnnouncementsPage";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("classes");

  // Data (bisa dipindahkan ke state management atau context jika diperlukan)
  const [classes] = useState([
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

  const [assignments] = useState([
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

  const [announcements] = useState([
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

  const [calendarEvents] = useState([
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
    navigate(`/class/${classId}`);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Render konten berdasarkan tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case "classes":
        return <ClassesPage classes={classes} onClassClick={handleClassClick} />;
      case "assignments":
        return <AssignmentsPage assignments={assignments} />;
      case "calendar":
        return <CalendarPage calendarEvents={calendarEvents} />;
      case "announcements":
        return <AnnouncementsPage announcements={announcements} />;
      default:
        return <ClassesPage classes={classes} onClassClick={handleClassClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Component */}
      <Header 
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Main Content */}
      <div className="flex pt-16">
        {/* Sidebar Component */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
          navigate={navigate}
          isSidebarOpen={isSidebarOpen}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64">
          {/* Breadcrumb Component */}
          <Breadcrumb activeTab={activeTab} />
          
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