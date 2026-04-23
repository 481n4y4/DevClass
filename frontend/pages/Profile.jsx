// Profile.jsx
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import HeaderBack from "../components/HeaderBack";
import api from "../api/axios";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // API: GET /api/me
      // Headers: Accept: application/json, Authorization: Bearer {token}
      const response = await api.get("/me", {
        headers: {
          Accept: "application/json",
        },
      });
      setProfile(response.data?.data || null);
    } catch (error) {
      console.error("Gagal memuat profil:", error);
      setErrorMessage("Gagal memuat profil. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "-";
    }
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fungsi untuk back ke dashboard
  const handleBackToDashboard = () => {
    // Cek role user untuk redirect ke dashboard yang sesuai
    if (profile?.role === "teacher") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  // Fungsi logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // API: POST /api/logout
      // Headers: Accept: application/json, Authorization: Bearer {token}
      await api.post("/logout", {}, {
        headers: {
          Accept: "application/json",
        },
      });
      
      // Hapus token dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Redirect ke halaman login
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
      // Tetap hapus token meskipun API error
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBack 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={sidebarOpen}
        onBack={handleBackToDashboard}
        backTo="/dashboard"
      />

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-10">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Profil Saya</h2>
            <p className="text-sm text-gray-500 mt-1">
              Informasi akun Anda di DevClass.
            </p>
          </div>
          
          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
            <button
              onClick={fetchProfile}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faRotateRight} />
              Coba lagi
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
            <div className="h-6 w-40 rounded bg-gray-200 mb-4" />
            <div className="h-4 w-3/4 rounded bg-gray-100 mb-2" />
            <div className="h-4 w-2/3 rounded bg-gray-100 mb-6" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="h-16 rounded bg-gray-100" />
              <div className="h-16 rounded bg-gray-100" />
              <div className="h-16 rounded bg-gray-100" />
              <div className="h-16 rounded bg-gray-100" />
            </div>
          </div>
        ) : profile ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                {profile.name
                  ?.split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase() || "U"}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-500 capitalize">{profile.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-400">NIS</p>
                <p className="font-semibold text-gray-800 mt-1">
                  {profile.nis || "-"}
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-400">No Absen</p>
                <p className="font-semibold text-gray-800 mt-1">
                  {profile.no_absen !== undefined && profile.no_absen !== null 
                    ? profile.no_absen 
                    : "-"}
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-400">Kelas</p>
                <p className="font-semibold text-gray-800 mt-1">
                  {profile.kelas && profile.kelas_index 
                    ? `${profile.kelas} - ${profile.kelas_index}` 
                    : "-"}
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-400">Terdaftar</p>
                <p className="font-semibold text-gray-800 mt-1">
                  {formatDate(profile.created_at)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-sm text-gray-500">Profil belum tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}