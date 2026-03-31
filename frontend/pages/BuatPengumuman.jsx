// App.jsx
import React, { useState } from 'react';

export default function BuatPengumuman() {
  const [announcement, setAnnouncement] = useState({
    title: '',
    course: '',
    content: '',
    attachments: [],
    sendEmail: false,
    pinAnnouncement: false,
    scheduleDate: null
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [schedulePublish, setSchedulePublish] = useState(false);

  const courses = [
    { id: 1, name: "Administrasi Server Linux", instructor: "Prof. Ahmad Riyadi", code: "ASL-2024-01" },
    { id: 2, name: "Jaringan Komputer", instructor: "Dr. Siti Mawar", code: "JC-2024-02" },
    { id: 3, name: "Keamanan Jaringan", instructor: "Ir. Bambang Sutrisno", code: "KJ-2024-01" },
    { id: 4, name: "Virtualisasi Server", instructor: "Diana Putri, M.Kom", code: "VS-2024-01" },
    { id: 5, name: "Cloud Computing", instructor: "Dr. Rizky Pratama", code: "CC-2024-01" }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "Server Maintenance",
      course: "Administrasi Server Linux",
      instructor: "Prof. Ahmad Riyadi",
      date: "10 Des 2024",
      content: "Server praktikum akan offline pada Sabtu, 14 Desember 2024 pukul 00:00 - 06:00 WIB untuk maintenance rutin.",
      comments: 3,
      attachments: 1
    },
    {
      id: 2,
      title: "Jadwal Ujian Akhir Semester",
      course: "Keamanan Jaringan",
      instructor: "Ir. Bambang Sutrisno",
      date: "8 Des 2024",
      content: "UAS akan dilaksanakan pada tanggal 22 Desember 2024 secara online melalui platform DevClass.",
      comments: 5,
      attachments: 0
    },
    {
      id: 3,
      title: "Materi Tambahan: Docker Container",
      course: "Virtualisasi Server",
      instructor: "Diana Putri, M.Kom",
      date: "5 Des 2024",
      content: "Materi tambahan tentang Docker Container telah diupload. Silakan dipelajari sebelum pertemuan minggu depan.",
      comments: 2,
      attachments: 2
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnnouncement({
      ...announcement,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setAnnouncement({
      ...announcement,
      attachments: [...announcement.attachments, ...newAttachments]
    });
  };

  const removeAttachment = (index) => {
    setAnnouncement({
      ...announcement,
      attachments: announcement.attachments.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (announcement.title && announcement.course && announcement.content) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAnnouncement({
          title: '',
          course: '',
          content: '',
          attachments: [],
          sendEmail: false,
          pinAnnouncement: false,
          scheduleDate: null
        });
        setSchedulePublish(false);
      }, 3000);
    }
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return 'fa-regular fa-file-pdf text-red-500';
    if (type.includes('image')) return 'fa-regular fa-file-image text-blue-500';
    if (type.includes('word')) return 'fa-regular fa-file-word text-indigo-500';
    if (type.includes('video')) return 'fa-regular fa-file-video text-purple-500';
    return 'fa-regular fa-file text-slate-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DevClass
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-700">Dashboard</a>
              <i className="fa-solid fa-chevron-right text-xs"></i>
              <a href="#" className="hover:text-slate-700">Announcements</a>
              <i className="fa-solid fa-chevron-right text-xs"></i>
              <span className="text-slate-700 font-medium">Buat Pengumuman</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-full relative">
              <i className="fa-regular fa-bell text-slate-600"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">AR</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <i className="fa-regular fa-bullhorn text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Buat Pengumuman</h1>
              <p className="text-slate-500 mt-1">Sampaikan informasi penting kepada siswa Anda</p>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 animate-slideDown">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-green-800 font-medium">Pengumuman Berhasil Dibuat!</p>
                <p className="text-green-600 text-sm">Pengumuman telah dipublikasikan dan akan muncul di dashboard siswa</p>
              </div>
              <button onClick={() => setShowSuccess(false)} className="text-green-600 hover:text-green-800">
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section - Create Announcement */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <i className="fa-regular fa-pen-to-square text-blue-600"></i>
                  Form Pengumuman Baru
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <i className="fa-regular fa-heading mr-2 text-blue-600"></i>
                    Judul Pengumuman <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={announcement.title}
                    onChange={handleInputChange}
                    placeholder="Contoh: Jadwal Ujian Akhir Semester"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <i className="fa-regular fa-folder-open mr-2 text-blue-600"></i>
                    Pilih Kelas <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={announcement.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Pilih kelas tujuan</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.name}>
                        {course.name} - {course.instructor}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <i className="fa-regular fa-align-left mr-2 text-blue-600"></i>
                    Isi Pengumuman <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={announcement.content}
                    onChange={handleInputChange}
                    rows="6"
                    placeholder="Tuliskan isi pengumuman di sini...&#10;&#10;Contoh:&#10;- Informasi penting yang perlu disampaikan&#10;- Link atau referensi tambahan&#10;- Hal-hal yang perlu dipersiapkan siswa"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <i className="fa-regular fa-paperclip mr-2 text-blue-600"></i>
                    Lampiran
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="attachments"
                      onChange={handleFileUpload}
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.zip"
                    />
                    <label htmlFor="attachments" className="cursor-pointer">
                      <i className="fa-regular fa-cloud-upload-alt text-4xl text-slate-300 mb-3"></i>
                      <p className="text-sm text-slate-600 mb-1">Klik untuk upload lampiran</p>
                      <p className="text-xs text-slate-400">PDF, DOC, JPG, PNG, MP4, ZIP (max 50MB)</p>
                    </label>
                  </div>

                  {/* Attachment List */}
                  {announcement.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {announcement.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <i className={getFileIcon(file.type)}></i>
                            <div>
                              <p className="text-sm font-medium text-slate-700">{file.name}</p>
                              <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Advanced Options */}
                <div className="space-y-3 border-t border-slate-200 pt-5">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <i className="fa-regular fa-gear text-blue-600"></i>
                    Opsi Lanjutan
                  </h3>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <i className="fa-regular fa-envelope text-slate-400"></i>
                      <div>
                        <span className="text-sm font-medium text-slate-700">Kirim notifikasi email</span>
                        <p className="text-xs text-slate-400">Mengirim email ke semua siswa di kelas ini</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      name="sendEmail"
                      checked={announcement.sendEmail}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <i className="fa-regular fa-thumbtack text-slate-400"></i>
                      <div>
                        <span className="text-sm font-medium text-slate-700">Pin pengumuman</span>
                        <p className="text-xs text-slate-400">Pengumuman akan muncul di bagian atas</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      name="pinAnnouncement"
                      checked={announcement.pinAnnouncement}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="fa-regular fa-calendar-clock text-slate-400"></i>
                      <div>
                        <span className="text-sm font-medium text-slate-700">Jadwalkan publikasi</span>
                        <p className="text-xs text-slate-400">Tentukan waktu publikasi pengumuman</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSchedulePublish(!schedulePublish)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {schedulePublish ? 'Batalkan' : 'Atur Jadwal'}
                    </button>
                  </div>

                  {schedulePublish && (
                    <div className="ml-8 pl-4 border-l-2 border-blue-200">
                      <input
                        type="datetime-local"
                        name="scheduleDate"
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <i className="fa-regular fa-paper-plane"></i>
                    Publikasikan
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnnouncement({
                      title: '',
                      course: '',
                      content: '',
                      attachments: [],
                      sendEmail: false,
                      pinAnnouncement: false,
                      scheduleDate: null
                    })}
                    className="px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 flex items-center gap-2"
                  >
                    <i className="fa-regular fa-eraser"></i>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Recent Announcements */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <i className="fa-regular fa-chart-line"></i>
                Statistik Pengumuman
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm opacity-90">Total Pengumuman</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-sm opacity-90">Bulan Ini</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-sm opacity-90">Total Komentar</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.5K</p>
                  <p className="text-sm opacity-90">Telah Dibaca</p>
                </div>
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-200 bg-slate-50">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <i className="fa-regular fa-clock text-blue-600"></i>
                  Pengumuman Terbaru
                </h3>
              </div>
              <div className="divide-y divide-slate-200">
                {recentAnnouncements.map((item) => (
                  <div key={item.id} className="p-5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{item.title}</h4>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-2 line-clamp-2">{item.content}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <i className="fa-regular fa-folder-open"></i>
                        <span>{item.course}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fa-regular fa-user"></i>
                        <span>{item.instructor}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1">
                        <i className="fa-regular fa-message"></i>
                        Komentar ({item.comments})
                      </button>
                      {item.attachments > 0 && (
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <i className="fa-regular fa-paperclip"></i>
                          {item.attachments} lampiran
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1">
                  Lihat Semua Pengumuman
                  <i className="fa-regular fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <div className="flex items-start gap-3">
                <i className="fa-regular fa-lightbulb text-amber-600 text-xl"></i>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Tips Membuat Pengumuman Efektif</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs mt-1"></i>
                      <span>Gunakan judul yang jelas dan menarik</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs mt-1"></i>
                      <span>Sampaikan informasi penting di awal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs mt-1"></i>
                      <span>Sertakan link atau referensi jika diperlukan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs mt-1"></i>
                      <span>Gunakan format yang mudah dibaca (bullet points)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs mt-1"></i>
                      <span>Lampirkan file pendukung jika ada</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Template Suggestion */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <i className="fa-regular fa-copy text-blue-600"></i>
                Template Pengumuman
              </h4>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors text-sm">
                  <p className="font-medium text-slate-700">📢 Jadwal Ujian</p>
                  <p className="text-xs text-slate-400 mt-1">Template untuk pengumuman jadwal ujian</p>
                </button>
                <button className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors text-sm">
                  <p className="font-medium text-slate-700">📝 Materi Tambahan</p>
                  <p className="text-xs text-slate-400 mt-1">Template untuk informasi materi baru</p>
                </button>
                <button className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors text-sm">
                  <p className="font-medium text-slate-700">⚙️ Maintenance Server</p>
                  <p className="text-xs text-slate-400 mt-1">Template untuk pengumuman maintenance</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};