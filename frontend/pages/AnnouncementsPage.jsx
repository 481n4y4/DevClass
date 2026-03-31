import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBook,
  faUser,
  faCalendar,
  faComment,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AnnouncementsPage = ({ announcements = [] }) => {
  const navigate = useNavigate(); 
  // Data default jika tidak ada props
  const defaultAnnouncements = [
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
  ];

  const announcementList = announcements.length > 0 ? announcements : defaultAnnouncements;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pengumuman</h2>
        <button onClick={() => navigate("/buatpengumuman")} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Buat Pengumuman
        </button>
      </div>
      
      <div className="space-y-6">
        {announcementList.map((announcement) => (
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
};

export default AnnouncementsPage;