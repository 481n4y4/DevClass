import React, { useState } from "react";
import Header from "../components/Header";
import api from "../api/axios";

export default function Buatkelas() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowSuccess(false);

    if (!name || !description) {
      setErrorMessage("Nama kelas dan deskripsi harus diisi");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/classes", {
        name,
        description,
      });

      setShowSuccess(true);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Gagal membuat kelas:", error);
      setErrorMessage("Terjadi kesalahan saat membuat kelas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:mt-8 mt-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
            <i className="fa-solid fa-plus text-2xl text-blue-600"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Buat Kelas Baru
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Masukkan nama kelas dan deskripsi singkat.
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                Kelas berhasil dibuat.
              </p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kelas
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Backend Laravel"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Contoh: Kelas Laravel advanced"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Menyimpan..." : "Buat Kelas"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
