// data/defaultClasses.js

export const defaultClasses = [
  {
    id: 1,
    name: "Administrasi Server Linux",  // Gunakan 'name' bukan 'title'
    title: "Administrasi Server Linux", // Simpan juga untuk kompatibilitas
    code: "ASL-2024-01",
    teacher: "Prof. Ahmad Riyadi",      // Gunakan 'teacher' untuk ClassesPage
    instructor: {
      name: "Prof. Ahmad Riyadi",
      title: "Senior System Administrator",
      avatar: "👨‍🏫",
      email: "ahmad.riyadi@devclass.id",
      students: 35
    },
    color: "bg-blue-500",
    assignmentsDue: 2,                   // Untuk ClassesPage
    announcements: 1,                   // Untuk ClassesPage
    students: 35,                       // Untuk ClassesPage
    schedule: "Senin, 09:00 - 11:00",
    progress: 75,
    description: "Mata kuliah ini membahas konsep dan praktik administrasi server Linux, mencakup instalasi, konfigurasi, keamanan, manajemen user, dan troubleshooting sistem operasi Linux untuk lingkungan server production.",
    room: "Lab Komputer 301",
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
    announcementsList: [  // Untuk detail page
      { id: 1, title: "Perubahan Jadwal UTS", date: "2 Mar 2026", content: "UTS dimajukan menjadi minggu depan. Materi mencakup week 1-5." },
      { id: 2, title: "Tugas Kelompok", date: "28 Feb 2026", content: "Buat dokumentasi konfigurasi web server di Linux." }
    ],
    assignmentsList: [    // Untuk detail page
      { id: 1, title: "Praktikum Instalasi Linux", due: "5 Mar 2026", submitted: 28, total: 35 },
      { id: 2, title: "Konfigurasi SSH Server", due: "12 Mar 2026", submitted: 15, total: 35 }
    ]
  },
  {
    id: 2,
    name: "Jaringan Komputer Lanjut",
    title: "Jaringan Komputer Lanjut",
    code: "JKL-2024-02",
    teacher: "Dr. Siti Mawar",
    instructor: {
      name: "Dr. Siti Mawar",
      title: "Network Engineer & Researcher",
      avatar: "👩‍🏫",
      email: "siti.mawar@devclass.id",
      students: 28
    },
    color: "bg-green-500",
    assignmentsDue: 0,
    announcements: 0,
    students: 28,
    schedule: "Selasa, 13:00 - 15:00",
    progress: 60,
    description: "Mata kuliah ini membahas konsep lanjutan jaringan komputer, meliputi routing dinamis, VLAN, subnetting, network security, dan analisis protokol jaringan menggunakan Wireshark.",
    room: "Lab Jaringan 202",
    materials: [
      { week: 1, topic: "Review Dasar Jaringan", status: "completed" },
      { week: 2, topic: "Subnetting & VLSM", status: "completed" },
      { week: 3, topic: "Routing Dinamis (OSPF)", status: "completed" },
      { week: 4, topic: "VLAN & Inter-VLAN Routing", status: "completed" },
      { week: 5, topic: "Network Security (ACL)", status: "ongoing" },
      { week: 6, topic: "Wireless Network", status: "upcoming" },
      { week: 7, topic: "Network Monitoring", status: "upcoming" },
      { week: 8, topic: "Troubleshooting Jaringan", status: "upcoming" }
    ],
    announcementsList: [
      { id: 1, title: "Praktikum menggunakan Cisco Packet Tracer", date: "1 Mar 2026", content: "Pastikan sudah menginstall Cisco Packet Tracer sebelum praktikum." }
    ],
    assignmentsList: [
      { id: 1, title: "Simulasi Routing OSPF", due: "10 Mar 2026", submitted: 20, total: 28 },
      { id: 2, title: "Konfigurasi VLAN", due: "17 Mar 2026", submitted: 8, total: 28 }
    ]
  },
  {
    id: 3,
    name: "Keamanan Jaringan",
    title: "Keamanan Jaringan",
    code: "KJ-2024-01",
    teacher: "Ir. Bambang Sutrisno",
    instructor: {
      name: "Ir. Bambang Sutrisno",
      title: "Cybersecurity Specialist",
      avatar: "👨‍💻",
      email: "bambang.sutrisno@devclass.id",
      students: 42
    },
    color: "bg-red-500",
    assignmentsDue: 3,
    announcements: 2,
    students: 42,
    schedule: "Rabu, 10:00 - 12:00",
    progress: 40,
    description: "Mata kuliah ini membahas prinsip-prinsip keamanan jaringan, identifikasi ancaman, implementasi firewall, IDS/IPS, enkripsi data, dan praktik keamanan sistem informasi.",
    room: "Lab Keamanan 101",
    materials: [
      { week: 1, topic: "Dasar Keamanan Informasi", status: "completed" },
      { week: 2, topic: "Cryptography & Enkripsi", status: "completed" },
      { week: 3, topic: "Firewall & Access Control", status: "completed" },
      { week: 4, topic: "IDS/IPS", status: "ongoing" },
      { week: 5, topic: "VPN & Tunneling", status: "upcoming" },
      { week: 6, topic: "Penetration Testing", status: "upcoming" },
      { week: 7, topic: "Incident Response", status: "upcoming" },
      { week: 8, topic: "Security Audit", status: "upcoming" }
    ],
    announcementsList: [
      { id: 1, title: "Info Workshop Cybersecurity", date: "5 Mar 2026", content: "Akan ada workshop penetration testing pada akhir bulan. Pendaftaran dibuka." },
      { id: 2, title: "Tugas Analisis Malware", date: "28 Feb 2026", content: "Kerjakan tugas analisis malware menggunakan sandbox environment." }
    ],
    assignmentsList: [
      { id: 1, title: "Analisis Firewall Log", due: "7 Mar 2026", submitted: 30, total: 42 },
      { id: 2, title: "Implementasi IDS Snort", due: "14 Mar 2026", submitted: 12, total: 42 },
      { id: 3, title: "Enkripsi Data", due: "21 Mar 2026", submitted: 5, total: 42 }
    ]
  }
];

// Helper function untuk mendapatkan kelas berdasarkan ID
export const getClassById = (id) => {
  return defaultClasses.find(cls => cls.id === id);
};

// Helper function untuk mendapatkan semua kelas
export const getAllClasses = () => {
  return defaultClasses;
};