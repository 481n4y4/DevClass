// data/defaultClasses.js

export const defaultClasses = [
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
];

// Jika ingin menambahkan tipe data untuk TypeScript
export const classColors = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  indigo: "bg-indigo-500",
  teal: "bg-teal-500",
};

// Fungsi helper untuk mendapatkan warna random
export const getRandomColor = () => {
  const colors = Object.values(classColors);
  return colors[Math.floor(Math.random() * colors.length)];
};