export default function Card({ title, children }) {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      {children}
    </div>
  );
}
