"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 localStorage dan yuklash va eski userlarni tuzatish
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Agar courses bo‘lmasa default courses qo‘y
    const fixedUsers = storedUsers.map((user) => ({
      ...user,
      courses: user.courses || [
        {
          id: 1,
          title: "React JS Masterclass",
          progress: 0,
          video: "https://www.youtube.com/embed/bMknfKXIFA8",
        },
        {
          id: 2,
          title: "Next JS Full Course",
          progress: 0,
          video: "https://www.youtube.com/embed/ZVnjOPwW4ZA",
        },
      ],
    }));

    setUsers(fixedUsers);
    setCurrentUser(storedCurrentUser);
    setLoading(false);
  }, []);

  // 🔹 USERS ni localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // 🔹 CURRENT USER ni saqlash
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);
// context/AuthContext.jsx ichida
const [toast, setToast] = useState(null);

const showToast = (message, type = "success") => {
  setToast({ message, type });
};

// REGISTER
const register = (name, email, password, image) => {
  if (!name || !email || !password) {
    showToast("Barcha maydonlarni to‘ldiring", "error");
    return false;
  }

  const emailExists = users.find((u) => u.email === email);
  if (emailExists) {
    showToast("Bu email allaqachon mavjud", "error");
    return false;
  }

  const role = email === "admin@gmail.com" ? "admin" : "user";

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    image: image || "",
    role,
    courses: [
      {
        id: 1,
        title: "React JS Masterclass",
        progress: 0,
        video: "https://www.youtube.com/embed/bMknfKXIFA8",
      },
      {
        id: 2,
        title: "Next JS Full Course",
        progress: 0,
        video: "https://www.youtube.com/embed/ZVnjOPwW4ZA",
      },
    ],
  };

  setUsers([...users, newUser]);
  setCurrentUser(newUser);

  showToast("Ro'yxatdan muvaffaqiyatli o'tdingiz!", "success");
  return true;
};

// LOGIN
const login = (email, password) => {
  if (!email || !password) {
    showToast("Email va parolni kiriting", "error");
    return false;
  }

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    showToast("Email yoki parol noto‘g‘ri", "error");
    return false;
  }

  setCurrentUser(foundUser);
  showToast("Tizimga muvaffaqiyatli kirdingiz!", "success");
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
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);