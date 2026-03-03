import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/img/Logo.png";

// Import Solid Icons
import {
  faServer,
  faBook,
  faEnvelope,
  faTasks,
  faTerminal,
  faGlobe,
  faChartBar,
  faShieldAlt,
  faPlayCircle,
  faList,
  faUserPlus,
  faSignInAlt,
  faPhone,
  faCheckCircle,
  faBars,
  faTimes,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Import Brand Icons
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

// State untuk mobile menu
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fungsi untuk handle navigasi
  const handleLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setIsMenuOpen(false);
  };

  const handleStartLearning = () => {
    navigate("/login");
  };

  const handleViewFeatures = () => {
    // Scroll ke bagian fitur
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Background image fallback jika gambar tidak ditemukan
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 41, 102, 0.85), rgba(0, 41, 102, 0.9)), url('/banner.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className=" p-2 rounded-md mr-3">
                <img src={logo} alt="Logo" className="max-w-12" />
              </div>
              <span className="text-xl font-bold text-blue-900">DevClass</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("about")}
                className="text-blue-700 hover:text-blue-900 font-medium py-2 px-3 transition-colors"
              >
                Tentang
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-blue-700 hover:text-blue-900 font-medium py-2 px-3 transition-colors"
              >
                Fitur
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-blue-700 hover:text-blue-900 font-medium py-2 px-3 transition-colors"
              >
                Kontak
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <button
                onClick={handleLogin}
                className="text-blue-700 hover:text-blue-900 font-medium py-2 px-4 rounded transition-colors"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Masuk
              </button>
              <button
                onClick={handleRegister}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-md"
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Daftar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-blue-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className="text-2xl"
              />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-blue-700 hover:text-blue-900 font-medium py-2 px-3 transition-colors text-left flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="mr-2 text-sm"
                  />
                  Tentang
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-blue-700 hover:text-blue-900 font-medium py-2 px-3 transition-colors text-left flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="mr-2 text-sm"
                  />
                  Fitur
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-blue-700 hover:text-blue-900 font-medium py-2 px-3 transition-colors text-left flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="mr-2 text-sm"
                  />
                  Kontak
                </button>
                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={handleLogin}
                    className="w-full text-blue-700 hover:text-blue-900 font-medium py-3 rounded transition-colors text-left flex items-center justify-between"
                  >
                    <span>
                      <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                      Masuk
                    </span>
                  </button>
                  <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md mt-2"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Daftar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="min-h-screen relative overflow-hidden text-white pt-20 md:pt-24"
        style={backgroundStyle}
      >
        {/* Fallback background jika gambar tidak load */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90 md:hidden"></div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            DevClass — Belajar Server & Jaringan Secara Nyata
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 text-blue-100 max-w-3xl mx-auto px-2 sm:px-0">
            Platform pembelajaran berbasis infrastruktur yang menggabungkan
            kelas online, email internal, praktikum server, dan monitoring
            sistem dalam satu lingkungan terintegrasi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4 sm:px-0">
            <button
              onClick={handleStartLearning}
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg shadow-lg transform transition-transform hover:-translate-y-1 w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faPlayCircle} className="mr-2 sm:mr-3" />
              Mulai Belajar
            </button>
            <button
              onClick={handleViewFeatures}
              className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faList} className="mr-2 sm:mr-3" />
              Lihat Fitur
            </button>
          </div>

          {/* Stats Section */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-bold mb-1">1000+</div>
              <div className="text-blue-200 text-sm sm:text-base">Pengguna</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-bold mb-1">50+</div>
              <div className="text-blue-200 text-sm sm:text-base">
                Modul Praktikum
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-bold mb-1">24/7</div>
              <div className="text-blue-200 text-sm sm:text-base">
                Akses Server
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-bold mb-1">100%</div>
              <div className="text-blue-200 text-sm sm:text-base">
                Praktik Langsung
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </header>

      {/* About DevClass Section */}
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
                Apa itu DevClass?
              </h2>
              <div className="h-2 w-16 sm:w-24 bg-blue-600 mx-auto mb-8 sm:mb-10"></div>
            </div>

            <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8">
                <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                  <FontAwesomeIcon
                    icon={faServer}
                    className="text-xl sm:text-2xl"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 text-center sm:text-left">
                  Platform Pembelajaran Berbasis Infrastruktur
                </h3>
              </div>

              <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                DevClass adalah platform pembelajaran berbasis web yang
                dirancang untuk membantu mahasiswa dan pelajar memahami{" "}
                <span className="font-bold text-blue-800">
                  administrasi server, jaringan, dan layanan internet
                </span>{" "}
                secara langsung melalui praktik nyata.
              </p>

              <div className="bg-white p-4 sm:p-6 rounded-xl border-l-4 border-blue-600">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  Berbeda dengan pembelajaran teori semata, DevClass menyediakan{" "}
                  <span className="font-bold text-blue-800">
                    lingkungan server aktif
                  </span>{" "}
                  yang dapat diakses oleh peserta untuk belajar, bereksperimen,
                  dan memahami cara kerja layanan jaringan secara riil.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-blue-200 flex flex-col items-center">
                <p className="text-gray-600 mb-4 sm:mb-6 text-center">
                  Bergabunglah sekarang untuk mendapatkan akses penuh!
                </p>
                <button
                  onClick={handleRegister}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition-colors shadow-md w-full sm:w-auto"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 sm:py-20 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 sm:mb-6">
              Fitur Utama DevClass
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Platform lengkap untuk pembelajaran server dan jaringan dengan
              pengalaman langsung
            </p>
            <div className="h-2 w-16 sm:w-24 bg-blue-600 mx-auto mt-6 sm:mt-8"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-blue-600 text-3xl sm:text-4xl mb-4 sm:mb-6">
                <FontAwesomeIcon icon={faBook} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                Learning Platform Terpadu
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Akses materi pembelajaran, modul praktikum, dan tugas dalam satu
                dashboard terpusat.
              </p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-50">
                <span className="text-blue-500 text-xs sm:text-sm font-semibold">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Terintegrasi Penuh
                </span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-blue-600 text-3xl sm:text-4xl mb-4 sm:mb-6">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                Email Internal & Webmail
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Setiap pengguna memiliki email DevClass untuk komunikasi resmi
                antara mentor dan peserta.
              </p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-50">
                <span className="text-blue-500 text-xs sm:text-sm font-semibold">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Komunikasi Terstruktur
                </span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-blue-600 text-3xl sm:text-4xl mb-4 sm:mb-6">
                <FontAwesomeIcon icon={faTasks} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                Pengumpulan Tugas Terstruktur
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Sistem pengumpulan tugas yang rapi dan terorganisir melalui
                server terpusat.
              </p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-50">
                <span className="text-blue-500 text-xs sm:text-sm font-semibold">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Manajemen Tugas
                </span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-blue-600 text-3xl sm:text-4xl mb-4 sm:mb-6">
                <FontAwesomeIcon icon={faTerminal} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                Praktikum Server via SSH
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Akses langsung ke server Linux untuk latihan administrasi sistem
                dan jaringan.
              </p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-50">
                <span className="text-blue-500 text-xs sm:text-sm font-semibold">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Akses Langsung
                </span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-blue-600 text-3xl sm:text-4xl mb-4 sm:mb-6">
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                Subdomain & Reverse Proxy
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Setiap layanan memiliki subdomain tersendiri untuk kemudahan
                akses dan manajemen.
              </p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-50">
                <span className="text-blue-500 text-xs sm:text-sm font-semibold">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Akses Terkelola
                </span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-blue-600 text-3xl sm:text-4xl mb-4 sm:mb-6">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                Monitoring Server
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Pantau performa server dan status layanan secara real-time.
              </p>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-50">
                <span className="text-blue-500 text-xs sm:text-sm font-semibold">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Real-time Tracking
                </span>
              </div>
            </div>

            {/* Feature 7 */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100 sm:col-span-2 lg:col-span-3 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="text-blue-600 text-3xl sm:text-4xl mb-4 sm:mb-0 sm:mr-6">
                  <FontAwesomeIcon icon={faShieldAlt} />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                    Keamanan & Kontrol Akses
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Manajemen user, permission, dan keamanan dasar server.
                  </p>
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-50">
                    <span className="text-blue-500 text-xs sm:text-sm font-semibold">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                      Sistem Keamanan Terpadu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <p className="text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0">
              Sudah punya akun? Masuk untuk mengakses semua fitur.
            </p>
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition-colors shadow-md w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Masuk ke Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-16 sm:py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
              Siap Memulai Perjalanan Belajar Server & Jaringan?
            </h2>
            <p className="text-lg sm:text-xl text-blue-200 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0">
              Bergabung dengan DevClass dan dapatkan pengalaman praktik langsung
              dengan infrastruktur server nyata.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
              <button
                onClick={handleRegister}
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg shadow-lg transform transition-transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2 sm:mr-3" />
                Daftar Sekarang
              </button>
              <button
                onClick={handleLogin}
                className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2 sm:mr-3" />
                Masuk ke Akun
              </button>
            </div>

            <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-blue-700">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
                Hubungi Kami
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-10">
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="bg-blue-700 p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-lg sm:text-xl"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Email</div>
                    <div className="text-blue-200">info@devclass.id</div>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <div className="bg-blue-700 p-3 rounded-full mr-4">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-lg sm:text-xl"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Telepon</div>
                    <div className="text-blue-200">+62 21 1234 5678</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
            <div className="mb-8 lg:mb-0 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-md mr-3">
                  <FontAwesomeIcon icon={faServer} />
                </div>
                <h2 className="text-2xl font-bold">DevClass</h2>
              </div>
              <p className="text-blue-300 mb-6 max-w-xs">
                Platform Pembelajaran Server & Jaringan
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <a href="#" className="text-blue-300 hover:text-white text-xl">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#" className="text-blue-300 hover:text-white text-xl">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="text-blue-300 hover:text-white text-xl">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="text-blue-300 hover:text-white text-xl">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="#" className="text-blue-300 hover:text-white text-xl">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="#" className="text-blue-300 hover:text-white text-xl">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-8 lg:mb-0">
              <div>
                <h3 className="text-lg font-bold mb-4 text-center sm:text-left">
                  Navigasi
                </h3>
                <ul className="space-y-2">
                  <li className="text-center sm:text-left">
                    <button
                      onClick={() => scrollToSection("about")}
                      className="text-blue-300 hover:text-white"
                    >
                      Tentang
                    </button>
                  </li>
                  <li className="text-center sm:text-left">
                    <button
                      onClick={() => scrollToSection("features")}
                      className="text-blue-300 hover:text-white"
                    >
                      Fitur
                    </button>
                  </li>
                  <li className="text-center sm:text-left">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-blue-300 hover:text-white"
                    >
                      Kontak
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-center sm:text-left">
                  Akun
                </h3>
                <ul className="space-y-2">
                  <li className="text-center sm:text-left">
                    <button
                      onClick={handleLogin}
                      className="text-blue-300 hover:text-white"
                    >
                      Masuk
                    </button>
                  </li>
                  <li className="text-center sm:text-left">
                    <button
                      onClick={handleRegister}
                      className="text-blue-300 hover:text-white"
                    >
                      Daftar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-8 border-t border-blue-800 text-center text-blue-400">
            <p className="text-sm sm:text-base">
              &copy; {new Date().getFullYear()} DevClass. All rights reserved.
            </p>
            <p className="mt-2 text-xs sm:text-sm">
              Platform edukasi berbasis infrastruktur server.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
