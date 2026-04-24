// MaterialsTeacher.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faRotateRight,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileAlt,
  faSpinner,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import HeaderBack from "../components/HeaderBack";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export default function MaterialsTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const [uploadFile, setUploadFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [dropActive, setDropActive] = useState(false);
  const uploadTimerRef = useRef(null);

  const fetchMaterial = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.get(`/materials/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = response.data?.data || null;
      setMaterial(data);
    } catch (error) {
      console.error("Gagal memuat detail material:", error);
      setErrorMessage("Gagal memuat detail material. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMaterial();
    return () => {
      if (uploadTimerRef.current) {
        clearInterval(uploadTimerRef.current);
      }
    };
  }, [fetchMaterial]);

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

  // DOWNLOAD MENGGUNAKAN API ENDPOINT (REKOMENDASI UNTUK SFTP)
  const handleDownload = async (filePath) => {
    if (!filePath) {
      setDownloadError("File tidak tersedia");
      return;
    }

    setIsDownloading(true);
    setDownloadError("");

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

      // Buat blob URL dan trigger download
      const blob = new Blob([downloadedBlob]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = getFileName(filePath);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("Download berhasil");
    } catch (error) {
      console.error("Download error:", error);

      if (error.response?.status === 403) {
        setDownloadError("Akses ditolak. Silakan login kembali.");
      } else if (
        error.response?.status === 404 ||
        error.message === "FILE_NOT_FOUND"
      ) {
        setDownloadError("File tidak ditemukan di server.");
      } else if (error.code === "ERR_NETWORK") {
        setDownloadError("Gagal terhubung ke server. Periksa koneksi.");
      } else {
        setDownloadError(`Gagal mengunduh: ${error.message}`);
      }
    } finally {
      setIsDownloading(false);
      setTimeout(() => setDownloadError(""), 5000);
    }
  };

  const validateFile = (file) => {
    if (!file) {
      return "Silakan pilih file terlebih dahulu.";
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["pdf", "doc", "docx", "ppt", "pptx"];
    const isMimeAllowed = ALLOWED_MIME_TYPES.includes(file.type);
    const isExtensionAllowed = allowedExtensions.includes(extension);

    if (!isMimeAllowed && !isExtensionAllowed) {
      return "Format file harus PDF, DOC, DOCX, PPT, atau PPTX.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return `Ukuran file maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB.`;
    }

    return "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    const error = validateFile(file);
    if (error) {
      setUploadFile(null);
      setUploadError(error);
      return;
    }
    setUploadError("");
    setUploadFile(file || null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDropActive(false);
    const file = event.dataTransfer.files?.[0];
    const error = validateFile(file);
    if (error) {
      setUploadFile(null);
      setUploadError(error);
      return;
    }
    setUploadError("");
    setUploadFile(file || null);
  };

  const handleSubmitAssignment = async () => {
    if (!material?.submission_required) {
      setUploadError("Material ini tidak membutuhkan submission.");
      return;
    }

    const error = validateFile(uploadFile);
    if (error) {
      setUploadError(error);
      return;
    }

    setUploadStatus("uploading");
    setUploadError("");
    setUploadProgress(0);

    if (uploadTimerRef.current) {
      clearInterval(uploadTimerRef.current);
    }

    // Simulasi progress
    uploadTimerRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        const next = Math.min(prev + 12, 100);
        if (next === 100) {
          clearInterval(uploadTimerRef.current);
          setUploadStatus("success");
        }
        return next;
      });
    }, 180);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Memuat detail material...</p>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-4xl text-red-500 mb-4"
          />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Material tidak ditemukan
          </h2>
          <p className="text-slate-600 mb-4">
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
    <div className="min-h-screen bg-slate-50">
      <HeaderBack
        showBackButton={true}
        backTo="/admin/dashboard"
        title={material.title}
      />

      <div className="max-w-5xl mx-auto px-6 py-6 mt-14">
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
            <button
              onClick={fetchMaterial}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faRotateRight} />
              Coba lagi
            </button>
          </div>
        )}

        {downloadError && (
          <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
            <p className="text-sm font-medium text-yellow-700">
              {downloadError}
            </p>
          </div>
        )}

        {/* Detail Material */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Kelas {material.kelas_target ?? "-"} -{" "}
                {material.kelas_index_target ?? "-"}
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-800">
                {material.title}
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                {material.content || "Tidak ada deskripsi."}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                material.submission_required
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {material.submission_required
                ? "Submission Required"
                : "No Submission"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-slate-600">
            <div>
              <p className="text-xs uppercase text-slate-400">Guru</p>
              <p className="font-medium text-slate-800">
                {material.created_by?.name || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Deadline</p>
              <p className="font-medium text-slate-800">
                {formatDate(material.deadline)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Dibuat</p>
              <p className="font-medium text-slate-800">
                {formatDateShort(material.created_at)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">Role Pembuat</p>
              <p className="font-medium text-slate-800">
                {material.created_by?.role || "-"}
              </p>
            </div>
          </div>

          {/* File Download Section */}
          {material.file_path && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                File Materi
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-3">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={getFileIcon(material.file_path)}
                    className={`text-2xl ${getFileIconColor(material.file_path)}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {getFileName(material.file_path)}
                    </p>
                    <p className="text-xs text-slate-500">
                      Klik tombol download untuk mengunduh file
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(material.file_path)}
                  disabled={isDownloading}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isDownloading
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }
                  `}
                >
                  {isDownloading ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />
                      Mengunduh...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faDownload} />
                      Download File
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {!material.file_path && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="text-3xl text-gray-400 mb-2"
                />
                <p className="text-sm text-gray-500">
                  Belum ada file untuk materi ini
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Teacher Actions */}
        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={() => navigate(`/admin/material/${material.id}/edit`)}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Edit Materi
          </button>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Kembali ke Daftar
          </button>
        </div>
      </div>
    </div>
  );
}
