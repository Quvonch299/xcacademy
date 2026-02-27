// components/CourseCard.jsx
import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{course.title}</h2>
      <p className="text-gray-500">{course.students} students</p>

      <Link
        href={`/courses/${course.id}`}
        className="mt-4 inline-block text-blue-600"
      >
        View Course →
      </Link>
    </div>
  );
}