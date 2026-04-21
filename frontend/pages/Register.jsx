import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/img/Logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // State untuk show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Fungsi untuk menghitung kekuatan password
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  // Fungsi toggle untuk show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Fungsi toggle untuk show/hide confirm password
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validasi
    if (!name || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password harus minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Navigasi ke halaman login dengan pesan sukses
      navigate("/login", {
        state: {
          message: "Registrasi berhasil! Silakan login dengan akun Anda.",
        },
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        setError("Email sudah terdaftar");
      } else if (err.response?.status === 422) {
        setError("Format data tidak valid");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk mendapatkan warna strength meter
  const getStrengthColor = (strength) => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Fungsi untuk mendapatkan teks strength meter
  const getStrengthText = (strength) => {
    if (strength <= 1) return "Sangat Lemah";
    if (strength <= 2) return "Lemah";
    if (strength <= 3) return "Cukup";
    if (strength <= 4) return "Kuat";
    return "Sangat Kuat";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 flex flex-col">
      <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-sky-200/40 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-10 h-48 w-48 rounded-full bg-emerald-200/40 blur-2xl" />
      {/* Navbar */}
      <nav className="relative z-10 w-full border-b border-white/50 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow ring-1 ring-black/5">
              <img
                src={logo}
                alt="DevClass"
                className="h-6 w-6 object-contain"
              />
            </span>
            <span className="text-lg font-semibold text-gray-900">
              Dev<span className="text-blue-600">Class</span>
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Beranda
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Masuk
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Logo dan Branding */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 flex items-center justify-center mr-3">
                  <img
                    src={logo}
                    alt="DevClass"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dev<span className="text-blue-600">Class</span>
                </h1>
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">Buat Akun Baru</h2>
            <p className="text-gray-600 mt-2">
              Bergabung dengan DevClass untuk mendukung pembelajaran yang
              terpusat, aman, dan mudah diakses.
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-sky-200/40 border border-white/60 ring-1 ring-black/5 p-7 sm:p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister}>
              {/* Nama Input */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Alamat Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password minimal 6 karakter"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    disabled={isLoading}
                  />
                  {/* Toggle Show/Hide Password Button */}
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {password && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Kekuatan password:</span>
                      <span
                        className={`font-medium ${
                          passwordStrength <= 1
                            ? "text-red-600"
                            : passwordStrength <= 3
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthColor(passwordStrength)} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Password harus mengandung:</p>
                      <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                        <li
                          className={
                            password.length >= 8
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          Minimal 8 karakter
                        </li>
                        <li
                          className={
                            /[A-Z]/.test(password)
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          Huruf kapital
                        </li>
                        <li
                          className={
                            /[0-9]/.test(password)
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          Angka
                        </li>
                        <li
                          className={
                            /[^A-Za-z0-9]/.test(password)
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          Karakter khusus
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="mb-7">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Konfirmasi password Anda"
                    className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  {/* Toggle Show/Hide Confirm Password Button */}
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    Password tidak cocok
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start mb-6">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Saya menyetujui{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Syarat & Ketentuan
                  </a>{" "}
                  dan{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Kebijakan Privasi
                  </a>{" "}
                  DevClass
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-medium text-white shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                  isLoading
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Membuat Akun...
                  </div>
                ) : (
                  "Daftar Sekarang"
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Dengan mendaftar, Anda mendapatkan akses ke seluruh fitur
                DevClass untuk mendukung pembelajaran pemrograman secara online
                dan terpusat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
