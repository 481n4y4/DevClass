// components/HeaderBack.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const HeaderBack = ({
  toggleSidebar,
  isSidebarOpen,
  userName = "Ahmad Student",
  userInitials = "AS",
  backTo = "/",
  onBack
}) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // API: GET /api/me
        // Headers: Accept: application/json, Authorization: Bearer {token}
        const response = await api.get("/me", {
          headers: {
            Accept: "application/json",
          },
        });
        setProfile(response.data?.data || null);
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      }
    };

    fetchProfile();
  }, []);

  const displayName = profile?.name || userName;
  const initials = useMemo(() => {
    if (!displayName) {
      return userInitials;
    }
    const parts = displayName.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return `${first}${last}`.toUpperCase() || userInitials;
  }, [displayName, userInitials]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backTo === -1) {
      navigate(-1);
    } else {
      navigate(backTo);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and menu toggle */}
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors mr-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            </button>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
            </button>

            <div className="flex items-center ml-2 lg:ml-0">
              <h1 className="text-xl font-bold text-blue-900">DevClass</h1>
            </div>
          </div>

          {/* Right: User menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {initials}
                </div>
                <span className="hidden lg:inline font-medium text-gray-700">
                  {displayName}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBack;