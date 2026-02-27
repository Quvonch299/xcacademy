"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm({ closeModal }) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  // 🔹 Rasmni base64 formatga o‘tkazish
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !age || !country) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }
    if (register(name, email, password, image, age, country)) {
      closeModal();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
        Ro`yxatdan o`ting
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
      />

      <input
        type="number"
        placeholder="Yoshingiz"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
      />

      <input
        type="text"
        placeholder="Davlatingiz"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="border border-gray-300 p-2 rounded-lg"
      />

      <button 
        type="submit"
        className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
      >
        Register
      </button>

      <p className="text-center text-gray-500 text-sm mt-2">
        Already have an account? <span className="text-blue-600 font-medium cursor-pointer hover:underline">Login</span>
      </p>
    </form>
  );
}