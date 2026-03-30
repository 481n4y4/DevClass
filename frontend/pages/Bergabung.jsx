// App.jsx
import React, { useState } from 'react';

export default function Bergabung() {
  const [joinMethod, setJoinMethod] = useState('code');
  const [classCode, setClassCode] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const popularClasses = [
    {
      id: 1,
      title: "Administrasi Server Linux",
      code: "ASL-2024-01",
      instructor: "Prof. Ahmad Riyadi",
      students: 35,
      thumbnail: "🐧"
    },
    {
      id: 2,
      title: "Jaringan Komputer",
      code: "JC-2024-02",
      instructor: "Dr. Siti Mawar",
      students: 28,
      thumbnail: "🌐"
    },
    {
      id: 3,
      title: "Cloud Computing",
      code: "CC-2024-01",
      instructor: "Dr. Rizky Pratama",
      students: 39,
      thumbnail: "☁️"
    }
  ];

  const handleJoinClass = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DevClass
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-700">Dashboard</a>
              <i className="fa-solid fa-chevron-right text-xs"></i>
              <a href="#" className="hover:text-slate-700">Classes</a>
              <i className="fa-solid fa-chevron-right text-xs"></i>
              <span className="text-slate-700 font-medium">Bergabung dengan Kelas</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full relative">
              <i className="fa-regular fa-bell text-slate-600"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">AR</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
            <i className="fa-solid fa-door-open text-4xl text-blue-600"></i>
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-3">Bergabung dengan Kelas</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Masuk ke kelas menggunakan kode undangan atau link invite yang diberikan oleh instruktur Anda
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="max-w-md mx-auto mb-6 animate-slideDown">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-green-800 font-medium">Berhasil Bergabung!</p>
                <p className="text-green-600 text-sm">Anda sekarang terdaftar di kelas Administrasi Server Linux</p>
              </div>
              <button onClick={() => setShowSuccess(false)} className="text-green-600 hover:text-green-800">
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        {/* Join Form */}
        <div className="max-w-3xl mx-auto">
          {/* Method Toggle */}
          <div className="bg-white rounded-xl p-2 inline-flex mb-6 border border-slate-200">
            <button
              onClick={() => setJoinMethod('code')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                joinMethod === 'code' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <i className="fa-regular fa-key"></i>
              Kode Kelas
            </button>
            <button
              onClick={() => setJoinMethod('link')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                joinMethod === 'link' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <i className="fa-regular fa-link"></i>
              Link Undangan
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8">
              {joinMethod === 'code' ? (
                <form onSubmit={handleJoinClass}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-key mr-2 text-blue-600"></i>
                      Masukkan Kode Kelas
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                        placeholder="Contoh: ASL-2024-01"
                        className="w-full px-4 py-3 pl-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                      <i className="fa-regular fa-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      <i className="fa-regular fa-circle-info mr-1"></i>
                      Kode kelas biasanya terdiri dari 3 huruf diikuti angka (contoh: ASL-2024-01)
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <i className="fa-regular fa-arrow-right-to-bracket"></i>
                      Bergabung dengan Kelas
                    </button>
                    <button
                      type="button"
                      className="px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600"
                    >
                      <i className="fa-regular fa-qrcode"></i>
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleJoinClass}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-link mr-2 text-blue-600"></i>
                      Masukkan Link Undangan
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={inviteLink}
                        onChange={(e) => setInviteLink(e.target.value)}
                        placeholder="https://devclass.id/join/abc123"
                        className="w-full px-4 py-3 pl-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                      <i className="fa-regular fa-link absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      <i className="fa-regular fa-circle-info mr-1"></i>
                      Tempel link undangan yang Anda terima dari instruktur
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <i className="fa-regular fa-arrow-right-to-bracket"></i>
                    Bergabung dengan Kelas
                  </button>
                </form>
              )}
            </div>

            {/* Divider */}
            <div className="relative px-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400">atau</span>
              </div>
            </div>

            {/* Alternative Methods */}
            <div className="p-8 bg-slate-50 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4 text-center">
                Metode bergabung lainnya
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-center">
                  <i className="fa-brands fa-google text-lg text-blue-500 mb-1"></i>
                  <p className="text-xs font-medium">Google Classroom</p>
                </button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-center">
                  <i className="fa-brands fa-microsoft text-lg text-blue-600 mb-1"></i>
                  <p className="text-xs font-medium">Microsoft Teams</p>
                </button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-center">
                  <i className="fa-regular fa-envelope text-lg text-orange-500 mb-1"></i>
                  <p className="text-xs font-medium">Email Invite</p>
                </button>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fa-regular fa-circle-question text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Tidak punya kode kelas?</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Kode kelas diberikan oleh instruktur Anda. Jika Anda belum memilikinya, hubungi instruktur atau:
                </p>
                <div className="flex gap-3">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                    <i className="fa-regular fa-envelope"></i>
                    Kirim Email ke Instruktur
                  </button>
                  <span className="text-slate-300">|</span>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                    <i className="fa-regular fa-message"></i>
                    Chat Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Classes */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800">
              <i className="fa-regular fa-fire-flame-curved text-orange-500 mr-2"></i>
              Kelas Populer Saat Ini
            </h3>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              Lihat Semua
              <i className="fa-regular fa-arrow-right"></i>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularClasses.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {classItem.thumbnail}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 mb-1">{classItem.title}</h4>
                    <p className="text-xs text-slate-400 mb-2">{classItem.code}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <i className="fa-regular fa-user"></i>
                        <span>{classItem.instructor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fa-regular fa-users"></i>
                        <span>{classItem.students}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <i className="fa-regular fa-plus"></i>
                  Gabung
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
            <i className="fa-regular fa-circle-question mr-2"></i>
            Pertanyaan Umum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-regular fa-key text-blue-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Dimana saya mendapatkan kode kelas?</h4>
                  <p className="text-sm text-slate-500">
                    Kode kelas diberikan oleh instruktur melalui email, platform pembelajaran, atau saat sesi kelas pertama.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-regular fa-clock text-blue-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Apakah kode kelas memiliki masa berlaku?</h4>
                  <p className="text-sm text-slate-500">
                    Ya, sebagian besar kode kelas berlaku selama 7 hari atau hingga kuota peserta terpenuhi.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-regular fa-arrows-rotate text-blue-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Kode kelas tidak valid, apa yang harus dilakukan?</h4>
                  <p className="text-sm text-slate-500">
                    Pastikan kode yang dimasukkan benar. Jika masih bermasalah, hubungi instruktur untuk mendapatkan kode baru.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-regular fa-users text-blue-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Bisakah bergabung dengan lebih dari satu kelas?</h4>
                  <p className="text-sm text-slate-500">
                    Ya, Anda dapat bergabung dengan banyak kelas menggunakan kode yang berbeda dari masing-masing instruktur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation */}
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
      `}</style>
    </div>
  );
};