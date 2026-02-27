import React from "react";
import { FaVideoSlash } from "react-icons/fa";

export default function ZakasBox() {
  return (
    <div className="flex items-center justify-center min-h-[350px] px-4">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center max-w-md w-full">
        
        {/* Icon */}
        <div className="flex justify-center mb-4 text-gray-400 text-5xl">
          <FaVideoSlash />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Video mavjud emas
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm">
          Hozircha bu yerda video yo‘q. Video qo‘shilgandan so‘ng shu yerda ko‘rinadi.
        </p>

      </div>
    </div>
  );
}