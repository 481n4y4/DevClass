import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";
// import Class from "./pages/Class";
import Materials from "./pages/Materials";
import Profile from "./pages/Profile";
import Bergabung from "./pages/Bergabung";
import Buatkelas from "./pages/Buatkelas";
import Kerjakan from "./pages/Kerjakan";
import BuatPengumuman from "./pages/BuatPengumuman";
import Selengkapnya from "./pages/Selengkapnya";
import LoginGuru from "./pages/LoginGuru";
import DashboardTeacher from "./pages/DashboardTeacher";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardTeacher />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<LoginGuru />} />
        <Route
          path="/material/:id"
          element={
            <ProtectedRoute>
              <Materials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bergabung"
          element={
            <ProtectedRoute>
              <Bergabung />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buatkelas"
          element={
            <ProtectedRoute>
              <Buatkelas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kerjakan"
          element={
            <ProtectedRoute>
              <Kerjakan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buatpengumuman"
          element={
            <ProtectedRoute>
              <BuatPengumuman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/selengkapnya"
          element={
            <ProtectedRoute>
              <Selengkapnya />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
