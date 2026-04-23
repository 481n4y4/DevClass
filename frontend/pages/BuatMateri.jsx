// BuatMateri.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faTrash,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import HeaderBack from "../components/HeaderBack";
import api from "../api/axios";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];

export default function BuatMateri() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form states sesuai payload API
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [kelasTarget, setKelasTarget] = useState("10");
  const [kelasIndexTarget, setKelasIndexTarget] = useState("1");
  const [deadline, setDeadline] = useState("");
  const [submissionRequired, setSubmissionRequired] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Upload states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [dropActive, setDropActive] = useState(false);

  // UI states
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Options for selects
  const kelasOptions = ["10", "11", "12", "13"];
  const kelasIndexOptions = ["1", "2", "3"];

  const validateFile = (file) => {
    if (!file) {
      return "Pilih file terlebih dahulu";
    }

    // Cek ukuran file
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE_MB}MB`;
    }

    // Cek tipe file
    const extension = `.${file.name.split(".").pop().toLowerCase()}`;
    const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(extension);
    const isMimeAllowed = ALLOWED_FILE_TYPES.includes(file.type);

    if (!isExtensionAllowed && !isMimeAllowed) {
      return "Tipe file tidak didukung. Gunakan PDF, DOC, DOCX, PPT, atau PPTX";
    }

    return null;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const error = validateFile(selectedFile);
    if (error) {
      setErrorMessage(error);
      setFile(null);
      setFileName("");
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDropActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDropActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDropActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    const error = validateFile(droppedFile);
    if (error) {
      setErrorMessage(error);
      setFile(null);
      setFileName("");
      return;
    }

    setErrorMessage("");
    setFile(droppedFile);
    setFileName(droppedFile.name);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setUploadStatus("idle");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (!file) return faUpload;
    if (file.type === "application/pdf") return faFilePdf;
    if (file.type?.includes("word")) return faFileWord;
    if (file.type?.includes("powerpoint")) return faFilePowerpoint;
    return faUpload;
  };

  const getFileIconColor = () => {
    if (!file) return "text-gray-400";
    if (file.type === "application/pdf") return "text-red-500";
    if (file.type?.includes("word")) return "text-blue-500";
    if (file.type?.includes("powerpoint")) return "text-orange-500";
    return "text-gray-400";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowSuccess(false);
    setUploadStatus("uploading");
    setUploadProgress(0);

    // Validasi required fields
    if (!title) {
      setErrorMessage("Judul materi harus diisi");
      setUploadStatus("idle");
      return;
    }

    if (!kelasTarget) {
      setErrorMessage("Kelas target harus dipilih");
      setUploadStatus("idle");
      return;
    }

    if (!kelasIndexTarget) {
      setErrorMessage("Index kelas target harus dipilih");
      setUploadStatus("idle");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (content) formData.append("content", content);
      formData.append("kelas_target", kelasTarget);
      formData.append("kelas_index_target", kelasIndexTarget);
      if (deadline) formData.append("deadline", deadline);
      formData.append("submission_required", submissionRequired ? "1" : "0");
      if (file) formData.append("file", file);

      const response = await api.post("/materials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
        },
      });

      // Cek response sukses
      if (response.data?.data || response.status === 201) {
        setUploadStatus("success");
        setShowSuccess(true);

        // Reset form
        setTitle("");
        setContent("");
        setKelasTarget("10");
        setKelasIndexTarget("1");
        setDeadline("");
        setSubmissionRequired(false);
        setFile(null);
        setFileName("");
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/admin/classes");
        }, 2000);
      } else {
        throw new Error("Response tidak sesuai");
      }
    } catch (error) {
      console.error("Gagal membuat materi:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      console.error("Response headers:", error.response?.headers);

      // Tampilkan detail error dari server
      if (error.response?.data) {
        setErrorMessage(JSON.stringify(error.response.data, null, 2));
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(`Terjadi kesalahan: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <HeaderBack backTo="/admin/dashboard" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:mt-8 mt-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
            <FontAwesomeIcon
              icon={faUpload}
              className="text-2xl text-blue-600"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Buat Materi Baru
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Tambahkan materi pembelajaran baru untuk siswa.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 animate-fade-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-600 text-xl"
              />
              <p className="text-green-800 font-medium">
                ✓ Materi berhasil dibuat! Mengarahkan ke halaman kelas...
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-red-600"
              />
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

            {/* Kelas Target - Required */}
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

            {/* Kelas Index Target - Required */}
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

            {/* Deadline - Optional */}
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
                Opsional. Format: YYYY-MM-DD HH:MM:SS
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

            {/* File Upload - Optional with Drag & Drop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Materi
              </label>

              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-all cursor-pointer
                  ${dropActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
                  ${uploadStatus === "uploading" ? "opacity-50 pointer-events-none" : ""}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !fileName && fileInputRef.current?.click()}
              >
                <div className="space-y-2 text-center">
                  {uploadStatus === "uploading" ? (
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="mx-auto h-12 w-12 text-blue-500 animate-spin"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        Mengupload file...
                      </p>
                      <div className="mt-3 w-64 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {uploadProgress}%
                      </p>
                    </div>
                  ) : uploadStatus === "success" ? (
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="mx-auto h-12 w-12 text-green-500"
                      />
                      <p className="mt-2 text-sm text-green-600">
                        Upload berhasil!
                      </p>
                    </div>
                  ) : uploadStatus === "error" ? (
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="mx-auto h-12 w-12 text-red-500"
                      />
                      <p className="mt-2 text-sm text-red-600">
                        Upload gagal. Silakan coba lagi.
                      </p>
                      <button
                        type="button"
                        onClick={() => setUploadStatus("idle")}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Coba lagi
                      </button>
                    </div>
                  ) : fileName ? (
                    <div className="flex items-center justify-center gap-3">
                      <FontAwesomeIcon
                        icon={getFileIcon()}
                        className={`text-4xl ${getFileIconColor()}`}
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-700">
                          {fileName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
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
                        PDF, DOC, DOCX, PPT, PPTX (Max. {MAX_FILE_SIZE_MB}MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept={ALLOWED_EXTENSIONS.join(",")}
                disabled={uploadStatus === "uploading"}
              />
            </div>

            {/* Info Box */}
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
              <p className="font-medium mb-1">ℹ️ Informasi:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Field dengan tanda <span className="text-red-500">*</span>{" "}
                  wajib diisi
                </li>
                <li>
                  File tidak wajib diupload, bisa ditambahkan nanti melalui edit
                </li>
                <li>Semua materi akan tersimpan di cloud storage (SFTP)</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                disabled={isLoading || uploadStatus === "uploading"}
                className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading || uploadStatus === "uploading"}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2
                  ${
                    isLoading || uploadStatus === "uploading"
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                `}
              >
                {(isLoading || uploadStatus === "uploading") && (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                )}
                {isLoading || uploadStatus === "uploading"
                  ? "Menyimpan..."
                  : "Buat Materi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
