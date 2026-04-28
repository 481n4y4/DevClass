import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMagnifyingGlass,
  faRotateRight,
  faTrash,
  faEdit,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import HeaderBack from "../components/HeaderBack";

const kelasOrder = ["10", "11", "12", "13"];
const indexOrder = ["1", "2", "3"];

const ListUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("student");
  const [kelasFilter, setKelasFilter] = useState("all");
  const [kelasIndexFilter, setKelasIndexFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.get("/admin/users", {
        headers: {
          Accept: "application/json",
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setUsers(data);
    } catch (error) {
      console.error("Gagal memuat user:", error);
      setErrorMessage("Gagal memuat data user. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const uniqueKelas = useMemo(() => {
    const kelasSet = new Set(users.map((user) => user.kelas).filter(Boolean));
    return [
      "all",
      ...Array.from(kelasSet).sort(
        (a, b) => kelasOrder.indexOf(a) - kelasOrder.indexOf(b),
      ),
    ];
  }, [users]);

  const uniqueKelasIndex = useMemo(() => {
    const indexSet = new Set(
      users.map((user) => user.kelas_index).filter(Boolean),
    );
    return [
      "all",
      ...Array.from(indexSet).sort(
        (a, b) => indexOrder.indexOf(a) - indexOrder.indexOf(b),
      ),
    ];
  }, [users]);

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return [...users]
      .filter((user) => {
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesKelas =
          kelasFilter === "all" || user.kelas === kelasFilter;
        const matchesKelasIndex =
          kelasIndexFilter === "all" || user.kelas_index === kelasIndexFilter;
        const matchesKeyword = keyword
          ? [user.name, user.nis, user.email, user.role]
              .filter(Boolean)
              .some((value) => value.toLowerCase().includes(keyword))
          : true;

        return (
          matchesRole && matchesKelas && matchesKelasIndex && matchesKeyword
        );
      })
      .sort((a, b) => {
        const kelasA =
          kelasOrder.indexOf(a.kelas) === -1 ? 99 : kelasOrder.indexOf(a.kelas);
        const kelasB =
          kelasOrder.indexOf(b.kelas) === -1 ? 99 : kelasOrder.indexOf(b.kelas);
        if (kelasA !== kelasB) return kelasA - kelasB;

        const indexA =
          indexOrder.indexOf(a.kelas_index) === -1
            ? 99
            : indexOrder.indexOf(a.kelas_index);
        const indexB =
          indexOrder.indexOf(b.kelas_index) === -1
            ? 99
            : indexOrder.indexOf(b.kelas_index);
        if (indexA !== indexB) return indexA - indexB;

        const absenA = Number(a.no_absen ?? 0);
        const absenB = Number(b.no_absen ?? 0);
        if (absenA !== absenB) return absenA - absenB;

        return (a.name || "").localeCompare(b.name || "");
      });
  }, [users, searchTerm, roleFilter, kelasFilter, kelasIndexFilter]);

  const groupedUsers = useMemo(() => {
    const grouped = filteredUsers.reduce((accumulator, user) => {
      const kelasLabel = user.kelas ?? "Belum Diatur";
      const indexLabel = user.kelas_index ?? "-";
      const key = `${kelasLabel}-${indexLabel}`;

      if (!accumulator[key]) {
        accumulator[key] = {
          kelas: kelasLabel,
          kelasIndex: indexLabel,
          items: [],
        };
      }

      accumulator[key].items.push(user);
      return accumulator;
    }, {});

    return Object.values(grouped);
  }, [filteredUsers]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);

    try {
      await api.delete(`/admin/users/${userToDelete.id}`, {
        headers: {
          Accept: "application/json",
        },
      });

      await fetchUsers();
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Gagal menghapus user:", error);
      setErrorMessage(error.response?.data?.message || "Gagal menghapus user.");
      setShowDeleteModal(false);
      setUserToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="h-4 w-24 rounded-full bg-gray-200 mb-4" />
        <div className="h-5 w-3/4 rounded bg-gray-200 mb-2" />
        <div className="h-4 w-full rounded bg-gray-100 mb-3" />
        <div className="h-4 w-2/3 rounded bg-gray-100 mb-6" />
        <div className="h-10 w-full rounded-xl bg-gray-100" />
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBack backTo="/admin/dashboard" />

      <div className="px-6 pt-24 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Admin User Management
              </p>
              <h1 className="text-2xl font-bold text-gray-900">Daftar User</h1>
              <p className="mt-1 text-sm text-gray-500">
                Kelola data siswa, guru, dan admin berdasarkan kelas.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/users/add")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faPlus} />
              Tambah User
            </button>
          </div>

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari nama, NIS, email, atau role..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="student">Siswa</option>
                <option value="teacher">Guru</option>
                <option value="admin">Admin</option>
                <option value="all">Semua Role</option>
              </select>

              <select
                value={kelasFilter}
                onChange={(event) => setKelasFilter(event.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">Semua Kelas</option>
                {uniqueKelas
                  .filter((kelas) => kelas !== "all")
                  .map((kelas) => (
                    <option key={kelas} value={kelas}>
                      {kelas === "Belum Diatur" ? kelas : `Kelas ${kelas}`}
                    </option>
                  ))}
              </select>

              <select
                value={kelasIndexFilter}
                onChange={(event) => setKelasIndexFilter(event.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">Semua Index</option>
                {uniqueKelasIndex
                  .filter((kelasIndex) => kelasIndex !== "all")
                  .map((kelasIndex) => (
                    <option key={kelasIndex} value={kelasIndex}>
                      Index {kelasIndex}
                    </option>
                  ))}
              </select>

              <button
                onClick={fetchUsers}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faRotateRight} />
                Refresh
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-red-600">{errorMessage}</p>
              <button
                onClick={fetchUsers}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                <FontAwesomeIcon icon={faRotateRight} />
                Coba lagi
              </button>
            </div>
          )}

          {!isLoading && users.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="rounded-xl border border-gray-200 bg-white px-4 py-2">
                <span className="text-sm text-gray-500">Total User:</span>
                <span className="ml-2 font-bold text-gray-800">
                  {users.length}
                </span>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white px-4 py-2">
                <span className="text-sm text-gray-500">Ditampilkan:</span>
                <span className="ml-2 font-bold text-gray-800">
                  {filteredUsers.length}
                </span>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {renderSkeletons()}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <FontAwesomeIcon
                icon={faUsers}
                className="mb-4 text-3xl text-gray-300"
              />
              <p className="text-lg font-semibold text-gray-700">
                Tidak ada user ditemukan
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Coba ubah pencarian atau filter Anda.
              </p>
              <button
                onClick={() => navigate("/admin/users/add")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faPlus} />
                Tambah User
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedUsers.map((group) => (
                <div
                  key={`${group.kelas}-${group.kelasIndex}`}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="border-b border-gray-100 px-5 py-4">
                    <h2 className="text-lg font-bold text-gray-900">
                      {group.kelas === "Belum Diatur"
                        ? "Belum punya kelas"
                        : `Kelas ${group.kelas}`}
                      <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        Index {group.kelasIndex}
                      </span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((user) => (
                      <div
                        key={user.id}
                        className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                              {user.role}
                            </p>
                            <h3 className="mt-1 text-base font-bold text-gray-900">
                              {user.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              NIS: {user.nis || "-"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Email: {user.email || "-"}
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                            Absen {user.no_absen ?? "-"}
                          </span>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/users/${user.id}/edit`)
                            }
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-600 text-xl"
                />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Hapus User?
              </h3>
              <p className="mb-6 text-sm text-gray-500">
                Apakah Anda yakin ingin menghapus{" "}
                <span className="font-bold text-gray-700">
                  {userToDelete.name}
                </span>
                ?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                  disabled={isDeleting}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUsers;
