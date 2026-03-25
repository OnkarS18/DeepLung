export default function Card({ children, className = "", hover = false }) {
  const hoverClasses = hover ? "hover:shadow-xl hover:-translate-y-1" : "";
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
