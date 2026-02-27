"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-indigo-600">Edu</span>
          <span className="text-2xl font-bold text-gray-900">Platform</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            Courses
          </Link>

          {!currentUser ? (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="px-5 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Kirish
              </button>

              <button
                onClick={() => setShowRegister(true)}
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Ro‘yxatdan o‘tish
              </button>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                href="/profile/dashboard"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-3">
                {currentUser.image ? (
                  <img
                    src={currentUser.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                    {currentUser.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>

              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Chiqish
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t border-gray-200">
          <Link
            href="/"
            className="block text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Courses
          </Link>

          {!currentUser ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}
                className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Kirish
              </button>
              <button
                onClick={() => { setShowRegister(true); setMobileMenuOpen(false); }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Ro‘yxatdan o‘tish
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="block text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-2">
                {currentUser.image ? (
                  <img
                    src={currentUser.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                    {currentUser.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Chiqish
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold z-10 transition-colors"
            >
              ✕
            </button>
            <div className="p-8">
              <LoginForm closeModal={() => setShowLogin(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold z-10 transition-colors"
            >
              ✕
            </button>
            <div className="p-8">
              <RegisterForm closeModal={() => setShowRegister(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}