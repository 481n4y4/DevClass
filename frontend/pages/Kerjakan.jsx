// App.jsx
import React, { useState, useEffect } from 'react';

export default function Kerjakan() {
  const [activeTab, setActiveTab] = useState('description');
  const [answer, setAnswer] = useState('');
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 30, seconds: 45 });

  const assignmentData = {
    title: "Konfigurasi Apache Web Server",
    course: "Administrasi Server Linux",
    dueDate: "2024-12-15T23:59:00",
    points: 100,
    description: `Buatlah konfigurasi Apache Web Server yang lengkap dengan ketentuan sebagai berikut:

1. Install Apache2 pada server Linux (Ubuntu/Debian)
2. Konfigurasi virtual host untuk domain example.com
3. Setup SSL/TLS menggunakan Let's Encrypt
4. Konfigurasi directory listing dan access control
5. Implementasi .htaccess untuk URL rewriting
6. Buat dokumentasi langkah-langkah konfigurasi

**Persyaratan Teknis:**
- Server harus dapat diakses melalui HTTPS
- Virtual host harus memiliki DocumentRoot yang sesuai
- Implementasi setidaknya 2 modul Apache (mod_rewrite, mod_ssl)
- Tampilkan halaman index.html dengan informasi server

**Output yang diharapkan:**
- Screenshot hasil konfigurasi
- File konfigurasi Apache (.conf)
- Dokumentasi langkah-langkah dalam format PDF atau Markdown`,
    resources: [
      { name: "Modul Praktikum Apache", type: "pdf", size: "2.4 MB", url: "#" },
      { name: "Video Tutorial Konfigurasi", type: "video", size: "45 MB", url: "#" },
      { name: "Cheat Sheet Apache", type: "pdf", size: "1.1 MB", url: "#" },
      { name: "Contoh Konfigurasi Virtual Host", type: "txt", size: "3 KB", url: "#" }
    ],
    rubric: [
      { criteria: "Instalasi Apache berhasil", points: 15, description: "Apache terinstall dan service berjalan" },
      { criteria: "Virtual Host terkonfigurasi", points: 25, description: "Domain example.com dapat diakses" },
      { criteria: "SSL/TLS berhasil diterapkan", points: 20, description: "HTTPS aktif dengan sertifikat valid" },
      { criteria: "Modul Apache terimplementasi", points: 15, description: "mod_rewrite dan mod_ssl aktif" },
      { criteria: "Dokumentasi lengkap", points: 15, description: "Langkah-langkah terdokumentasi dengan baik" },
      { criteria: "Kebersihan kode dan struktur", points: 10, description: "File konfigurasi rapi dan terstruktur" }
    ],
    submissions: [
      { student: "Ahmad Fauzi", date: "2024-12-10", score: 85, status: "graded" },
      { student: "Budi Santoso", date: "2024-12-12", score: null, status: "pending" },
      { student: "Citra Dewi", date: "2024-12-09", score: 92, status: "graded" }
    ]
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (answer.trim() || files.length > 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setAnswer('');
        setFiles([]);
      }, 3000);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
              <a href="#" className="hover:text-slate-700">Assignments</a>
              <i className="fa-solid fa-chevron-right text-xs"></i>
              <span className="text-slate-700 font-medium">Konfigurasi Apache Web Server</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-full relative">
              <i className="fa-regular fa-bell text-slate-600"></i>
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">AR</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-800">{assignmentData.title}</h1>
            <span className="bg-indigo-50 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
              {assignmentData.points} poin
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <i className="fa-regular fa-folder-open"></i>
              <span>{assignmentData.course}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fa-regular fa-calendar"></i>
              <span>Batas: {new Date(assignmentData.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} 23:59</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Tugas Belum Selesai</p>
                <p className="text-3xl font-bold text-slate-800">3</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="fa-regular fa-clock text-xl text-orange-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Terlambat</p>
                <p className="text-3xl font-bold text-red-600">1</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i className="fa-regular fa-circle-exclamation text-xl text-red-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Telah Dikumpulkan</p>
                <p className="text-3xl font-bold text-green-600">1</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fa-regular fa-circle-check text-xl text-green-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Assignment Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition-all ${
                    activeTab === 'description'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="fa-regular fa-file-lines"></i>
                  Deskripsi
                </button>
                <button
                  onClick={() => setActiveTab('rubric')}
                  className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition-all ${
                    activeTab === 'rubric'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="fa-regular fa-table-list"></i>
                  Rubrik Penilaian
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition-all ${
                    activeTab === 'resources'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="fa-regular fa-paperclip"></i>
                  Resource
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <div className="prose prose-slate max-w-none">
                      <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                        {assignmentData.description}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'rubric' && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Rubrik Penilaian</h4>
                    <div className="space-y-3">
                      {assignmentData.rubric.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">{item.criteria}</p>
                            <p className="text-sm text-slate-500">{item.description}</p>
                          </div>
                          <span className="font-semibold text-blue-600">{item.points} poin</span>
                        </div>
                      ))}
                      <div className="flex justify-end pt-3 border-t border-slate-200">
                        <p className="font-semibold text-slate-800">Total: {assignmentData.points} poin</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Materi Pendukung</h4>
                    <div className="space-y-2">
                      {assignmentData.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                              {resource.type === 'pdf' && <i className="fa-regular fa-file-pdf text-red-500 text-xl"></i>}
                              {resource.type === 'video' && <i className="fa-regular fa-file-video text-blue-500 text-xl"></i>}
                              {resource.type === 'txt' && <i className="fa-regular fa-file-lines text-slate-500 text-xl"></i>}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{resource.name}</p>
                              <p className="text-xs text-slate-400">{resource.size}</p>
                            </div>
                          </div>
                          <i className="fa-regular fa-download text-slate-400"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submission Form */}
            {!submitted ? (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fa-regular fa-pen-to-square text-blue-600"></i>
                  Kerjakan Tugas
                </h3>

                {/* Answer Field */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Jawaban / Dokumentasi
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows="8"
                    placeholder="Tuliskan jawaban Anda di sini...&#10;&#10;Contoh:&#10;1. Langkah instalasi Apache...&#10;2. Konfigurasi virtual host...&#10;3. Setup SSL/TLS..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                {/* File Upload */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <i className="fa-regular fa-paperclip mr-1"></i>
                    Upload File (Konfigurasi, Screenshot, Dokumentasi)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="fileUpload"
                      onChange={handleFileUpload}
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.conf,.md,.png,.jpg,.jpeg"
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <i className="fa-regular fa-cloud-upload-alt text-4xl text-slate-300 mb-3"></i>
                      <p className="text-sm text-slate-600 mb-1">Klik untuk upload file</p>
                      <p className="text-xs text-slate-400">PDF, DOC, TXT, CONF, MD, PNG, JPG (max 20MB)</p>
                    </label>
                  </div>
                  
                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <i className="fa-regular fa-file text-slate-400"></i>
                            <span className="text-sm text-slate-600">{file.name}</span>
                            <span className="text-xs text-slate-400">({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                          <button
                            onClick={() => removeFile(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!answer.trim() && files.length === 0}
                    className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                      answer.trim() || files.length > 0
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <i className="fa-regular fa-paper-plane"></i>
                    Kumpulkan Tugas
                  </button>
                  <button className="px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600">
                    <i className="fa-regular fa-floppy-disk"></i>
                    Simpan Draft
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-regular fa-circle-check text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Tugas Berhasil Dikumpulkan!</h3>
                <p className="text-green-600 mb-4">Tugas Anda telah berhasil dikirim dan akan segera diperiksa oleh instruktur.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Kumpulkan Tugas Lain
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Timer Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <i className="fa-regular fa-hourglass-half text-orange-500"></i>
                Waktu Tersisa
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-100 rounded-lg p-2">
                  <p className="text-2xl font-bold text-slate-800">{timeLeft.days}</p>
                  <p className="text-xs text-slate-500">Hari</p>
                </div>
                <div className="bg-slate-100 rounded-lg p-2">
                  <p className="text-2xl font-bold text-slate-800">{timeLeft.hours}</p>
                  <p className="text-xs text-slate-500">Jam</p>
                </div>
                <div className="bg-slate-100 rounded-lg p-2">
                  <p className="text-2xl font-bold text-slate-800">{timeLeft.minutes}</p>
                  <p className="text-xs text-slate-500">Menit</p>
                </div>
                <div className="bg-slate-100 rounded-lg p-2">
                  <p className="text-2xl font-bold text-slate-800">{timeLeft.seconds}</p>
                  <p className="text-xs text-slate-500">Detik</p>
                </div>
              </div>
            </div>

            {/* Submission Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <i className="fa-regular fa-chart-simple text-blue-600"></i>
                Status Pengumpulan
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Status</span>
                  <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">Belum Dikumpulkan</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Batas Waktu</span>
                  <span className="text-sm font-medium text-slate-800">15 Des 2024, 23:59</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Nilai</span>
                  <span className="text-sm font-medium text-slate-500">- / {assignmentData.points}</span>
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <i className="fa-regular fa-users text-blue-600"></i>
                Pengumpulan Terbaru
              </h3>
              <div className="space-y-3">
                {assignmentData.submissions.map((sub, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{sub.student}</p>
                      <p className="text-xs text-slate-400">{new Date(sub.date).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div>
                      {sub.score ? (
                        <span className="text-sm font-semibold text-green-600">{sub.score}%</span>
                      ) : (
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">Menunggu</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <i className="fa-regular fa-lightbulb text-blue-600 text-xl"></i>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Tips Mengerjakan</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs"></i>
                      Baca instruksi dengan teliti
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs"></i>
                      Sertakan screenshot hasil konfigurasi
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs"></i>
                      Upload file konfigurasi lengkap
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fa-regular fa-circle-check text-green-600 text-xs"></i>
                      Dokumentasikan langkah-langkah dengan jelas
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};