export default function ProgressBar({ value, max }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full bg-gray-300 rounded-full h-6">
      <div
        className="bg-green-500 h-6 rounded-full text-white text-center"
        style={{ width: `${percentage}%` }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
}
