"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 LocalStorage’dan yuklash
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    const fixedUsers = storedUsers.map((user) => ({
      ...user,
      courses: user.courses || [
        { id: 1, title: "React JS Masterclass", progress: 0, video: "https://www.youtube.com/embed/bMknfKXIFA8" },
        { id: 2, title: "Next JS Full Course", progress: 0, video: "https://www.youtube.com/embed/ZVnjOPwW4ZA" },
      ],
    }));

    setUsers(fixedUsers);
    setCurrentUser(storedCurrentUser);
    setLoading(false);
  }, []);

  // 🔹 USERS va CURRENT USER localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // =========================
  // 🟢 REGISTER
  // =========================
  const register = (name, email, password, image, age, country) => {
    if (!name || !email || !password || !age || !country) {
      alert("Barcha maydonlarni to‘ldiring");
      return false;
    }

    const emailExists = users.find((u) => u.email === email);
    if (emailExists) {
      alert("Bu email allaqachon mavjud");
      return false;
    }

    const role = email === "admin@gmail.com" ? "admin" : "user";

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      image: image || "",
      age,
      country,
      role,
      courses: [
        { id: 1, title: "React JS Masterclass", progress: 0, video: "https://www.youtube.com/embed/bMknfKXIFA8" },
        { id: 2, title: "Next JS Full Course", progress: 0, video: "https://www.youtube.com/embed/ZVnjOPwW4ZA" },
      ],
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  // =========================
  // 🔵 LOGIN
  // =========================
  const login = (email, password) => {
    if (!email || !password) {
      alert("Email va parolni kiriting");
      return false;
    }

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("Email yoki parol noto‘g‘ri");
      return false;
    }

    setCurrentUser(foundUser);
    return true;
  };

  // =========================
  // 🔴 LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  // =========================
  // 🟡 PROGRESS UPDATE
  // =========================
  const updateProgress = (courseId, newProgress) => {
    if (!currentUser) return;

    const updatedCourses = currentUser.courses.map((course) =>
      course.id === courseId ? { ...course, progress: newProgress } : course
    );

    const updatedUser = { ...currentUser, courses: updatedCourses };
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? updatedUser : u
    );

    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        loading,
        register,
        login,
        logout,
        updateProgress,
        setCurrentUser, // optional
        setUsers,       // 🔹 shu yerda qo'shildi
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);