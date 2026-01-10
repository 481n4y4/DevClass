import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Set initial state untuk mobile
    if (window.innerWidth < 768) {
      setIsScrolled(true); // Selalu solid untuk mobile
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk handle navigasi
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleMobileMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Tentukan kelas navbar berdasarkan kondisi
  const getNavbarClass = () => {
    if (window.innerWidth < 768) {
      // Untuk mobile, selalu bg-white dengan shadow
      return "bg-white shadow-md";
    } else {
      // Untuk desktop, tergantung scroll
      return isScrolled ? "bg-white shadow-md" : "bg-transparent";
    }
  };

  return (
    <div className="bg-white">
      {/* Header/Navigation - PERBAIKAN DI SINI */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          // Untuk mobile: selalu solid, untuk desktop: tergantung scroll
          window.innerWidth < 768 ? "bg-white shadow-md" : 
          (isScrolled ? "bg-white shadow-md" : "bg-transparent")
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">MF</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dev<span className="text-blue-600">Class</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Fitur
              </a>
              <a
                href="#tech"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Teknologi
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Tentang
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="px-5 py-2 text-gray-700 font-medium hover:text-blue-600 transition cursor-pointer"
              >
                Masuk
              </button>
              <button
                onClick={handleRegister}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
              >
                Daftar Gratis
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 bg-white">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fitur
                </a>
                <a
                  href="#tech"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teknologi
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tentang
                </a>
                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => handleMobileMenuClick("/login")}
                    className="block w-full text-center py-2.5 text-gray-700 font-medium border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => handleMobileMenuClick("/register")}
                    className="block w-full text-center py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow"
                  >
                    Daftar Gratis
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white ">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Hero Content */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Kelola <span className="text-blue-600">Alur Kerja</span> dan Ide
                Anda dengan Lebih Terstruktur
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                MindFlow adalah aplikasi berbasis web yang membantu Anda
                mengelola alur kerja, ide, dan data secara terstruktur dengan
                fitur autentikasi JWT dan REST API yang lengkap.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleRegister}
                  className="px-8 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-center shadow-lg cursor-pointer"
                >
                  Mulai Sekarang - Gratis
                </button>
                <a
                  href="#features"
                  className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition text-center"
                >
                  Pelajari Fitur
                </a>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 mr-3"></div>
                    <div>
                      <div className="h-3 w-32 bg-gray-900 rounded mb-1"></div>
                      <div className="h-2 w-24 bg-gray-400 rounded"></div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-500 mr-3"></div>
                      <div className="h-3 w-48 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500 mr-3"></div>
                      <div className="h-3 w-40 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-purple-500 mr-3"></div>
                      <div className="h-3 w-44 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-3 w-24 bg-gray-900 rounded"></div>
                      <div className="h-8 w-20 bg-blue-600 text-white text-xs flex items-center justify-center rounded-lg">
                        CRUD Active
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fitur Utama MindFlow
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Solusi lengkap untuk mengelola alur kerja dan meningkatkan produktivitas Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Keamanan Akun */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Keamanan Akun
              </h3>
              <p className="text-gray-600">
                MindFlow menyediakan sistem akun pribadi agar setiap pengguna dapat menyimpan dan mengelola data mereka dengan aman. Hanya pemilik akun yang dapat mengakses informasi miliknya.
              </p>
            </div>

            {/* Feature 2 - Pengelolaan Aktivitas & Catatan */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-6 group-hover:from-green-200 group-hover:to-green-300 transition-all">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Pengelolaan Aktivitas & Catatan
              </h3>
              <p className="text-gray-600">
                Pengguna dapat menambahkan, melihat, mengubah, dan menghapus aktivitas atau catatan sesuai kebutuhan. Semua data tersimpan rapi dan mudah diatur.
              </p>
            </div>

            {/* Feature 3 - Akses Mudah & Cepat */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-6 group-hover:from-purple-200 group-hover:to-purple-300 transition-all">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Akses Mudah & Cepat
              </h3>
              <p className="text-gray-600">
                MindFlow dapat digunakan melalui browser tanpa instalasi tambahan. Perubahan data akan langsung terlihat sehingga pengguna dapat bekerja dengan lebih efisien.
              </p>
            </div>

            {/* Feature 4 - Tampilan Sederhana & Nyaman */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center mb-6 group-hover:from-yellow-200 group-hover:to-yellow-300 transition-all">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tampilan Sederhana & Nyaman
              </h3>
              <p className="text-gray-600">
                Dirancang dengan tampilan yang bersih dan modern agar mudah dipahami oleh siapa saja, baik pengguna baru maupun yang sudah terbiasa.
              </p>
            </div>

            {/* Feature 5 - Sinkronisasi Data */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-6 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sinkronisasi Data
              </h3>
              <p className="text-gray-600">
                Data pengguna akan selalu tersimpan dan dapat diakses kembali kapan saja setelah masuk ke akun, tanpa takut kehilangan informasi.
              </p>
            </div>

            {/* Feature 6 - Membantu Fokus & Produktivitas */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-6 group-hover:from-red-200 group-hover:to-red-300 transition-all">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Membantu Fokus & Produktivitas
              </h3>
              <p className="text-gray-600">
                MindFlow membantu pengguna mengatur alur pikir dan pekerjaan agar lebih terstruktur, sehingga aktivitas dapat dijalankan dengan lebih tenang dan terarah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About/CTA Section */}
      <section
        id="about"
        className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Mengoptimalkan Alur Kerja Anda?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            MindFlow dikembangkan sebagai bagian dari pembelajaran dan
            implementasi Full Stack Web Development. Bergabunglah sekarang untuk
            mengelola ide dan data secara terstruktur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRegister}
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg shadow-xl cursor-pointer"
            >
              Daftar Gratis Sekarang
            </button>
            <button
              onClick={handleLogin}
              className="inline-block px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-lg cursor-pointer"
            >
              Masuk ke Akun
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">MF</span>
                </div>
                <h1 className="text-2xl font-bold">
                  Mind<span className="text-blue-400">Flow</span>
                </h1>
              </div>
              <p className="text-gray-400">
                Kelola alur kerja, ide, dan data secara terstruktur.
              </p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Dokumentasi
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Kontak
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} MindFlow. Dibangun dengan
              React.js dan Tailwind CSS.
            </p>
            <p className="mt-2">
              Proyek pembelajaran Full Stack Web Development dengan fokus pada
              Authentication JWT & CRUD REST API.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component for Technology Item
const TechItem = ({ name, color, textColor }) => (
  <div className="flex items-center">
    <div className={`w-3 h-3 rounded-full ${color} mr-3`}></div>
    <span className={`font-medium ${textColor}`}>{name}</span>
  </div>
);