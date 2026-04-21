import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
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
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ClassesPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
        </Route>

        <Route path="/class/:id" element={<Materials />} />
        <Route path="/bergabung" element={<Bergabung />} />
        <Route path="/buatkelas" element={<Buatkelas />} />
        <Route path="/kerjakan" element={<Kerjakan />} />
        <Route path="/buatpengumuman" element={<BuatPengumuman />} />
        <Route path="/selengkapnya" element={<Selengkapnya />} />
      </Routes>
    </BrowserRouter>
  );
}