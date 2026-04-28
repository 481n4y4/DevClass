import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/img/Logo.png";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // Can be NIS or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to detect if input is email or NIS
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!identifier || !password) {
      setError(`Email/NIS dan password harus diisi`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/login", {
        nis: identifier,
        password: password,
      });

      const { token, user } = response.data;

      // Simpan data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Cek apakah ini akun guru/admin (NIS berisi email)
      const isTeacher = user.nis && user.nis.includes("@");

      // Navigasi
      if (isTeacher) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError(`Email/NIS atau password salah`);
      } else if (err.response?.status === 422) {
        setError(err.response?.data?.message || "Data tidak valid");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
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
            <h2 className="text-2xl font-bold text-gray-800">
              Masuk ke Akun Anda
            </h2>
            <p className="text-gray-600 mt-2">
              Masukkan NIS (untuk siswa) atau Email (untuk guru/admin)
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-sky-200/40 border border-white/60 ring-1 ring-black/5 p-7 sm:p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Identifier Input - Works for both NIS and Email */}
              <div className="mb-5">
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  NIS / Email
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
                    id="identifier"
                    type="text"
                    placeholder="Masukkan NIS atau Email (contoh: 12345 atau guru@devclass.com)"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={identifier}
                    onChange={(e) => {
                      const value = e.target.value;
                      setIdentifier(value);

                      // Auto-fill password for students only if the input is numeric (NIS)
                      // and password is empty or was auto-filled before
                      if (/^\d+$/.test(value) && !password) {
                        setPassword(value);
                      } else if (isEmail(value) && password === identifier) {
                        // Don't auto-fill password for email
                        // Only clear if it was previously auto-filled from NIS
                        if (!isEmail(identifier) && password === identifier) {
                          setPassword("");
                        }
                      }
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Gunakan NIS untuk siswa (password default = NIS) atau Email
                  untuk guru/admin
                </p>
              </div>

              {/* Password Input */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Lupa password?
                  </button>
                </div>
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
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
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
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center mb-6">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Ingat saya
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-medium text-white shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl"
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
                    Memproses...
                  </div>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="mt-4 text-sm text-gray-500">
                Dengan mendaftar, Anda menyetujui{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Syarat & Ketentuan
                </a>{" "}
                dan{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Kebijakan Privasi
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
