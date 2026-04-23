// Profile.jsx
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faRotateRight, 
  faArrowRightFromBracket,
  faPen,
  faSave,
  faTimes,
  faEnvelope,
  faUser
} from "@fortawesome/free-solid-svg-icons";
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
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // API: GET /api/me
      const response = await api.get("/me", {
        headers: { Accept: "application/json" },
      });
      
      // Response langsung data user, bukan wrapper {data: {...}}
      const userData = response.data?.data || response.data;
      setProfile(userData);
      
      // Set edit form values
      setEditName(userData?.name || "");
      setEditEmail(userData?.email || "");
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
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleBackToDashboard = () => {
    if (profile?.role === "teacher") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/logout", {}, {
        headers: { Accept: "application/json" },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle edit profile
  const handleEditClick = () => {
    setEditName(profile?.name || "");
    setEditEmail(profile?.email || "");
    setIsEditing(true);
    setEditError("");
    setEditSuccess("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditError("");
    setEditSuccess("");
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setEditError("Nama tidak boleh kosong");
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editEmail && !emailRegex.test(editEmail)) {
      setEditError("Format email tidak valid");
      return;
    }

    setIsSaving(true);
    setEditError("");
    setEditSuccess("");

    try {
      // API: PUT /api/me
      const payload = {};
      if (editName !== profile?.name) payload.name = editName;
      if (editEmail !== profile?.email) payload.email = editEmail;

      if (Object.keys(payload).length === 0) {
        setEditError("Tidak ada perubahan yang disimpan");
        setIsSaving(false);
        return;
      }

      const response = await api.put("/me", payload, {
        headers: { 
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });

      const updatedUser = response.data?.user || response.data;
      setProfile(updatedUser);
      
      setEditSuccess("Profil berhasil diperbarui!");
      
      // Close edit mode after 1.5 seconds
      setTimeout(() => {
        setIsEditing(false);
        setEditSuccess("");
      }, 1500);
      
    } catch (error) {
      console.error("Gagal update profil:", error);
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0]?.[0];
        setEditError(firstError || "Terjadi kesalahan validasi");
      } else if (error.response?.data?.message) {
        setEditError(error.response.data.message);
      } else {
        setEditError("Gagal memperbarui profil. Silakan coba lagi.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
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
          
          <div className="flex gap-3">
            {/* Tombol Edit Profile */}
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPen} />
                Edit Profil
              </button>
            )}
            
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
        </div>

        {/* Error Message Global */}
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

        {/* Loading State */}
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
            {/* Avatar dan Role */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                {getInitials(profile.name)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-500 capitalize">{profile.role}</p>
              </div>
            </div>

            {/* Success Message Edit */}
            {editSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">{editSuccess}</p>
              </div>
            )}

            {/* Error Message Edit */}
            {editError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{editError}</p>
              </div>
            )}

            {/* Mode Edit vs View */}
            {isEditing ? (
              // FORM EDIT MODE
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan email (opsional)"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Email bersifat opsional. Kosongkan jika tidak ingin mengisi.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    Batal
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <FontAwesomeIcon icon={faRotateRight} className="animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSave} />
                        Simpan Perubahan
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              // VIEW MODE - Tampilkan Data
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">NIS</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {profile.nis || "-"}
                  </p>
                </div>
                
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Email</p>
                  <p className="font-semibold text-gray-800 mt-1 break-all">
                    {profile.email || "-"}
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
            )}
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