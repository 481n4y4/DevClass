// App.jsx
import React, { useState } from 'react';

export default function Buatkelas() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    className: '',
    classCode: '',
    description: '',
    category: '',
    level: 'beginner',
    
    // Step 2: Schedule & Settings
    schedule: {
      day: 'senin',
      startTime: '09:00',
      endTime: '11:00',
      room: ''
    },
    maxStudents: 35,
    isPrivate: false,
    
    // Step 3: Instructor & Materials
    instructor: '',
    coInstructors: [],
    syllabus: null,
    thumbnail: null,
    
    // Step 4: Review & Create
    agreeTerms: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [coInstructorInput, setCoInstructorInput] = useState('');

  const categories = [
    'Administrasi Server',
    'Jaringan Komputer',
    'Keamanan Siber',
    'Cloud Computing',
    'Virtualisasi',
    'Database',
    'Pemrograman',
    'DevOps'
  ];

  const levels = [
    { value: 'beginner', label: 'Pemula', icon: '🌱' },
    { value: 'intermediate', label: 'Menengah', icon: '📚' },
    { value: 'advanced', label: 'Lanjutan', icon: '🚀' }
  ];

  const days = [
    'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleAddCoInstructor = () => {
    if (coInstructorInput && !formData.coInstructors.includes(coInstructorInput)) {
      setFormData({
        ...formData,
        coInstructors: [...formData.coInstructors, coInstructorInput]
      });
      setCoInstructorInput('');
    }
  };

  const handleRemoveCoInstructor = (email) => {
    setFormData({
      ...formData,
      coInstructors: formData.coInstructors.filter(e => e !== email)
    });
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [field]: file
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Redirect or reset form
    }, 3000);
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Informasi Dasar', icon: 'fa-circle-info' },
      { number: 2, title: 'Jadwal & Pengaturan', icon: 'fa-calendar' },
      { number: 3, title: 'Instruktur & Materi', icon: 'fa-chalkboard-user' },
      { number: 4, title: 'Review & Buat', icon: 'fa-check-circle' }
    ];

    return (
      <div className="mb-12">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center relative">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.number 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <i className={`fa-regular ${step.icon}`}></i>
                </div>
                <p className={`text-sm mt-2 font-medium ${
                  currentStep >= step.number ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {step.title}
                </p>
                {step.number === 1 && (
                  <span className="absolute -bottom-6 text-xs text-blue-600 font-medium">
                    {currentStep === 1 && 'Sedang berlangsung'}
                  </span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${
                  currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
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
              <span className="text-slate-700 font-medium">Buat Kelas Baru</span>
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
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
            <i className="fa-solid fa-plus text-4xl text-blue-600"></i>
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-3">Buat Kelas Baru</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Isi informasi lengkap untuk membuat kelas baru. Anda dapat mengatur jadwal, instruktur, dan materi pembelajaran.
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 animate-slideDown">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fa-regular fa-circle-check text-green-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-green-800 font-medium">Kelas Berhasil Dibuat!</p>
                <p className="text-green-600 text-sm">Kelas {formData.className} telah berhasil dibuat</p>
              </div>
              <button onClick={() => setShowSuccess(false)} className="text-green-600 hover:text-green-800">
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="fa-regular fa-circle-info text-blue-600"></i>
                  Informasi Dasar Kelas
                </h3>
                
                <div className="space-y-6">
                  {/* Class Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-heading mr-2 text-blue-600"></i>
                      Nama Kelas <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="className"
                      value={formData.className}
                      onChange={handleInputChange}
                      placeholder="Contoh: Administrasi Server Linux"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Class Code */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-hashtag mr-2 text-blue-600"></i>
                      Kode Kelas <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="classCode"
                        value={formData.classCode}
                        onChange={(e) => setFormData({...formData, classCode: e.target.value.toUpperCase()})}
                        placeholder="Contoh: ASL-2024-01"
                        className="w-full px-4 py-3 pl-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                      <i className="fa-regular fa-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      <i className="fa-regular fa-circle-info mr-1"></i>
                      Kode unik untuk identifikasi kelas
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-align-left mr-2 text-blue-600"></i>
                      Deskripsi Kelas
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Jelaskan tentang kelas ini, materi yang akan dipelajari, dan tujuan pembelajarannya"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Category & Level */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <i className="fa-regular fa-folder mr-2 text-blue-600"></i>
                        Kategori
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Pilih kategori</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <i className="fa-regular fa-signal mr-2 text-blue-600"></i>
                        Tingkat Kesulitan
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {levels.map(level => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => setFormData({...formData, level: level.value})}
                            className={`p-3 border rounded-xl text-center transition-all ${
                              formData.level === level.value
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                          >
                            <span className="block text-lg mb-1">{level.icon}</span>
                            <span className="text-xs font-medium">{level.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Schedule & Settings */}
            {currentStep === 2 && (
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="fa-regular fa-calendar text-blue-600"></i>
                  Jadwal & Pengaturan
                </h3>

                <div className="space-y-6">
                  {/* Schedule */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Hari
                      </label>
                      <select
                        name="schedule.day"
                        value={formData.schedule.day}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {days.map(day => (
                          <option key={day} value={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Jam Mulai
                      </label>
                      <input
                        type="time"
                        name="schedule.startTime"
                        value={formData.schedule.startTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Jam Selesai
                      </label>
                      <input
                        type="time"
                        name="schedule.endTime"
                        value={formData.schedule.endTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Room */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-building mr-2 text-blue-600"></i>
                      Ruangan / Link Meeting
                    </label>
                    <input
                      type="text"
                      name="schedule.room"
                      value={formData.schedule.room}
                      onChange={handleInputChange}
                      placeholder="Contoh: Lab Komputer 301 / https://meet.google.com/abc-defg-hij"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Max Students */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-users mr-2 text-blue-600"></i>
                      Maksimal Siswa
                    </label>
                    <input
                      type="number"
                      name="maxStudents"
                      value={formData.maxStudents}
                      onChange={handleInputChange}
                      min="1"
                      max="100"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Privacy Setting */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPrivate"
                        checked={formData.isPrivate}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-medium text-slate-700">Kelas Private</span>
                        <p className="text-xs text-slate-400">
                          Hanya siswa dengan kode undangan yang dapat bergabung
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Instructor & Materials */}
            {currentStep === 3 && (
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="fa-regular fa-chalkboard-user text-blue-600"></i>
                  Instruktur & Materi
                </h3>

                <div className="space-y-6">
                  {/* Main Instructor */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-user mr-2 text-blue-600"></i>
                      Instruktur Utama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      placeholder="Nama instruktur"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Co-Instructors */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-user-plus mr-2 text-blue-600"></i>
                      Co-Instruktur
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="email"
                        value={coInstructorInput}
                        onChange={(e) => setCoInstructorInput(e.target.value)}
                        placeholder="Email co-instruktur"
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddCoInstructor}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        <i className="fa-regular fa-plus"></i>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.coInstructors.map((email, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                          <div className="flex items-center gap-2">
                            <i className="fa-regular fa-envelope text-slate-400"></i>
                            <span className="text-sm">{email}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCoInstructor(email)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Syllabus Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-file-pdf mr-2 text-blue-600"></i>
                      Silabus / RPS
                    </label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="syllabus"
                        onChange={(e) => handleFileUpload(e, 'syllabus')}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="syllabus" className="cursor-pointer">
                        <i className="fa-regular fa-cloud-upload-alt text-4xl text-slate-300 mb-3"></i>
                        <p className="text-sm text-slate-600 mb-1">
                          {formData.syllabus ? formData.syllabus.name : 'Klik untuk upload silabus'}
                        </p>
                        <p className="text-xs text-slate-400">PDF, DOC maks. 10MB</p>
                      </label>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <i className="fa-regular fa-image mr-2 text-blue-600"></i>
                      Thumbnail Kelas
                    </label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="thumbnail"
                        onChange={(e) => handleFileUpload(e, 'thumbnail')}
                        className="hidden"
                        accept="image/*"
                      />
                      <label htmlFor="thumbnail" className="cursor-pointer">
                        <i className="fa-regular fa-camera text-4xl text-slate-300 mb-3"></i>
                        <p className="text-sm text-slate-600 mb-1">
                          {formData.thumbnail ? formData.thumbnail.name : 'Upload gambar thumbnail'}
                        </p>
                        <p className="text-xs text-slate-400">PNG, JPG maks. 5MB</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Create */}
            {currentStep === 4 && (
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="fa-regular fa-check-circle text-blue-600"></i>
                  Review & Buat Kelas
                </h3>

                <div className="space-y-6">
                  {/* Summary Card */}
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-800 mb-4">Ringkasan Kelas</h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400 mb-1">Nama Kelas</p>
                        <p className="font-medium">{formData.className || '-'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Kode Kelas</p>
                        <p className="font-medium">{formData.classCode || '-'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Kategori</p>
                        <p className="font-medium">{formData.category || '-'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Level</p>
                        <p className="font-medium">
                          {levels.find(l => l.value === formData.level)?.label || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Jadwal</p>
                        <p className="font-medium">
                          {formData.schedule.day}, {formData.schedule.startTime} - {formData.schedule.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">Instruktur</p>
                        <p className="font-medium">{formData.instructor || '-'}</p>
                      </div>
                    </div>

                    {formData.description && (
                      <div className="mt-4">
                        <p className="text-slate-400 mb-1">Deskripsi</p>
                        <p className="text-sm">{formData.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Terms Agreement */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                      required
                    />
                    <div>
                      <span className="font-medium text-slate-700">
                        Saya setuju dengan <a href="#" className="text-blue-600 hover:underline">Ketentuan Layanan</a> dan <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a>
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        Dengan membuat kelas, Anda bertanggung jawab atas konten dan pengelolaan kelas
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className={`px-6 py-3 border border-slate-200 rounded-xl hover:bg-white transition-colors flex items-center gap-2 ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentStep === 1}
              >
                <i className="fa-regular fa-arrow-left"></i>
                Sebelumnya
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
                >
                  Selanjutnya
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2"
                >
                  <i className="fa-regular fa-check"></i>
                  Buat Kelas
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fa-regular fa-lightbulb text-blue-600"></i>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Tips Membuat Kelas yang Efektif</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li className="flex items-center gap-2">
                  <i className="fa-regular fa-circle-check text-green-600 text-xs"></i>
                  Gunakan nama kelas yang jelas dan mudah diingat
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-regular fa-circle-check text-green-600 text-xs"></i>
                  Sertakan deskripsi lengkap tentang materi yang akan dipelajari
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-regular fa-circle-check text-green-600 text-xs"></i>
                  Upload silabus untuk membantu siswa memahami alur pembelajaran
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-regular fa-circle-check text-green-600 text-xs"></i>
                  Gunakan thumbnail yang menarik untuk meningkatkan engagement
                </li>
              </ul>
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