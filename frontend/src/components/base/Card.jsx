export default function Card({ children, className = "", hover = false }) {
  const hoverClasses = hover ? "hover:shadow-xl hover:-translate-y-1" : "";
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
