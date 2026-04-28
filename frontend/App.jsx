import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";
// import Class from "./pages/Class";
import Materials from "./pages/Materials";
import Profile from "./pages/Profile";
import Bergabung from "./pages/Bergabung";
import BuatMateri from "./pages/BuatMateri";
import Kerjakan from "./pages/Kerjakan";
import BuatPengumuman from "./pages/BuatPengumuman";
import Selengkapnya from "./pages/Selengkapnya";
import DashboardTeacher from "./pages/DashboardTeacher";
import ListUsers from "./pages/ListUsers";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import MaterialsTeacher from "./pages/MaterialsTeacher";
import EditMateri from "./pages/EditMateri";

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
        <Route path="/admin/login" element={<Login />} />

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

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <ListUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users/add"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users/:id/edit"
          element={
            <ProtectedRoute>
              <EditUser />
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
          path="admin/material/:id"
          element={
            <ProtectedRoute>
              <MaterialsTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/material/:id/edit"
          element={
            <ProtectedRoute>
              <EditMateri />
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
          path="/BuatMateri"
          element={
            <ProtectedRoute>
              <BuatMateri />
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
