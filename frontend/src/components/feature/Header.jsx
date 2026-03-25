import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Features", href: "/#features" },
    { name: "Architecture", href: "/#architecture" },
    { name: "Team", href: "/#team" },
    { name: "Contact", href: "/#contact" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    if (href === "/dashboard") return location.pathname === "/dashboard";
    if (href === "/auth") return location.pathname === "/auth";
    return false;
  };

  const handleNavClick = (href) => {
    if (href.startsWith("/#")) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="w-full px-6 text-[15px]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://static.readdy.ai/image/77259ccf12976e7ede23528ca3b8551d/eb467829726c2f3f5aff07820ab28496.png"
              alt="DeepLung Logo"
              className="w-10 h-10 object-contain"
            />

            <div
              className="font-bold text-2xl text-gray-800 tracking-tight"
              style={{ fontFamily: '"Pacifico", serif' }}
            >
              DeepLung
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) =>
              item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap ${
                    isActive(item.href)
                      ? "text-blue-600 after:content-[''] after:block after:h-0.5 after:bg-blue-600 after:scale-x-100 after:transition-transform"
                      : "text-gray-600 hover:text-blue-600 after:content-[''] after:block after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("/#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className="text-gray-600 hover:text-blue-600 font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  {item.name}
                </a>
              ),
            )}
          </nav>

          {/* Auth & Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-5">
            <Link
              to="/auth"
              className={`hidden md:flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap ${
                isActive("/auth")
                  ? "bg-blue-600 text-white"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
              }`}
            >
              <i className="ri-user-line font-normal"></i>
              <span>Sign In</span>
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <i
                className={
                  isMenuOpen ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"
                }
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-5">
              {navItems.map((item) =>
                item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-semibold text-lg transition-colors cursor-pointer ${
                      isActive(item.href)
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("/#")) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    className="text-gray-600 hover:text-blue-600 font-semibold text-lg transition-colors cursor-pointer"
                  >
                    {item.name}
                  </a>
                ),
              )}
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-user-line font-normal"></i>
                <span>Sign In</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
