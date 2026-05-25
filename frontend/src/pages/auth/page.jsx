import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import Card from "../../components/base/Card";
import Button from "../../components/base/Button";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("signin");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    organization: "",
    role: "doctor",
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // TODO: Redirect to dashboard after successful login
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold">Login Successful!</h4>
              <p className="text-sm text-green-100">
                Welcome to DeepLung Dashboard
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <img
                src="https://static.readdy.ai/image/77259ccf12976e7ede23528ca3b8551d/eb467829726c2f3f5aff07820ab28496.png"
                alt="DeepLung Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome to DeepLung
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access advanced AI-powered lung cancer detection tools
            </p>
          </div>

          <Card className="p-8 hover-lift medical-shadow">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700/50 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab("signin")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "signin"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "signup"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sign In Form */}
              {activeTab === "signin" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="doctor@hospital.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTab("forgot")}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Button type="submit" className="w-full whitespace-nowrap">
                    <i className="ri-login-box-line mr-2"></i>
                    Sign In
                  </Button>
                </>
              )}

              {/* Sign Up Form */}
              {activeTab === "signup" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="doctor@hospital.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="City General Hospital"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Professional Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      required
                    >
                      <option value="doctor">Medical Doctor</option>
                      <option value="radiologist">Radiologist</option>
                      <option value="resident">Medical Resident</option>
                      <option value="nurse">Nurse Practitioner</option>
                      <option value="researcher">Medical Researcher</option>
                      <option value="technician">Medical Technician</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      required
                    />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 mt-1 dark:bg-gray-700"
                      required
                    />

                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
                        Privacy Policy
                      </a>
                    </span>
                  </div>
                  <Button type="submit" className="w-full whitespace-nowrap">
                    <i className="ri-user-add-line mr-2"></i>
                    Create Account
                  </Button>
                </>
              )}

              {/* Forgot Password Form */}
              {activeTab === "forgot" && (
                <>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Reset Password
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enter your email to receive reset instructions
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="doctor@hospital.com"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full whitespace-nowrap">
                    <i className="ri-mail-send-line mr-2"></i>
                    Send Reset Link
                  </Button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("signin")}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-500 cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </>
              )}
            </form>

            {/* Social Login */}
            {activeTab !== "forgot" && (
              <>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer transition-all whitespace-nowrap">
                    <i className="ri-google-fill text-red-500"></i>
                    <span className="ml-2">Google</span>
                  </button>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer transition-all whitespace-nowrap">
                    <i className="ri-microsoft-fill text-blue-500"></i>
                    <span className="ml-2">Microsoft</span>
                  </button>
                </div>
              </>
            )}
          </Card>

          {/* Footer Links */}
          <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Need help?{" "}
              <Link
                to="/contact"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
