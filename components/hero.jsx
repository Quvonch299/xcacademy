'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Hero() {
  const { currentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center">
        <div className="max-w-4xl space-y-8 md:space-y-12">

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white">
            Kelajak kasbini
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
              zamonaviy usulda
            </span>
            <br />
            o‘rganing
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dasturlashni quruq nazariya bilan emas, real amaliyot va real loyihalar orqali o‘rganing.
            <br className="hidden sm:block" />
            Premium kurslar, ochiq kodlar va kuchli community — hammasi bir joyda.
          </p>

          {/* CTA buttons */}
          {!isLoggedIn ? (
           <div>
            <h2 className='text-[50px] font-semibold text-white'>Ro`yxatdan o`ting</h2>
           </div>
          ) : (
            <div className="flex flex-col items-center gap-3 justify-center mt-6">
              <p className="text-white text-lg font-medium">
                Salom, {currentUser.name}!
              </p>
              <Link
                href="/dashboard"
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg"
              >
                Dashboard
              </Link>
            </div>
          )}

          {/* Badge */}
          <div className="pt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 text-gray-300 hover:scale-105 transition-transform duration-300">
              <span className="text-purple-400 font-medium">XcAcademy 0.1</span>
              <span>platformasi ishga tushdi →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 opacity-90 pointer-events-none" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.15),transparent_50%)] animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse-slower pointer-events-none" />
    </section>
  );
}