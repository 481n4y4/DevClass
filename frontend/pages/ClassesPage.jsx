// ClassesPage.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faUsers,
  faClock,
  faTasks,
  faComment,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { defaultClasses } from "../data/defaultClasses"; // Import dari file terpisah

const ClassesPage = ({ classes = [], onClassClick }) => {
  const navigate = useNavigate();
  
  // Gunakan data dari import jika tidak ada props
  const classList = classes.length > 0 ? classes : defaultClasses;

  const handleClassClick = (classId) => {
    if (onClassClick) {
      onClassClick(classId);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Kelas Anda
        </h2>
        <div className="flex space-x-3">
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
            onClick={() => navigate("/bergabung")}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Bergabung dengan Kelas
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classList.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleClassClick(classItem.id)}
          >
            <div className={`h-3 ${classItem.color}`}></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {classItem.name}
                </h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {classItem.code}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{classItem.teacher}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  {classItem.students} siswa
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  {classItem.schedule}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{classItem.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      classItem.progress === 100 
                        ? "bg-green-500" 
                        : classItem.progress > 50 
                          ? "bg-blue-500" 
                          : "bg-yellow-500"
                    }`}
                    style={{ width: `${classItem.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  {classItem.assignmentsDue > 0 && (
                    <div className="flex items-center text-red-600">
                      <FontAwesomeIcon icon={faTasks} className="mr-1" />
                      <span className="text-sm font-medium">
                        {classItem.assignmentsDue}
                      </span>
                    </div>
                  )}
                  {classItem.announcements > 0 && (
                    <div className="flex items-center text-blue-600">
                      <FontAwesomeIcon icon={faComment} className="mr-1" />
                      <span className="text-sm font-medium">
                        {classItem.announcements}
                      </span>
                    </div>
                  )}
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Buka
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ml-1 text-xs"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Card tambah kelas baru */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors flex flex-col items-center justify-center p-10 cursor-pointer">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Buat Kelas Baru
          </h3>
          <p className="text-gray-500 text-center text-sm mb-4">
            Hanya tersedia untuk pengajar
          </p>
          <button 
            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" 
            onClick={() => navigate("/buatkelas")}
          > 
            Buat Kelas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;