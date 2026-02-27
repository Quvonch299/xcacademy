"use client";
import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // 3 soniya
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed top-5 right-5 text-white px-4 py-2 rounded shadow-lg ${bgColor} animate-slide-in`}
    >
      {message}
    </div>
  );
}