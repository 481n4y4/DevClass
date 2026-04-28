import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import HeaderBack from "../components/HeaderBack";

const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nis, setNis] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noAbsen, setNoAbsen] = useState("");
  const [kelas, setKelas] = useState("");
  const [kelasIndex, setKelasIndex] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !nis || !role) {
      setError("Nama, NIS, dan role harus diisi.");
      setIsLoading(false);
      return;
    }

    try {
      await api.post(
        "/admin/users",
        {
          name,
          nis,
          email: email || null,
          password: password || null,
          no_absen: noAbsen ? Number(noAbsen) : null,
          kelas: kelas || null,
          kelas_index: kelasIndex || null,
          role,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal menambahkan user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBack backTo="/admin/users" />

      <div className="px-6 pt-24 pb-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Admin User Management
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Tambah User</h1>
            <p className="mt-1 text-sm text-gray-500">
              Tambahkan siswa, guru, atau admin baru ke sistem.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Nama lengkap"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                NIS
              </label>
              <input
                value={nis}
                onChange={(event) => setNis(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="NIS"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="email@domain.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Kosongkan untuk default NIS"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                No Absen
              </label>
              <input
                type="number"
                min="1"
                value={noAbsen}
                onChange={(event) => setNoAbsen(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="1"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="student">Siswa</option>
                <option value="teacher">Guru</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Kelas
              </label>
              <select
                value={kelas}
                onChange={(event) => setKelas(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Belum diatur</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Index Kelas
              </label>
              <select
                value={kelasIndex}
                onChange={(event) => setKelasIndex(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Belum diatur</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="md:col-span-2 mt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/users")}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
