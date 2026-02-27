"use client";

import { videos } from "@/data/video";
import { Calendar, User, PlayCircle } from "lucide-react";

export default function KabenetBox() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {videos.map((video) => {
        const embedUrl = video.videoUrl.replace(
          "https://youtu.be/",
          "https://www.youtube.com/embed/"
        );

        return (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-52"
              allowFullScreen
            />

            <div className="p-4">
              <div className="flex items-center gap-2">
                <PlayCircle size={18} className="text-red-500" />
                <h2 className="text-lg font-semibold">
                  {video.title}
                </h2>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                {video.description}
              </p>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {video.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {video.createdAt}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}