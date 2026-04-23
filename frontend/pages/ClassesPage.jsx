// Materials page for students
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faDownload,
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";

const ClassesPage = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("deadline");

  const fetchMaterials = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // API: GET /api/materials
      // Headers: Accept: application/json, Authorization: Bearer {token}
      // Authorization token handled by axios interceptor in api instance.
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

  const filteredMaterials = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    const filtered = materials.filter((material) => {
      const matchesKeyword = keyword
        ? [material.title, material.content]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(keyword))
        : true;

      const matchesFilter =
        filterStatus === "all"
          ? true
          : filterStatus === "required"
            ? material.submission_required
            : !material.submission_required;

      return matchesKeyword && matchesFilter;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "created") {
        return new Date(b.created_at) - new Date(a.created_at);
      }

      const deadlineA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const deadlineB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return deadlineA - deadlineB;
    });

    return sorted;
  }, [materials, searchTerm, filterStatus, sortOrder]);

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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Materials Siswa
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Daftar materi sesuai kelas Anda.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari materi..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">Semua</option>
                <option value="required">Submission Required</option>
                <option value="optional">Tanpa Submission</option>
              </select>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="deadline">Deadline Terdekat</option>
                <option value="created">Terbaru</option>
              </select>
            </div>
          </div>
        </div>

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
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMaterials.map((material) => {
              const submissionRequired = Boolean(material.submission_required);
              const kelasTarget = material.kelas_target ?? "-";
              const kelasIndexTarget = material.kelas_index_target ?? "-";
              const detailLabel = submissionRequired
                ? "Submit Assignment"
                : "View Details";

              return (
                <div
                  key={material.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Kelas {kelasTarget} - {kelasIndexTarget}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-gray-800">
                        {material.title}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        submissionRequired
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {submissionRequired ? "Submission" : "No Submission"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Deadline</span>
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
                    <button
                      onClick={() => navigate(`/material/${material.id}`)}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      {detailLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
