import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    console.log("Button clicked. New theme state will be:", newTheme ? "dark" : "light");
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    console.log("Current HTML classes:", document.documentElement.className);
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
