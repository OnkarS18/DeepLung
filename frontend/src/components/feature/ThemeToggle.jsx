import { useState, useEffect } from "react";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return savedTheme === "dark" || (!savedTheme && prefersDark);
};

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
        isDark ? "bg-blue-600" : "bg-gray-300"
      }`}
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out flex items-center justify-center ${
          isDark ? "translate-x-7" : "translate-x-0.5"
        }`}
      >
        <i
          className={`text-sm transition-all duration-300 ${
            isDark
              ? "ri-moon-line text-blue-600"
              : "ri-sun-line text-yellow-500"
          }`}
        ></i>
      </div>
    </button>
  );
}
