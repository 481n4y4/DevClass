import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSort,
  faTasks,
  faExclamationCircle,
  faCheckCircle,
  faBook,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AssignmentsPage = ({ assignments = [] }) => {
  const navigate = useNavigate(); 
  // Data default jika tidak ada props
  const defaultAssignments = [
    {
      id: 1,
      title: "Konfigurasi Apache Web Server",
      class: "Administrasi Server Linux",
      dueDate: "15 Des 2024",
      dueTime: "23:59",
      status: "pending",
      submitted: false,
      points: 100,
      classId: 1,
    },
    {
      id: 2,
      title: "Setup DNS Server dengan BIND9",
      class: "Administrasi Server Linux",
      dueDate: "18 Des 2024",
      dueTime: "23:59",
      status: "pending",
      submitted: false,
      points: 100,
      classId: 1,
    },
    {
      id: 3,
      title: "Implementasi Firewall dengan iptables",
      class: "Keamanan Jaringan",
      dueDate: "12 Des 2024",
      dueTime: "23:59",
      status: "overdue",
      submitted: false,
      points: 100,
      classId: 3,
    },
  ];

  const assignmentList = assignments.length > 0 ? assignments : defaultAssignments;

  // Hitung statistik
  const pendingCount = assignmentList.filter(a => !a.submitted && a.status !== 'overdue').length;
  const overdueCount = assignmentList.filter(a => a.status === 'overdue').length;
  const submittedCount = assignmentList.filter(a => a.submitted).length;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Tugas Anda</h2>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faSort} className="mr-2" />
            Urutkan
          </button>
        </div>
      </div>
      
      {/* Status Tugas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faTasks} className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tugas Belum Selesai</p>
              <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Terlambat</p>
              <p className="text-2xl font-bold text-gray-800">{overdueCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Telah Dikumpulkan</p>
              <p className="text-2xl font-bold text-gray-800">{submittedCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daftar Tugas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Daftar Tugas</h3>
            <span className="text-sm text-gray-500">{assignmentList.length} tugas</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {assignmentList.map((assignment) => (
            <div key={assignment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-3 ${assignment.status === 'overdue' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    <h4 className="font-bold text-gray-800">{assignment.title}</h4>
                    {assignment.submitted && (
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Terkumpul</span>
                    )}
                    {assignment.status === 'overdue' && (
                      <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Terlambat</span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 ml-6">
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    <span className="mr-4">{assignment.class}</span>
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    <span className={`font-medium ${assignment.status === 'overdue' ? 'text-red-600' : 'text-gray-700'}`}>
                      Batas: {assignment.dueDate} {assignment.dueTime}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Nilai</p>
                    <p className="font-bold text-gray-800">{assignment.points} poin</p>
                  </div>
                  <button  onClick={() => navigate("/kerjakan")} className={`px-4 py-2 rounded-lg font-medium ${assignment.submitted ? 'bg-gray-100 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {assignment.submitted ? 'Lihat Detail' : 'Kerjakan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;