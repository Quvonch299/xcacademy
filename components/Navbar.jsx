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

    return (
        <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="font-bold text-xl">EduPlatform</h1>

                <div className="flex gap-4 items-center">
                    <Link href="/">Courses</Link>

                    {!currentUser && (
                        <>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => setShowRegister(true)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Register
                            </button>
                        </>
                    )}

                    {currentUser && (
                        <>
                            <Link href="/dashboard">Dashboard</Link>

                            <div className="flex items-center gap-3 ">
                                {currentUser.image && (
                                    <img
                                        src={currentUser.image}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                )}
                                {/* <div>
                                    <p className="font-bold">{currentUser.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {currentUser.role}
                                    </p>
                                </div> */}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-96 relative">
                        <button
                            onClick={() => setShowLogin(false)}
                            className="absolute top-2 right-2 text-red-500 font-bold"
                        >
                            X
                        </button>
                        <LoginForm closeModal={() => setShowLogin(false)} />
                    </div>
                </div>
            )}

            {/* Register Modal */}
            {showRegister && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-96 relative">
                        <button
                            onClick={() => setShowRegister(false)}
                            className="absolute top-2 right-2 text-red-500 font-bold"
                        >
                            X
                        </button>
                        <RegisterForm closeModal={() => setShowRegister(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}