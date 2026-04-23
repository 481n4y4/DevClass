// Material detail for students
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRotateRight } from "@fortawesome/free-solid-svg-icons";
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

export default function Materials() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      // API: GET /api/materials/{id}
      // Headers: Accept: application/json, Authorization: Bearer {token}
      // Response: { data: { id, title, content, file_path, kelas_target, kelas_index_target, deadline, submission_required, created_by, created_at } }
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

  const handleSubmitAssignment = () => {
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
          <i className="fa-regular fa-circle-exclamation text-4xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Material tidak ditemukan
          </h2>
          <p className="text-slate-600 mb-4">
            Material dengan ID {id} tidak tersedia
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali
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
        userName="Ahmad Student"
        userInitials="AS"
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
              {material.submission_required ? "Submission" : "No Submission"}
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

          {material.file_path && (
            <div className="mt-4">
              <a
                href={material.file_path}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faDownload} />
                Unduh materi
              </a>
            </div>
          )}
        </div>

        {material.submission_required && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Submit Assignment
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Unggah file tugas Anda sesuai format yang didukung.
            </p>

            <div
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 text-sm transition ${
                dropActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
              onDragOver={(event) => {
                event.preventDefault();
                setDropActive(true);
              }}
              onDragLeave={() => setDropActive(false)}
              onDrop={handleDrop}
            >
              <p className="text-gray-500">
                Drag & drop file di sini, atau klik untuk memilih.
              </p>
              <input
                type="file"
                className="mt-3 text-sm"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
            </div>

            {uploadFile && (
              <p className="mt-3 text-sm text-slate-700">
                File dipilih:{" "}
                <span className="font-medium">{uploadFile.name}</span>
              </p>
            )}

            {uploadError && (
              <p className="mt-3 text-sm text-red-600">{uploadError}</p>
            )}

            {uploadStatus === "uploading" && (
              <div className="mt-3">
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Mengunggah... {uploadProgress}%
                </p>
              </div>
            )}

            {uploadStatus === "success" && (
              <p className="mt-3 text-sm text-emerald-600">
                Upload berhasil. Tugas Anda telah terkirim.
              </p>
            )}

            {uploadStatus === "error" && (
              <p className="mt-3 text-sm text-red-600">
                Upload gagal. Silakan coba lagi.
              </p>
            )}

            <button
              onClick={handleSubmitAssignment}
              disabled={uploadStatus === "uploading"}
              className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white ${
                uploadStatus === "uploading"
                  ? "bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Submit Assignment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
