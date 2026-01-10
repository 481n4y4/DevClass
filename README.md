# 🏫 DevClass

## Deskripsi Proyek

DevClass adalah platform pembelajaran berbasis web yang dirancang untuk memfasilitasi pengelolaan kelas, proses belajar-mengajar, serta monitoring progres peserta secara terstruktur. Proyek ini dikembangkan sebagai bagian dari mini project/server project dengan fokus pada implementasi layanan dan arsitektur sistem yang terintegrasi.

## ‼️Tujuan

* Menyediakan sistem manajemen kelas online yang terstruktur.
* Memudahkan interaksi antara Admin, Mentor, dan Peserta.
* Memonitor progres pembelajaran dan aktivitas pengguna.
* Menerapkan konsep infrastruktur server dan layanan jaringan secara nyata.

## 👥 Role Pengguna

1. **Admin**

   * Mengelola user (Mentor & Peserta)
   * Mengelola kelas dan konten
   * Monitoring sistem dan layanan

2. **Mentor**

   * Mengelola materi kelas
   * Memberikan tugas dan evaluasi
   * Memantau progres peserta

3. **Peserta**

   * Mengikuti kelas
   * Mengakses materi
   * Melihat progres belajar

## Fitur Utama

* Autentikasi (Login & Registrasi)
* Dashboard sesuai role
* Manajemen kelas dan materi
* Notifikasi dan progres belajar
* Infrastruktur server pendukung

## 🛠 Teknologi yang Digunakan

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt (hashing password)

### Frontend

* HTML5
* CSS3
* JavaScript
* Tailwind CSS
* Axios / Fetch API

## 🚀 Cara Menjalankan Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/481n4y4/DevClass.git
cd DevClass
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Buat file `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Jalankan server:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testing

* Testing login menggunakan JWT
* Testing endpoint CRUD menggunakan Postman / Thunder Client
* Testing integrasi frontend dengan API backend

## 🎯 Tujuan Project

* Memahami konsep **JWT Authentication**
* Menerapkan **REST API & CRUD**
* Mengintegrasikan frontend dan backend
* Menggunakan MongoDB sebagai database NoSQL

## 👤 Developer

**Firdaus Pratama Santoso**
**Kheira Abinaya Gavin Lovedila**
**Rachel Aulia Maghfi**
**Riezal Yuan Saputra**
**Safira Orlin Widyadhana**
SMK Negeri 7 Semarang

## 📌 Catatan

Project ini dikembangkan untuk keperluan pembelajaran dan tugas praktik. Struktur dan fitur dapat terus dikembangkan sesuai kebutuhan.

---

