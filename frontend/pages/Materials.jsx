// pages/CourseDetail.jsx (atau pages/KelasDetail.jsx)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassById } from "../data/defaultClasses";
import HeaderBack from "../components/HeaderBack";

export default function Materials() {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Ambil data kelas berdasarkan ID dari URL
    const classId = parseInt(id);
    const data = getClassById(classId);

    if (data) {
      // Konversi data ke format yang digunakan di komponen
      setCourseData({
        id: data.id,
        title: data.name || data.title,
        code: data.code,
        instructor: data.instructor || {
          name: data.teacher || "Instruktur",
          title: "Pengajar",
          avatar: "👨‍🏫",
          email: "instruktur@devclass.id",
          students: data.students || 0,
        },
        schedule: data.schedule,
        room: data.room || "Virtual Class",
        progress: data.progress,
        description: data.description,
        materials: data.materials || [],
        announcements: data.announcementsList || data.announcements || [],
        assignments: data.assignmentsList || data.assignments || [],
      });
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Memuat data kelas...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fa-regular fa-circle-exclamation text-4xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Kelas tidak ditemukan
          </h2>
          <p className="text-slate-600 mb-4">
            Kelas dengan ID {id} tidak tersedia
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header dengan sidebar props */}

      <HeaderBack
        showBackButton={true}
        backTo="/dashboard"
        title={courseData?.title}
        userName="Ahmad Student"
        userInitials="AS"
      />

      {/* Main Content - tambahkan mt-14 untuk mengakomodasi fixed header */}
      <div className="max-w-7xl mx-auto px-8 py-6 mt-14">
        {/* Course Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-800">
                  {courseData.title}
                </h2>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {courseData.code}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4 max-w-2xl">
                {courseData.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-calendar text-slate-400"></i>
                  <span className="text-slate-600">{courseData.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-building text-slate-400"></i>
                  <span className="text-slate-600">{courseData.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-user text-slate-400"></i>
                  <span className="text-slate-600">
                    {courseData.instructor.students} siswa
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm flex items-center gap-2">
                <i className="fa-regular fa-share-from-square"></i>
                Share
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2">
                <i className="fa-regular fa-bookmark"></i>
                Enrolled
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-600 font-medium mb-1">
              <span>Course Progress</span>
              <span>{courseData.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${courseData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 mb-6 gap-2">
          {[
            { id: "overview", label: "Overview", icon: "fa-eye" },
            { id: "materials", label: "Materials", icon: "fa-folder-open" },
            { id: "assignments", label: "Assignments", icon: "fa-clipboard" },
            { id: "students", label: "Students", icon: "fa-users" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`fa-regular ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                {/* Instructor Info */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fa-regular fa-circle-user text-blue-600"></i>
                    Instructor
                  </h3>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl">
                      {courseData.instructor.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {courseData.instructor.name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {courseData.instructor.title}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <i className="fa-regular fa-envelope text-slate-400"></i>
                          <span className="text-slate-600">
                            {courseData.instructor.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fa-regular fa-clock text-slate-400"></i>
                          <span className="text-slate-600">
                            Office hour: Rabu, 13:00-15:00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Announcements */}
                {courseData.announcements.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <i className="fa-regular fa-bullhorn text-blue-600"></i>
                      Announcements
                    </h3>
                    <div className="space-y-4">
                      {courseData.announcements.map((announcement) => (
                        <div
                          key={announcement.id}
                          className="border-l-4 border-blue-600 pl-4"
                        >
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <h4 className="font-medium text-slate-800">
                              {announcement.title}
                            </h4>
                            <span className="text-xs text-slate-400">
                              {announcement.date}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            {announcement.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fa-regular fa-bolt text-blue-600"></i>
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-center">
                      <i className="fa-regular fa-circle-play text-xl text-blue-600 mb-2 block"></i>
                      <p className="text-xs font-medium">Join Class</p>
                    </button>
                    <button className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-center">
                      <i className="fa-regular fa-file-lines text-xl text-green-600 mb-2 block"></i>
                      <p className="text-xs font-medium">Materials</p>
                    </button>
                    <button className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-center">
                      <i className="fa-regular fa-pen-to-square text-xl text-purple-600 mb-2 block"></i>
                      <p className="text-xs font-medium">Submit Task</p>
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "materials" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Course Materials
                </h3>
                <div className="space-y-2">
                  {courseData.materials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {material.status === "completed" ? (
                          <i className="fa-regular fa-circle-check text-green-600"></i>
                        ) : material.status === "ongoing" ? (
                          <i className="fa-regular fa-circle-play text-blue-600"></i>
                        ) : (
                          <i className="fa-regular fa-circle text-slate-300"></i>
                        )}
                        <div>
                          <p className="font-medium text-slate-800">
                            Week {material.week}: {material.topic}
                          </p>
                          <p className="text-xs text-slate-400">
                            {material.status === "completed"
                              ? "Completed"
                              : material.status === "ongoing"
                                ? "In Progress"
                                : "Upcoming"}
                          </p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <i className="fa-regular fa-arrow-right"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Assignments
                </h3>
                <div className="space-y-4">
                  {courseData.assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="border-b border-slate-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-800">
                          {assignment.title}
                        </h4>
                        <span className="text-xs text-orange-600 font-medium">
                          Due: {assignment.due}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-slate-500">
                          {assignment.submitted}/{assignment.total} submitted
                        </p>
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                          Submit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Server Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-server text-blue-600"></i>
                Server Status
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">CPU Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-green-600 rounded-full h-1.5"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Memory</span>
                    <span className="font-medium">2.3/4 GB</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 rounded-full h-1.5"
                      style={{ width: "57%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Disk Usage</span>
                    <span className="font-medium">35/50 GB</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-yellow-600 rounded-full h-1.5"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-sm flex items-center justify-center gap-2">
                <i className="fa-regular fa-terminal"></i>
                SSH Connection
              </button>
            </div>

            {/* Upcoming Assignments */}
            {courseData.assignments.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fa-regular fa-clock text-blue-600"></i>
                  Upcoming Assignments
                </h3>
                <div className="space-y-4">
                  {courseData.assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-slate-800">
                          {assignment.title}
                        </p>
                        <span className="text-xs text-orange-600 font-medium">
                          Due {assignment.due}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {assignment.submitted}/{assignment.total} submitted
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-regular fa-folder-open text-blue-600"></i>
                Resources
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600"
                >
                  <i className="fa-regular fa-file-pdf text-red-500"></i>
                  Modul Praktikum Week 1-4
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600"
                >
                  <i className="fa-regular fa-file-video text-blue-500"></i>
                  Video Tutorial Instalasi
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600"
                >
                  <i className="fa-regular fa-file-zipper text-yellow-600"></i>
                  VM Image Ubuntu Server
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
