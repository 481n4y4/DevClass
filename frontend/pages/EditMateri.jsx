// EditMateri.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faDownload,
  faTrash,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileAlt,
  faRotateRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import HeaderBack from "../components/HeaderBack";
import api from "../api/axios";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export default function EditMateri() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [kelasTarget, setKelasTarget] = useState("10");
  const [kelasIndexTarget, setKelasIndexTarget] = useState("1");
  const [deadline, setDeadline] = useState("");
  const [submissionRequired, setSubmissionRequired] = useState(false);
  const [existingFile, setExistingFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDeleteFile, setIsDeleteFile] = useState(false);

  // UI states
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Options for selects
  const kelasOptions = ["10", "11", "12", "13"];
  const kelasIndexOptions = ["1", "2", "3"];

  // Fetch existing material
  const fetchMaterial = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // API: GET /api/materials/{id}
      const response = await api.get(`/materials/${id}`, {
        headers: { Accept: "application/json" },
      });

      const data = response.data?.data || null;
      setMaterial(data);

      // Populate form dengan data existing
      if (data) {
        setTitle(data.title || "");
        setContent(data.content || "");
        setKelasTarget(data.kelas_target || "10");
        setKelasIndexTarget(data.kelas_index_target || "1");
        setDeadline(data.deadline ? formatDateForInput(data.deadline) : "");
        setSubmissionRequired(data.submission_required || false);
        setExistingFile(data.file_path || null);
      }
    } catch (error) {
      console.error("Gagal memuat material:", error);
      setErrorMessage("Gagal memuat detail material. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const formatDateDisplay = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const getFileIcon = (filePath) => {
    if (!filePath) return faFileAlt;
    const extension = filePath.split(".").pop()?.toLowerCase();
    if (extension === "pdf") return faFilePdf;
    if (["doc", "docx"].includes(extension)) return faFileWord;
    if (["ppt", "pptx"].includes(extension)) return faFilePowerpoint;
    return faFileAlt;
  };

  const getFileIconColor = (filePath) => {
    if (!filePath) return "text-gray-500";
    const extension = filePath.split(".").pop()?.toLowerCase();
    if (extension === "pdf") return "text-red-500";
    if (["doc", "docx"].includes(extension)) return "text-blue-500";
    if (["ppt", "pptx"].includes(extension)) return "text-orange-500";
    return "text-gray-500";
  };

  const getFileName = (filePath) => {
    if (!filePath) return "";
    return filePath.split("/").pop();
  };

  const buildDownloadPath = (filePath) => {
    if (!filePath) return "";
    return filePath
      .split("/")
      .filter(Boolean)
      .map((segment) => encodeURIComponent(segment))
      .join("/");
  };

  const buildDirectFileCandidates = (filePath) => {
    const normalized = (filePath || "").replace(/^\/+/, "");
    const fileName = getFileName(normalized);

    return [
      `/${normalized}`,
      `/uploads/${normalized}`,
      `/storage/${normalized}`,
      `/files/${normalized}`,
      `/uploads/${fileName}`,
    ].filter(Boolean);
  };

  // Download file menggunakan API endpoint
  const handleDownload = async (filePath) => {
    if (!filePath) {
      setErrorMessage("File tidak tersedia");
      return;
    }

    setIsDownloading(true);
    setErrorMessage("");

    try {
      let downloadedBlob = null;

      try {
        const response = await api.get(
          `/download/${buildDownloadPath(filePath)}`,
          {
            responseType: "blob",
          },
        );

        if (response.status === 200) {
          downloadedBlob = response.data;
        }
      } catch (apiError) {
        if (apiError?.response?.status !== 404) {
          throw apiError;
        }
      }

      if (!downloadedBlob) {
        const staticCandidates = buildDirectFileCandidates(filePath);
        for (const url of staticCandidates) {
          try {
            const response = await fetch(url, {
              credentials: "include",
            });

            if (response.ok) {
              downloadedBlob = await response.blob();
              break;
            }
          } catch {
            // Lanjut ke kandidat berikutnya.
          }
        }
      }

      if (!downloadedBlob) {
        throw new Error("FILE_NOT_FOUND");
      }

      const blob = new Blob([downloadedBlob]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = getFileName(filePath);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      if (error.response?.status === 403) {
        setErrorMessage("Akses ditolak. Silakan login kembali.");
      } else if (
        error.response?.status === 404 ||
        error.message === "FILE_NOT_FOUND"
      ) {
        setErrorMessage("File tidak ditemukan di server.");
      } else {
        setErrorMessage(`Gagal mengunduh file: ${error.message}`);
      }
    } finally {
      setIsDownloading(false);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const validateFile = (file) => {
    if (!file) return null;

    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["pdf", "doc", "docx", "ppt", "pptx"];
    const isMimeAllowed = ALLOWED_MIME_TYPES.includes(file.type);
    const isExtensionAllowed = allowedExtensions.includes(extension);

    if (!isMimeAllowed && !isExtensionAllowed) {
      return "Format file harus PDF, DOC, DOCX, PPT, atau PPTX.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Ukuran file maksimal 10MB.";
    }

    return null;
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    const error = validateFile(file);
    if (error) {
      setNewFile(null);
      setFileName("");
      setErrorMessage(error);
      return;
    }
    setErrorMessage("");
    setNewFile(file);
    setFileName(file.name);
    setIsDeleteFile(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDropActive(false);
    const file = event.dataTransfer.files?.[0];
    const error = validateFile(file);
    if (error) {
      setNewFile(null);
      setFileName("");
      setErrorMessage(error);
      return;
    }
    setErrorMessage("");
    setNewFile(file);
    setFileName(file.name);
    setIsDeleteFile(false);
  };

  const handleRemoveNewFile = () => {
    setNewFile(null);
    setFileName("");
  };

  const handleDeleteExistingFile = () => {
    setIsDeleteFile(true);
    setExistingFile(null);
  };

  const handleCancelDeleteFile = () => {
    setIsDeleteFile(false);
    setExistingFile(material?.file_path || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowSuccess(false);

    // Validasi required fields
    if (!title.trim()) {
      setErrorMessage("Judul materi harus diisi");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare FormData untuk multipart/form-data
      const formData = new FormData();
      formData.append("title", title.trim());
      if (content && content.trim()) formData.append("content", content.trim());
      formData.append("kelas_target", kelasTarget);
      formData.append("kelas_index_target", kelasIndexTarget);

      // Format deadline jika ada
      if (deadline) {
        const deadlineFormatted = deadline.replace("T", " ") + ":00";
        formData.append("deadline", deadlineFormatted);
      }

      formData.append("submission_required", submissionRequired ? "1" : "0");

      // Handle file: jika upload file baru
      if (newFile) {
        formData.append("file", newFile);
      }

      // Jika ingin menghapus file, kirim parameter khusus
      // Catatan: Untuk menghapus file, cukup tidak kirim field file
      // Tapi API mungkin butuh isDeleteFile flag
      if (isDeleteFile && !newFile) {
        formData.append("delete_file", "1");
      }

      // Untuk PUT request dengan FormData, Laravel requires _method=PUT
      formData.append("_method", "PUT");

      // API: PUT /api/materials/{id}
      // Menggunakan POST karena browser tidak support PUT dengan FormData
      const response = await api.post(`/materials/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setShowSuccess(true);

        // Redirect after 2 seconds ke halaman detail materi (teacher view)
        setTimeout(() => {
          navigate(`/admin/material/${id}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Gagal update materi:", error);

      // Handle validation errors dari API
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0]?.[0];
        setErrorMessage(firstError || "Terjadi kesalahan validasi");
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.code === "ERR_NETWORK") {
        setErrorMessage("Gagal terhubung ke server. Periksa koneksi Anda.");
      } else {
        setErrorMessage("Terjadi kesalahan saat update materi");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fungsi untuk back button - kembali ke halaman detail materi
  const handleBack = () => {
    navigate(`/admin/material/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail material...</p>
        </div>
      </div>
    );
  }

  if (!material && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Material tidak ditemukan
          </h2>
          <p className="text-gray-600 mb-4">
            Material dengan ID {id} tidak tersedia
          </p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Daftar Materi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBack onBack={handleBack} backTo="/admin/dashboard" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:mt-8 mt-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4">
            <FontAwesomeIcon
              icon={faUpload}
              className="text-2xl text-amber-600"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Materi</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Ubah informasi materi pembelajaran
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 animate-fade-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                ✓ Materi berhasil diupdate! Mengarahkan ke halaman detail...
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title Field - Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Materi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Bab 1 - Pengenalan Laravel"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Content Field - Optional */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konten / Deskripsi
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                placeholder="Masukkan konten materi atau deskripsi singkat..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">Opsional</p>
            </div>

            {/* Kelas Target */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kelas Target <span className="text-red-500">*</span>
              </label>
              <select
                value={kelasTarget}
                onChange={(e) => setKelasTarget(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                {kelasOptions.map((kelas) => (
                  <option key={kelas} value={kelas}>
                    Kelas {kelas}
                  </option>
                ))}
              </select>
            </div>

            {/* Kelas Index Target */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Index Kelas Target <span className="text-red-500">*</span>
              </label>
              <select
                value={kelasIndexTarget}
                onChange={(e) => setKelasIndexTarget(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                {kelasIndexOptions.map((index) => (
                  <option key={index} value={index}>
                    Index {index}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">
                Opsional. Biarkan kosong jika tidak ada deadline
              </p>
            </div>

            {/* Submission Required Checkbox */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={submissionRequired}
                  onChange={(e) => setSubmissionRequired(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Wajib Submit Tugas
                </span>
              </label>
              <p className="text-xs text-gray-400 mt-1 ml-7">
                Jika diaktifkan, siswa harus mengumpulkan tugas untuk materi ini
              </p>
            </div>

            {/* File Management */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Materi
              </label>

              {/* Existing File Display with Download Button */}
              {material?.file_path && !isDeleteFile && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={getFileIcon(material.file_path)}
                        className={`text-xl ${getFileIconColor(material.file_path)}`}
                      />
                      <span className="text-sm text-gray-700">
                        {getFileName(material.file_path)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownload(material.file_path)}
                        disabled={isDownloading}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        {isDownloading ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin"
                          />
                        ) : (
                          <FontAwesomeIcon icon={faDownload} />
                        )}
                        Download
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteExistingFile}
                        className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        Hapus
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Terakhir diupload: {formatDateDisplay(material.created_at)}
                  </p>
                </div>
              )}

              {/* Show message if file will be deleted */}
              {isDeleteFile && (
                <div className="mb-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-700">
                      ⚠️ File akan dihapus saat menyimpan perubahan
                    </span>
                    <button
                      type="button"
                      onClick={handleCancelDeleteFile}
                      className="text-gray-600 hover:text-gray-700 text-sm"
                    >
                      Batalkan
                    </button>
                  </div>
                </div>
              )}

              {/* New File Upload */}
              {!isDeleteFile && (
                <div
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                    dropActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDropActive(true);
                  }}
                  onDragLeave={() => setDropActive(false)}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <div className="space-y-1 text-center">
                    {newFile ? (
                      <div className="flex items-center justify-center gap-3">
                        {newFile.type === "application/pdf" && (
                          <FontAwesomeIcon
                            icon={faFilePdf}
                            className="text-red-500 text-2xl"
                          />
                        )}
                        {newFile.type?.includes("word") && (
                          <FontAwesomeIcon
                            icon={faFileWord}
                            className="text-blue-500 text-2xl"
                          />
                        )}
                        {newFile.type?.includes("powerpoint") && (
                          <FontAwesomeIcon
                            icon={faFilePowerpoint}
                            className="text-orange-500 text-2xl"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {newFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(newFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNewFile();
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="mx-auto h-12 w-12 text-gray-400"
                        />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <span className="font-medium text-blue-600 hover:text-blue-500">
                            Klik untuk upload
                          </span>
                          <span className="mx-1">atau</span>
                          <span>drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, DOCX, PPT, PPTX (Max. 10MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />

              {!material?.file_path && !newFile && !isDeleteFile && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">
                    Belum ada file untuk materi ini. Upload file baru jika
                    perlu.
                  </p>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
              <p className="font-medium mb-1">📝 Catatan:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Field dengan tanda <span className="text-red-500">*</span>{" "}
                  wajib diisi
                </li>
                <li>Jika upload file baru, file lama akan diganti</li>
                <li>Kosongkan file jika tidak ingin mengubah file yang ada</li>
                <li>File disimpan di server SFTP yang aman</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-amber-400 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {isSubmitting && (
                  <FontAwesomeIcon
                    icon={faRotateRight}
                    className="animate-spin"
                  />
                )}
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
