"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm({ closeModal }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      closeModal();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />

      <button 
        type="submit"
        className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
      >
        Login
      </button>

      <p className="text-center text-gray-500 text-sm mt-2">
        Don’t have an account? <span className="text-blue-600 font-medium cursor-pointer hover:underline">Sign up</span>
      </p>
    </form>
  );
}