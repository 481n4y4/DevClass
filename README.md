# MindFlow

MindFlow adalah sebuah aplikasi berbasis web yang dirancang untuk membantu pengguna dalam mengelola alur kerja (workflow), ide, dan data secara terstruktur. Proyek ini dikembangkan sebagai bagian dari pembelajaran dan implementasi **Full Stack Web Development** dengan fokus pada **Authentication menggunakan JWT** serta **CRUD REST API**.

## ✨ Fitur Utama

* 🔐 **Autentikasi JWT (JSON Web Token)**

  * Register pengguna
  * Login pengguna
  * Proteksi route menggunakan token

* 🗂 **CRUD (Create, Read, Update, Delete)**

  * Manajemen data utama aplikasi (misalnya task / catatan / flow)
  * Terhubung dengan database MongoDB

* 🎨 **Frontend Modern**

  * Menggunakan **Tailwind CSS** untuk styling
  * UI responsif dan bersih

* 🌐 **RESTful API**

  * Backend terpisah dari frontend
  * Struktur API rapi dan scalable

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
git clone https://github.com/username/MindFlow.git
cd MindFlow
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

**Kheira Abinaya Gavin Lovedila**
SMK Negeri 7 Semarang
Bidang Minat: Teknologi Informasi & Web Development

## 📌 Catatan

Project ini dikembangkan untuk keperluan pembelajaran dan tugas praktik. Struktur dan fitur dapat terus dikembangkan sesuai kebutuhan.

---

✨ *MindFlow – Think Clearly, Work Smoothly*
