"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const usersCollection = collection(db, "users");

  // 🔹 Firestore'dan yuklash
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDocs(usersCollection);
      const fetchedUsers = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(fetchedUsers);

      const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
      setCurrentUser(storedCurrentUser);

      setLoading(false);
    };

    fetchUsers();
  }, []);

  // =========================
  // REGISTER
  // =========================
  const register = async (name, email, password, image, age, country) => {
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

    const docRef = await addDoc(usersCollection, newUser);
    setUsers([...users, { ...newUser, id: docRef.id }]);
    setCurrentUser({ ...newUser, id: docRef.id });
    localStorage.setItem("currentUser", JSON.stringify({ ...newUser, id: docRef.id }));

    return true;
  };

  // =========================
  // LOGIN
  // =========================
  const login = (email, password) => {
    if (!email || !password) {
      alert("Email va parolni kiriting");
      return false;
    }

    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (!foundUser) {
      alert("Email yoki parol noto‘g‘ri");
      return false;
    }

    setCurrentUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    return true;
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  // =========================
  // REMOVE USER (Admin uchun)
  // =========================
  const removeUser = async (userId) => {
    if (!window.confirm("Siz rostdan ham bu foydalanuvchini o‘chirmoqchimisiz?")) return;
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((u) => u.id !== userId));

    if (currentUser?.id === userId) logout();
  };

  // =========================
  // UPDATE PROGRESS
  // =========================
  const updateProgress = async (courseId, newProgress) => {
    if (!currentUser) return;

    const updatedCourses = currentUser.courses.map((course) =>
      course.id === courseId ? { ...course, progress: newProgress } : course
    );

    const updatedUser = { ...currentUser, courses: updatedCourses };
    await updateDoc(doc(db, "users", currentUser.id), { courses: updatedCourses });

    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
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
        removeUser,
        setCurrentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);