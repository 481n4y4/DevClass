import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";
// import Class from "./pages/Class";
import ClassesPage from "./pages/ClassesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import Materials from "./pages/Materials";
import Bergabung from "./pages/Bergabung";
import Buatkelas from "./pages/Buatkelas";
import Kerjakan from "./pages/Kerjakan";
import BuatPengumuman from "./pages/BuatPengumuman";
import Selengkapnya from "./pages/Selengkapnya";
import LoginGuru from "./pages/LoginGuru";

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

        {/* Main Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ClassesPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
        </Route>

        <Route
          path="/login-guru"
          element={
            <ProtectedRoute>
              < LoginGuru/>
            </ProtectedRoute>
          }
        />
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
      </Routes>
    </BrowserRouter>
  );
}
