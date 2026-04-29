// Materials.jsx - Student POV
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faRotateRight,
  faUpload,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileAlt,
  faPaperPlane,
  faTrash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import HeaderBack from "../components/HeaderBack";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export default function Materials() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Submission states
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [dropActive, setDropActive] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  // Download state
  const [isDownloading, setIsDownloading] = useState(false);

  // Delete submission state
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch material detail
  const fetchMaterial = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.get(`/materials/${id}`, {
        headers: { Accept: "application/json" },
      });

      const data = response.data?.data || null;
      setMaterial(data);

      // Cek apakah user sudah pernah submit
      if (data?.submission_required) {
        await checkExistingSubmission();
      }
    } catch (error) {
      console.error("Gagal memuat detail material:", error);
      setErrorMessage("Gagal memuat detail material. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Check if student already submitted
  const checkExistingSubmission = async () => {
    try {
      const response = await api.get(`/materials/${id}/my-submission`, {
        headers: { Accept: "application/json" },
      });

      const mySubmission = response.data?.data || null;
      if (mySubmission) {
        setSubmissionData(mySubmission);
        setUploadStatus("success");
      } else {
        setSubmissionData(null);
        setUploadStatus("idle");
      }
    } catch (error) {
      console.error("Gagal cek submission:", error);
      if (error?.response?.status === 404) {
        setSubmissionData(null);
        setUploadStatus("idle");
      }
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

  const formatDate = (value) => {
    if (!value) return "No deadline";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "No deadline";
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const formatDateShort = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
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

  // Download materi file
  const handleDownloadMaterial = async (filePath) => {
    if (!filePath) {
      setErrorMessage("File tidak tersedia");
      return;
    }

    setIsDownloading(true);
    setErrorMessage("");

    try {
      const encodedPath = buildDownloadPath(filePath);
      const response = await api.get(`/download/${encodedPath}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
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
      } else if (error.response?.status === 404) {
        setErrorMessage("File tidak ditemukan.");
      } else {
        setErrorMessage(`Gagal mengunduh file: ${error.message}`);
      }
    } finally {
      setIsDownloading(false);
      setTimeout(() => setErrorMessage(""), 5000);
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
      return "Ukuran file maksimal 10MB.";
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

  // Submit assignment - menggunakan endpoint yang benar dari dokumentasi
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

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await api.post(`/submit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      if (response.status === 200 || response.status === 201) {
        setUploadStatus("success");
        setSubmissionData(response.data);
        setUploadFile(null);
        
        // Refresh submission data
        await checkExistingSubmission();
        
        setTimeout(() => {
          setUploadStatus("idle");
        }, 3000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      
      if (error.response) {
        if (error.response.status === 422) {
          const errorMessage = error.response.data?.message || 
                             error.response.data?.errors?.file?.[0] ||
                             "Validasi gagal. Periksa file Anda.";
          setUploadError(errorMessage);
        } else if (error.response.status === 403) {
          setUploadError("Anda tidak memiliki akses untuk submit tugas ini.");
        } else if (error.response.status === 404) {
          setUploadError(`Material dengan ID ${id} tidak ditemukan.`);
        } else {
          setUploadError(error.response.data?.message || "Terjadi kesalahan saat upload");
        }
      } else {
        setUploadError("Gagal mengupload tugas. Silakan coba lagi.");
      }
      
      setUploadStatus("error");
      setTimeout(() => {
        setUploadStatus("idle");
        setUploadError("");
      }, 5000);
    }
  };

  const handleDeleteSubmission = async () => {
    if (!submissionData?.id) {
      setDeleteError("Data submission tidak ditemukan.");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      await api.delete(`/submissions/${submissionData.id}`, {
        headers: { Accept: "application/json" },
      });

      // Reset submission data
      setSubmissionData(null);
      setUploadFile(null);
      setUploadStatus("idle");
      setShowDeleteConfirm(false);
      
      // Refresh untuk memastikan
      await checkExistingSubmission();
      
    } catch (error) {
      console.error("Delete error:", error);
      
      if (error.response?.status === 422) {
        setDeleteError("Tugas tidak dapat dihapus karena sudah dinilai.");
      } else if (error.response?.status === 403) {
        setDeleteError("Anda tidak memiliki izin untuk menghapus tugas ini.");
      } else {
        setDeleteError(
          error.response?.data?.message || "Gagal menghapus tugas",
        );
      }
    } finally {
      setIsDeleting(false);
    }
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
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderBack
        showBackButton={true}
        backTo="/dashboard"
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

        {/* Detail Material Card */}
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
              {material.submission_required ? "Perlu Submit" : "Tanpa Submit"}
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
          </div>

          {/* File Material Download */}
          {material.file_path && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                File Materi
              </h3>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={getFileIcon(material.file_path)}
                    className={`text-2xl ${getFileIconColor(material.file_path)}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {getFileName(material.file_path)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownloadMaterial(material.file_path)}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
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
              </div>
            </div>
          )}
        </div>

        {/* Submit Assignment Section */}
        {material.submission_required && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Submit Tugas
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Unggah file tugas Anda sesuai format yang didukung. Maksimal 10MB.
            </p>

            {/* Sudah submit */}
            {submissionData && uploadStatus === "success" ? (
              <>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-green-600 text-xl"
                    />
                    <div>
                      <p className="text-green-800 font-medium">
                        Tugas berhasil dikirim!
                      </p>
                      <p className="text-green-600 text-sm">
                        Terkirim pada: {formatDate(submissionData.submitted_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grade Section */}
                {submissionData.grade && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-500 text-lg"
                      />
                      <p className="text-sm font-medium text-slate-700">
                        Nilai:{" "}
                        <span className="text-lg font-bold text-blue-600">
                          {submissionData.grade.score}
                        </span>
                      </p>
                    </div>
                    {submissionData.grade.feedback && (
                      <div className="mt-2 pt-2 border-t border-blue-200">
                        <p className="text-xs text-slate-600 font-medium mb-1">
                          Feedback dari guru:
                        </p>
                        <p className="text-sm text-slate-700">
                          {submissionData.grade.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Delete Error */}
                {deleteError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                      {deleteError}
                    </p>
                  </div>
                )}

                {/* Delete Button - Only if not graded */}
                {!submissionData.grade && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={isDeleting}
                      className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Hapus / Undo
                    </button>
                  </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        Hapus Submission?
                      </h3>
                      <p className="text-slate-600 mb-4">
                        Apakah Anda yakin ingin menghapus submission ini? Anda dapat mengumpulkan ulang nanti.
                      </p>
                      {deleteError && (
                        <p className="text-sm text-red-600 mb-4">{deleteError}</p>
                      )}
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeleteError("");
                          }}
                          className="flex-1 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          onClick={handleDeleteSubmission}
                          disabled={isDeleting}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isDeleting ? (
                            <>
                              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
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
                )}
              </>
            ) : (
              <>
                {/* Upload Area */}
                <div
                  className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-sm transition cursor-pointer ${
                    dropActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-gray-50 hover:border-blue-400"
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
                  {uploadFile ? (
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        className="text-3xl text-blue-500 mb-2"
                      />
                      <p className="font-medium text-gray-700">
                        {uploadFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadFile(null);
                        }}
                        className="mt-2 text-red-500 text-sm hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faUpload}
                        className="mx-auto h-10 w-10 text-gray-400 mb-2"
                      />
                      <p className="text-gray-600">
                        Drag & drop file di sini, atau klik untuk memilih
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PDF, DOC, DOCX, PPT, PPTX (Max. 10MB)
                      </p>
                    </>
                  )}
                </div>

                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />

                {/* Upload Progress */}
                {uploadStatus === "uploading" && (
                  <div className="mt-4">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Mengunggah... {uploadProgress}%
                    </p>
                  </div>
                )}

                {/* Upload Error */}
                {uploadError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                      {uploadError}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmitAssignment}
                  disabled={!uploadFile || uploadStatus === "uploading"}
                  className={`mt-4 w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors flex items-center justify-center gap-2
                    ${
                      !uploadFile || uploadStatus === "uploading"
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                  `}
                >
                  {uploadStatus === "uploading" ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />
                      Mengunggah...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Submit Tugas
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}