import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendar,
  faComment,
  faUser,
  faCog,
  faTasks,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  activeTab,
  setActiveTab,
  handleLogout,
  navigate,
  isSidebarOpen,
}) => {
  const menuItems = [
    { id: "classes", label: "Kelas", icon: faHome, badge: null },
    {
      id: "assignments",
      label: "Tugas",
      icon: faTasks,
      badge: { count: 4, color: "red" },
    },
    {
      id: "announcements",
      label: "Pengumuman",
      icon: faComment,
      badge: { count: 3, color: "blue" },
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 fixed lg:static inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 pt-16 lg:pt-0 min-h-screen overflow-y-auto`}
    >
      <div className="h-full flex flex-col">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === item.id ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-3" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span
                  className={`ml-auto bg-${item.badge.color}-100 text-${item.badge.color}-800 text-xs font-bold px-2 py-1 rounded-full`}
                >
                  {item.badge.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom section - tambahkan mt-auto untuk mendorong ke bawah */}
        <div className="mt-auto px-4 py-6 border-t border-gray-200">
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faCog} className="mr-3" />
            <span className="font-medium">Pengaturan</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 mt-2"
          >
            <FontAwesomeIcon icon={faUser} className="mr-3" />
            <span className="font-medium">Keluar</span>
          </button>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Status Server
                </p>
                <p className="text-xs text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Semua Sistem Online
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <FontAwesomeIcon icon={faChartBar} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
