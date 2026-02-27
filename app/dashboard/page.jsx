"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { currentUser, users, logout } = useAuth();
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-lg p-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-10">
          {currentUser.image && (
            <img
              src={currentUser.image}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-bold">{currentUser.name}</p>
            <p className="text-sm text-gray-500">{currentUser.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-2 rounded w-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">My Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentUser.courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition flex flex-col"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-4">{course.title}</h2>

              {/* Progress */}
              <div className="w-full bg-gray-200 h-3 rounded-full mb-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

              <p className="text-sm mb-4">{course.progress}% Completed</p>

              <button
                onClick={() => setSelectedVideo(course.video)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-auto"
              >
                Watch Video
              </button>
            </div>
          ))}
        </div>

        {/* Admin Section */}
        {currentUser.role === "admin" && (
          <div className="mt-12 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              Registered Users: {users.length}
            </h2>

            <button
              onClick={() => router.push("/users")}
              className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 transition"
            >
              View All Users
            </button>

            {users.map((u) => (
              <p key={u.id} className="text-sm">
                {u.name} — {u.email}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl relative overflow-hidden">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 text-red-500 font-bold text-lg z-10"
            >
              X
            </button>

            <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedVideo}
                title="Course Video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}