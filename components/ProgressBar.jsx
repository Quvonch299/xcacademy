// components/ProgressBar.jsx
export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 h-3 rounded-full">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}