// App.jsx
import React, { useState } from 'react';

export default function Selengkapnya() {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Ahmad Fauzi",
      avatar: "AF",
      date: "10 Des 2024, 14:23",
      content: "Terima kasih informasinya Pak. Apakah ada jadwal pengganti untuk praktikum?",
      likes: 3,
      replies: []
    },
    {
      id: 2,
      user: "Siti Nurhaliza",
      avatar: "SN",
      date: "10 Des 2024, 15:45",
      content: "Mohon info apakah semua server termasuk server database juga ikut maintenance?",
      likes: 2,
      replies: []
    }
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const announcementData = {
    id: 1,
    title: "Maintenance Server Praktikum",
    course: "Administrasi Server Linux",
    instructor: "Prof. Ahmad Riyadi",
    date: "10 Desember 2024",
    time: "09:00 WIB",
    content: `Server praktikum akan offline pada Sabtu, 14 Desember 2024 pukul 00:00 - 06:00 WIB untuk maintenance rutin.

Detail Maintenance:
• Upgrade sistem operasi ke versi terbaru
• Update security patches
• Optimasi database server
• Backup data secara menyeluruh
• Peningkatan kapasitas storage

Selama maintenance berlangsung, akses ke server praktikum dan beberapa layanan pendukung akan terganggu. Mohon maaf atas ketidaknyamanannya.

Untuk pertanyaan lebih lanjut, dapat menghubungi tim IT Support melalui email: it-support@devclass.id`,
    attachments: [
      { id: 1, name: "Maintenance_Schedule.pdf", size: "245 KB", type: "pdf", url: "#" },
      { id: 2, name: "Server_Backup_Guide.docx", size: "1.2 MB", type: "doc", url: "#" },
      { id: 3, name: "Maintenance_Notification.png", size: "856 KB", type: "image", url: "#" }
    ],
    commentsCount: 12,
    attachmentsCount: 3,
    views: 156
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: "Ahmad Riyadi",
        avatar: "AR",
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ", " + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        content: commentText,
        likes: 0,
        replies: []
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return 'fa-regular fa-file-pdf text-red-500';
      case 'doc': return 'fa-regular fa-file-word text-blue-600';
      case 'image': return 'fa-regular fa-file-image text-green-500';
      default: return 'fa-regular fa-file text-slate-400';
    }
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
              <span className="text-slate-700 font-medium">Maintenance Server Praktikum</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-full relative">
              <i className="fa-regular fa-bell text-slate-600"></i>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">AR</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span className="text-sm">Kembali ke Daftar Pengumuman</span>
        </button>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 animate-slideDown">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-green-800 font-medium">Komentar Berhasil Ditambahkan!</p>
                <p className="text-green-600 text-sm">Komentar Anda telah dipublikasikan</p>
              </div>
              <button onClick={() => setShowSuccess(false)} className="text-green-600 hover:text-green-800">
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-50 to-white p-8 border-b border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-800 mb-3">{announcementData.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-folder-open text-blue-500"></i>
                    <span>{announcementData.course}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-user text-blue-500"></i>
                    <span>{announcementData.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-blue-500"></i>
                    <span>{announcementData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-clock text-blue-500"></i>
                    <span>{announcementData.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <i className="fa-regular fa-share-nodes text-slate-400"></i>
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <i className="fa-regular fa-bookmark text-slate-400"></i>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-eye text-slate-400"></i>
                <span className="text-sm text-slate-600">{announcementData.views} dibaca</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-message text-slate-400"></i>
                <span className="text-sm text-slate-600">{announcementData.commentsCount} komentar</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-paperclip text-slate-400"></i>
                <span className="text-sm text-slate-600">{announcementData.attachmentsCount} lampiran</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 border-b border-slate-200">
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                {announcementData.content}
              </div>
            </div>

            {/* Attachments */}
            {announcementData.attachments.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fa-regular fa-paperclip text-blue-600"></i>
                  Lampiran ({announcementData.attachments.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {announcementData.attachments.map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
                        <i className={`${getFileIcon(file.type)} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{file.name}</p>
                        <p className="text-xs text-slate-400">{file.size}</p>
                      </div>
                      <i className="fa-regular fa-download text-slate-400 group-hover:text-blue-600 transition-colors"></i>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <i className="fa-regular fa-message text-blue-600"></i>
                Komentar ({comments.length})
              </h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <i className="fa-regular fa-pen-to-square"></i>
                Tulis Komentar
              </button>
            </div>

            {/* Comment Form */}
            {isEditing && (
              <div className="mb-8 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">AR</span>
                  </div>
                  <form onSubmit={handleAddComment} className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Tulis komentar Anda di sini..."
                      rows="3"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    ></textarea>
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-white transition-colors text-sm"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm flex items-center gap-2"
                      >
                        <i className="fa-regular fa-paper-plane"></i>
                        Kirim Komentar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-slate-600">{comment.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold text-slate-800">{comment.user}</span>
                          <span className="text-xs text-slate-400 ml-2">{comment.date}</span>
                        </div>
                        <button className="text-slate-400 hover:text-red-500">
                          <i className="fa-regular fa-flag"></i>
                        </button>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleLike(comment.id)}
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                        >
                          <i className="fa-regular fa-thumbs-up"></i>
                          <span>Suka ({comment.likes})</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                          <i className="fa-regular fa-reply"></i>
                          <span>Balas</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {comments.length >= 5 && (
              <div className="text-center mt-6">
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mx-auto">
                  <i className="fa-regular fa-arrow-down"></i>
                  Lihat Komentar Lainnya
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Announcements */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-regular fa-clock text-blue-600"></i>
            Pengumuman Terkait
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-800">Jadwal Ujian Akhir Semester</h4>
                <span className="text-xs text-slate-400">8 Des 2024</span>
              </div>
              <p className="text-sm text-slate-500 mb-2">Keamanan Jaringan - Ir. Bambang Sutrisno</p>
              <p className="text-xs text-slate-400 line-clamp-2">UAS akan dilaksanakan pada tanggal 22 Desember 2024 secara online...</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-800">Materi Tambahan: Docker Container</h4>
                <span className="text-xs text-slate-400">5 Des 2024</span>
              </div>
              <p className="text-sm text-slate-500 mb-2">Virtualisasi Server - Diana Putri, M.Kom</p>
              <p className="text-xs text-slate-400 line-clamp-2">Materi tambahan tentang Docker Container telah diupload...</p>
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