// BuatMateri.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
} from "@fortawesome/free-solid-svg-icons";
import HeaderBack from "../components/HeaderBack";
import api from "../api/axios";

export default function BuatMateri() {
  const navigate = useNavigate();

  // Form states sesuai payload API
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [kelasTarget, setKelasTarget] = useState("10");
  const [kelasIndexTarget, setKelasIndexTarget] = useState("1");
  const [deadline, setDeadline] = useState("");
  const [submissionRequired, setSubmissionRequired] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // UI states
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Options for selects
  const kelasOptions = ["10", "11", "12", "13"];
  const kelasIndexOptions = ["1", "2", "3"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validasi file size (max 10MB = 10240 KB)
      const maxSizeKB = 10240;
      const fileSizeKB = selectedFile.size / 1024;

      if (fileSizeKB > maxSizeKB) {
        setErrorMessage(`Ukuran file terlalu besar. Maksimal ${maxSizeKB} KB`);
        setFile(null);
        setFileName("");
        return;
      }

      // Validasi tipe file
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessage(
          "Tipe file tidak didukung. Gunakan PDF, DOC, DOCX, PPT, atau PPTX",
        );
        setFile(null);
        setFileName("");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowSuccess(false);

    // Validasi required fields
    if (!title) {
      setErrorMessage("Judul materi harus diisi");
      return;
    }

    if (!kelasTarget) {
      setErrorMessage("Kelas target harus dipilih");
      return;
    }

    if (!kelasIndexTarget) {
      setErrorMessage("Index kelas target harus dipilih");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare FormData untuk multipart/form-data
      const formData = new FormData();
      formData.append("title", title);

      if (content) formData.append("content", content);
      formData.append("kelas_target", kelasTarget);
      formData.append("kelas_index_target", kelasIndexTarget);
      if (deadline) formData.append("deadline", deadline);
      formData.append("submission_required", submissionRequired ? "1" : "0");
      if (file) formData.append("file", file);

      // API: POST /api/materials
      // Headers: Content-Type multipart/form-data (axios akan set otomatis)
      // Authorization token handled by axios interceptor
      await api.post("/materials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

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

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/admin/classes");
      }, 2000);
    } catch (error) {
      console.error("Gagal membuat materi:", error);

      // Handle validation errors dari API
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0]?.[0];
        setErrorMessage(firstError || "Terjadi kesalahan validasi");
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Terjadi kesalahan saat membuat materi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for datetime-local input
  const formatDateForInput = (date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
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
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                ✓ Materi berhasil dibuat! Mengarahkan ke halaman kelas...
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

            {/* File Upload - Optional */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Materi
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                <div className="space-y-1 text-center">
                  {fileName ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      {file?.type === "application/pdf" && (
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className="text-red-500 text-xl"
                        />
                      )}
                      {file?.type?.includes("word") && (
                        <FontAwesomeIcon
                          icon={faFileWord}
                          className="text-blue-500 text-xl"
                        />
                      )}
                      {file?.type?.includes("powerpoint") && (
                        <FontAwesomeIcon
                          icon={faFilePowerpoint}
                          className="text-orange-500 text-xl"
                        />
                      )}
                      <span className="font-medium">{fileName}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setFileName("");
                        }}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faUpload}
                        className="mx-auto h-12 w-12 text-gray-400"
                      />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                          />
                        </label>
                        <p className="pl-1">atau drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, PPT, PPTX (Max. 10MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/classes")}
                className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-all ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Menyimpan..." : "Buat Materi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
