// ClassesPageTeacher.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMagnifyingGlass,
  faRotateRight,
  faDownload,
  faUsers,
  faClock,
  faTasks,
  faTrash,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";

const ClassesPageTeacher = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKelas, setFilterKelas] = useState("all");
  const [filterKelasIndex, setFilterKelasIndex] = useState("all");

  // State untuk delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch materials - Teacher gets ALL materials
  const fetchMaterials = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // API: GET /api/materials
      // Headers: Accept: application/json, Authorization: Bearer {token}
      // Teacher gets all materials from all classes
      const response = await api.get("/materials", {
        headers: {
          Accept: "application/json",
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setMaterials(data);
    } catch (error) {
      console.error("Gagal memuat materials:", error);
      setErrorMessage("Gagal memuat materials. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  // Fungsi hapus materi
  const handleDeleteClick = (material) => {
    setMaterialToDelete(material);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!materialToDelete) return;

    setIsDeleting(true);

    try {
      // API: DELETE /api/materials/{id}
      // Headers: Accept: application/json, Authorization: Bearer {token}
      await api.delete(`/materials/${materialToDelete.id}`, {
        headers: {
          Accept: "application/json",
        },
      });

      // Jika sukses, refresh daftar materials
      await fetchMaterials();

      // Tutup modal
      setShowDeleteModal(false);
      setMaterialToDelete(null);

      // Tampilkan notifikasi sukses (opsional)
      alert("Materi berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus materi:", error);

      // Handle error
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Gagal menghapus materi. Silakan coba lagi.");
      }

      // Tetap tutup modal
      setShowDeleteModal(false);
      setMaterialToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMaterialToDelete(null);
  };

  const formatDate = (value) => {
    if (!value) {
      return "No deadline";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "No deadline";
    }
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const formatDateShort = (value) => {
    if (!value) {
      return "-";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "-";
    }
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(date);
  };

  // Get unique kelas values for filter
  const uniqueKelas = useMemo(() => {
    const kelasSet = new Set(
      materials.map((m) => m.kelas_target).filter(Boolean),
    );
    return ["all", ...Array.from(kelasSet).sort()];
  }, [materials]);

  const uniqueKelasIndex = useMemo(() => {
    const indexSet = new Set(
      materials.map((m) => m.kelas_index_target).filter(Boolean),
    );
    return ["all", ...Array.from(indexSet).sort()];
  }, [materials]);

  // Filter and sort materials
  const filteredMaterials = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    const filtered = materials.filter((material) => {
      // Search filter
      const matchesKeyword = keyword
        ? [material.title, material.content, material.created_by?.name]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(keyword))
        : true;

      // Kelas filter
      const matchesKelas =
        filterKelas === "all" || material.kelas_target === filterKelas;

      // Kelas index filter
      const matchesKelasIndex =
        filterKelasIndex === "all" ||
        material.kelas_index_target === filterKelasIndex;

      return matchesKeyword && matchesKelas && matchesKelasIndex;
    });

    // Sort by created_at (newest first)
    const sorted = [...filtered].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return sorted;
  }, [materials, searchTerm, filterKelas, filterKelasIndex]);

  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="h-3 w-16 rounded-full bg-gray-200 mb-4" />
        <div className="h-5 w-3/4 rounded bg-gray-200 mb-2" />
        <div className="h-4 w-full rounded bg-gray-100 mb-3" />
        <div className="h-4 w-2/3 rounded bg-gray-100 mb-6" />
        <div className="h-10 w-full rounded-xl bg-gray-100" />
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={() => {}} isSidebarOpen={false} />
      <div className="p-6 pt-20">
        {/* Header with Create Class Button */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Kelola Materials
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Kelola semua materi pembelajaran (Teacher View)
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-blue-700"
              onClick={() => navigate("/BuatMateri")}
            >
              <FontAwesomeIcon icon={faPlus} />
              Buat Materi Baru
            </button>

            <button
              className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
              onClick={() => navigate("/admin/users")}
            >
              <FontAwesomeIcon icon={faUsers} />
              Lihat Semua User
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari materi (judul, konten, guru)..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={filterKelas}
              onChange={(event) => setFilterKelas(event.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="all">Semua Kelas</option>
              {uniqueKelas
                .filter((k) => k !== "all")
                .map((kelas) => (
                  <option key={kelas} value={kelas}>
                    Kelas {kelas}
                  </option>
                ))}
            </select>

            <select
              value={filterKelasIndex}
              onChange={(event) => setFilterKelasIndex(event.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="all">Semua Index</option>
              {uniqueKelasIndex
                .filter((i) => i !== "all")
                .map((index) => (
                  <option key={index} value={index}>
                    Index {index}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
            <button
              onClick={fetchMaterials}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faRotateRight} />
              Coba lagi
            </button>
          </div>
        )}

        {/* Stats Summary */}
        {!isLoading && materials.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="bg-white rounded-xl border border-gray-200 px-4 py-2">
              <span className="text-sm text-gray-500">Total Materials:</span>
              <span className="ml-2 font-bold text-gray-800">
                {materials.length}
              </span>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 px-4 py-2">
              <span className="text-sm text-gray-500">Ditampilkan:</span>
              <span className="ml-2 font-bold text-gray-800">
                {filteredMaterials.length}
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {renderSkeletons()}
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Tidak ada materials ditemukan
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Coba ubah pencarian atau filter Anda.
            </p>
            <button
              onClick={fetchMaterials}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faRotateRight} />
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMaterials.map((material) => {
              const submissionRequired = Boolean(material.submission_required);
              const kelasTarget = material.kelas_target ?? "-";
              const kelasIndexTarget = material.kelas_index_target ?? "-";
              const teacherName =
                material.created_by?.name || "Unknown Teacher";

              return (
                <div
                  key={material.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Kelas {kelasTarget} - Index {kelasIndexTarget}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-gray-800 line-clamp-2">
                        {material.title}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                        submissionRequired
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {submissionRequired
                        ? "Submission Required"
                        : "No Submission"}
                    </span>
                  </div>

                  {/* Teacher Info */}
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <FontAwesomeIcon icon={faUsers} className="text-xs" />
                    <span>{teacherName}</span>
                  </div>

                  {/* Content Preview */}
                  {material.content && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {material.content}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="mt-4 space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} className="text-xs" />
                        Deadline
                      </span>
                      <span className="font-medium text-gray-800">
                        {formatDate(material.deadline)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Dibuat</span>
                      <span className="font-medium text-gray-800">
                        {formatDateShort(material.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex items-center justify-between">
                    {material.file_path ? (
                      <a
                        href={material.file_path}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        Download
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">
                        Tidak ada file
                      </span>
                    )}

                    <div className="flex gap-2">
                      {/* Detail Button */}
                      <button
                        onClick={() =>
                          navigate(`/admin/material/${material.id}`)
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                        title="Lihat Detail"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() =>
                          navigate(`/admin/material/${material.id}/edit`)
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                        title="Edit Materi"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(material)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                        title="Hapus Materi"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>

                      {/* Submissions Button (khusus submission_required) */}
                      {submissionRequired && (
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/material/${material.id}/submissions`,
                            )
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-200"
                          title="Lihat Submission"
                        >
                          <FontAwesomeIcon icon={faTasks} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && materialToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-600 text-xl"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hapus Materi?
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Apakah Anda yakin ingin menghapus materi{" "}
                <span className="font-bold text-gray-700">
                  "{materialToDelete.title}"
                </span>
                ?
              </p>
              <p className="text-xs text-red-500 mb-6">
                ⚠️ Tindakan ini tidak dapat dibatalkan. Semua data terkait
                materi ini akan dihapus.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <FontAwesomeIcon
                        icon={faRotateRight}
                        className="animate-spin"
                      />
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faTrash} />
                      Hapus
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesPageTeacher;
