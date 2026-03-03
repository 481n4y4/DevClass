import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faChevronDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ 
  toggleSidebar, 
  isSidebarOpen, 
  userName = "Ahmad Student",
  userInitials = "AS" 
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and menu toggle */}
          <div className="flex items-center">
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
          
          {/* Center: Search */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari kelas, tugas, atau materi..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Right: User menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
              <FontAwesomeIcon icon={faBell} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 md:hidden">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            
            <div className="relative">
              <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {userInitials}
                </div>
                <span className="hidden lg:inline font-medium text-gray-700">{userName}</span>
                <FontAwesomeIcon icon={faChevronDown} className="hidden lg:inline text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;