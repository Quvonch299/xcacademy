"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UsersPage() {
  const { users, currentUser, setUsers } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/login");
    }
  }, [currentUser]);

  // Filter qidiruv bo‘yicha
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  // =========================
  // Remove user funksiyasi
  // =========================
  const removeUser = (userId) => {
    if (confirm("Siz rostdan ham bu foydalanuvchini o‘chirmoqchimisiz?")) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      setUsers(updatedUsers);

      // Agar modal ochilgan foydalanuvchi bo‘lsa yopish
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
    }
  };

  if (!currentUser || currentUser.role !== "admin") return null;

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Registered Users</h1>

      {/* Search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p className="text-center col-span-3 text-gray-500">No users found.</p>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer relative"
            >
              {/* Remove button */}
              {currentUser.role === "admin" && u.id !== currentUser.id && (
                <button
                  onClick={() => removeUser(u.id)}
                  className="absolute top-3 right-3 text-red-500 font-bold"
                >
                  ×
                </button>
              )}

              <div onClick={() => setSelectedUser(u)}>
                <div className="flex items-center gap-4 mb-4">
                  {u.image ? (
                    <img
                      src={u.image}
                      alt={u.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                      {u.name[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">Role: {u.role}</p>
                <p className="text-gray-600 text-sm">Country: {u.country}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg relative shadow-lg">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-red-500 font-bold text-xl"
            >
              ×
            </button>

            <div className="flex items-center gap-4 mb-4">
              {selectedUser.image ? (
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-xl">
                  {selectedUser.name[0].toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-bold text-xl">{selectedUser.name}</p>
                <p className="text-gray-500">{selectedUser.email}</p>
              </div>
            </div>

            <div className="mb-4">
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>Country:</strong> {selectedUser.country}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Courses:</h3>
              {selectedUser.courses.map((c) => (
                <div key={c.id} className="mb-1">
                  <p>
                    {c.title} — <span className="text-blue-600">{c.progress}% Completed</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Remove from modal */}
            {currentUser.role === "admin" && selectedUser.id !== currentUser.id && (
              <button
                onClick={() => removeUser(selectedUser.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove User
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}