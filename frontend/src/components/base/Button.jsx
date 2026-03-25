export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
}) {
  const baseClasses =
    "whitespace-nowrap cursor-pointer font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2";
  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
