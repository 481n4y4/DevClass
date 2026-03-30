// Buatkelas.jsx
import React, { useState } from 'react';
import Header from '../components/Header';

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
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    // Validasi sebelum lanjut ke step berikutnya
    if (currentStep === 1) {
      if (!formData.className || !formData.classCode) {
        setErrorMessage('Nama kelas dan kode kelas harus diisi');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.schedule.startTime || !formData.schedule.endTime) {
        setErrorMessage('Jam mulai dan jam selesai harus diisi');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.instructor) {
        setErrorMessage('Instruktur utama harus diisi');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Fungsi untuk upload file ke server
  const uploadFile = async (file, type) => {
    if (!file) return null;
    
    const formDataFile = new FormData();
    formDataFile.append('file', file);
    formDataFile.append('type', type);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/upload`, {
        method: 'POST',
        body: formDataFile,
      });
      
      if (!response.ok) {
        throw new Error('Upload file gagal');
      }
      
      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  // Fungsi untuk submit data ke API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi final
    if (!formData.agreeTerms) {
      setErrorMessage('Anda harus menyetujui ketentuan layanan');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    setIsLoading(true);
    setShowError(false);
    
    try {
      // Upload file jika ada
      let syllabusUrl = null;
      let thumbnailUrl = null;
      
      if (formData.syllabus) {
        syllabusUrl = await uploadFile(formData.syllabus, 'syllabus');
      }
      
      if (formData.thumbnail) {
        thumbnailUrl = await uploadFile(formData.thumbnail, 'thumbnail');
      }
      
      // Siapkan data untuk dikirim ke API
      const classData = {
        className: formData.className,
        classCode: formData.classCode,
        description: formData.description,
        category: formData.category,
        level: formData.level,
        schedule: {
          day: formData.schedule.day,
          startTime: formData.schedule.startTime,
          endTime: formData.schedule.endTime,
          room: formData.schedule.room
        },
        maxStudents: parseInt(formData.maxStudents),
        isPrivate: formData.isPrivate,
        instructor: formData.instructor,
        coInstructors: formData.coInstructors,
        syllabus: syllabusUrl,
        thumbnail: thumbnailUrl,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      
      // Kirim data ke API
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Jika menggunakan auth
        },
        body: JSON.stringify(classData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal membuat kelas');
      }
      
      const result = await response.json();
      
      // Tampilkan success message
      setShowSuccess(true);
      
      // Reset form setelah sukses
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setFormData({
          className: '',
          classCode: '',
          description: '',
          category: '',
          level: 'beginner',
          schedule: {
            day: 'senin',
            startTime: '09:00',
            endTime: '11:00',
            room: ''
          },
          maxStudents: 35,
          isPrivate: false,
          instructor: '',
          coInstructors: [],
          syllabus: null,
          thumbnail: null,
          agreeTerms: false
        });
        setCurrentStep(1);
        
        // Redirect ke halaman detail kelas atau dashboard
        // window.location.href = `/kelas/${result.data.id}`;
        // atau menggunakan navigate jika menggunakan react-router
        // navigate(`/kelas/${result.data.id}`);
      }, 3000);
      
    } catch (error) {
      console.error('Submit error:', error);
      setErrorMessage(error.message || 'Terjadi kesalahan saat membuat kelas');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsLoading(false);
    }
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
              <div className="flex flex-col items-center relative flex-1">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <i className={`fa-regular ${step.icon}`}></i>
                </div>
                <p className={`text-sm mt-2 font-medium ${
                  currentStep >= step.number ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:mt-8 mt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
            <i className="fa-solid fa-plus text-3xl text-blue-600"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Buat Kelas Baru</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Isi informasi lengkap untuk membuat kelas baru. Anda dapat mengatur jadwal, instruktur, dan materi pembelajaran.
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 animate-slideDown">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fa-regular fa-circle-check text-green-600 text-lg"></i>
              </div>
              <div className="flex-1">
                <p className="text-green-800 font-medium">Kelas Berhasil Dibuat!</p>
                <p className="text-green-600 text-sm">Kelas {formData.className} telah berhasil dibuat</p>
              </div>
              <button 
                onClick={() => setShowSuccess(false)} 
                className="text-green-600 hover:text-green-800 p-1"
              >
                <i className="fa-regular fa-xmark text-xl"></i>
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {showError && (
          <div className="mb-6 animate-slideDown">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fa-regular fa-circle-exclamation text-red-600 text-lg"></i>
              </div>
              <div className="flex-1">
                <p className="text-red-800 font-medium">Gagal Membuat Kelas</p>
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
              <button 
                onClick={() => setShowError(false)} 
                className="text-red-600 hover:text-red-800 p-1"
              >
                <i className="fa-regular fa-xmark text-xl"></i>
              </button>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <i className="fa-regular fa-circle-info text-blue-600"></i>
                  Informasi Dasar Kelas
                </h3>
                
                <div className="space-y-5">
                  {/* Class Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-regular fa-heading mr-2 text-blue-600"></i>
                      Nama Kelas <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="className"
                      value={formData.className}
                      onChange={handleInputChange}
                      placeholder="Contoh: Administrasi Server Linux"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Class Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-regular fa-hashtag mr-2 text-blue-600"></i>
                      Kode Kelas <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="classCode"
                      value={formData.classCode}
                      onChange={(e) => setFormData({...formData, classCode: e.target.value.toUpperCase()})}
                      placeholder="Contoh: ASL-2024-01"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      <i className="fa-regular fa-circle-info mr-1"></i>
                      Kode unik untuk identifikasi kelas
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-regular fa-align-left mr-2 text-blue-600"></i>
                      Deskripsi Kelas
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Jelaskan tentang kelas ini, materi yang akan dipelajari, dan tujuan pembelajarannya"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Category & Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <i className="fa-regular fa-folder mr-2 text-blue-600"></i>
                        Kategori
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Pilih kategori</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <i className="fa-regular fa-signal mr-2 text-blue-600"></i>
                        Tingkat Kesulitan
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {levels.map(level => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => setFormData({...formData, level: level.value})}
                            className={`p-2 border rounded-lg text-center transition-all ${
                              formData.level === level.value
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-300 hover:border-gray-400 text-gray-600'
                            }`}
                          >
                            <span className="block text-base mb-0.5">{level.icon}</span>
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
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <i className="fa-regular fa-calendar text-blue-600"></i>
                  Jadwal & Pengaturan
                </h3>

                <div className="space-y-5">
                  {/* Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hari
                      </label>
                      <select
                        name="schedule.day"
                        value={formData.schedule.day}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {days.map(day => (
                          <option key={day} value={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jam Mulai
                      </label>
                      <input
                        type="time"
                        name="schedule.startTime"
                        value={formData.schedule.startTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jam Selesai
                      </label>
                      <input
                        type="time"
                        name="schedule.endTime"
                        value={formData.schedule.endTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Room */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-regular fa-building mr-2 text-blue-600"></i>
                      Ruangan / Link Meeting
                    </label>
                    <input
                      type="text"
                      name="schedule.room"
                      value={formData.schedule.room}
                      onChange={handleInputChange}
                      placeholder="Contoh: Lab Komputer 301 / https://meet.google.com/abc-defg-hij"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Max Students */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Privacy Setting */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPrivate"
                        checked={formData.isPrivate}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <span className="font-medium text-gray-700">Kelas Private</span>
                        <p className="text-xs text-gray-400">
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
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <i className="fa-regular fa-chalkboard-user text-blue-600"></i>
                  Instruktur & Materi
                </h3>

                <div className="space-y-5">
                  {/* Main Instructor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-regular fa-user mr-2 text-blue-600"></i>
                      Instruktur Utama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      placeholder="Nama instruktur"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Co-Instructors */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-regular fa-user-plus mr-2 text-blue-600"></i>
                      Co-Instruktur
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="email"
                        value={coInstructorInput}
                        onChange={(e) => setCoInstructorInput(e.target.value)}
                        placeholder="Email co-instruktur"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddCoInstructor}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <i className="fa-regular fa-plus"></i>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.coInstructors.map((email, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <i className="fa-regular fa-envelope text-gray-400"></i>
                            <span className="text-sm text-gray-600">{email}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCoInstructor(email)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Syllabus Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-regular fa-file-pdf mr-2 text-blue-600"></i>
                      Silabus / RPS
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="syllabus"
                        onChange={(e) => handleFileUpload(e, 'syllabus')}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="syllabus" className="cursor-pointer block">
                        <i className="fa-regular fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600 mb-1">
                          {formData.syllabus ? formData.syllabus.name : 'Klik untuk upload silabus'}
                        </p>
                        <p className="text-xs text-gray-400">PDF, DOC maks. 10MB</p>
                      </label>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="fa-regular fa-image mr-2 text-blue-600"></i>
                      Thumbnail Kelas
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        id="thumbnail"
                        onChange={(e) => handleFileUpload(e, 'thumbnail')}
                        className="hidden"
                        accept="image/*"
                      />
                      <label htmlFor="thumbnail" className="cursor-pointer block">
                        <i className="fa-regular fa-camera text-4xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-600 mb-1">
                          {formData.thumbnail ? formData.thumbnail.name : 'Upload gambar thumbnail'}
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG maks. 5MB</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Create */}
            {currentStep === 4 && (
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <i className="fa-regular fa-check-circle text-blue-600"></i>
                  Review & Buat Kelas
                </h3>

                <div className="space-y-5">
                  {/* Summary Card */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-800 mb-3">Ringkasan Kelas</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Nama Kelas</p>
                        <p className="font-medium text-gray-800">{formData.className || '-'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Kode Kelas</p>
                        <p className="font-medium text-gray-800">{formData.classCode || '-'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Kategori</p>
                        <p className="font-medium text-gray-800">{formData.category || '-'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Level</p>
                        <p className="font-medium text-gray-800">
                          {levels.find(l => l.value === formData.level)?.label || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Jadwal</p>
                        <p className="font-medium text-gray-800">
                          {formData.schedule.day}, {formData.schedule.startTime} - {formData.schedule.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Instruktur</p>
                        <p className="font-medium text-gray-800">{formData.instructor || '-'}</p>
                      </div>
                    </div>

                    {formData.description && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-gray-400 text-xs mb-0.5">Deskripsi</p>
                        <p className="text-sm text-gray-700">{formData.description}</p>
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
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                      required
                    />
                    <div>
                      <span className="text-sm text-gray-700">
                        Saya setuju dengan <a href="#" className="text-blue-600 hover:underline">Ketentuan Layanan</a> dan <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a>
                      </span>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Dengan membuat kelas, Anda bertanggung jawab atas konten dan pengelolaan kelas
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className={`px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 ${
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
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  Selanjutnya
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !formData.agreeTerms}
                  className={`px-8 py-2.5 bg-green-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 ${
                    isLoading || !formData.agreeTerms 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-green-700'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <i className="fa-regular fa-spinner fa-spin"></i>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-check"></i>
                      Buat Kelas
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fa-regular fa-lightbulb text-blue-600"></i>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">Tips Membuat Kelas yang Efektif</h4>
              <ul className="text-xs text-gray-600 space-y-1">
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

      <style>{`
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
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .fa-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
} 