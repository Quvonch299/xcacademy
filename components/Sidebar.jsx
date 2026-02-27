// components/Sidebar.jsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <div className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-blue-600">
          Overview
        </Link>
        <Link href="#" className="hover:text-blue-600">
          Courses
        </Link>
        <Link href="#" className="hover:text-blue-600">
          Students
        </Link>
        <Link href="#" className="hover:text-blue-600">
          Settings
        </Link>
      </div>
    </div>
  );
}