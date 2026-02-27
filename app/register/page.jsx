"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form.name, form.email, form.password, form.image);
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          required
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleImage}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}