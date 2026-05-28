export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://static.readdy.ai/image/77259ccf12976e7ede23528ca3b8551d/eb467829726c2f3f5aff07820ab28496.png"
                alt="DeepLung Logo"
                className="w-10 h-10 object-contain"
              />

              <div>
                <h3 className="text-xl font-bold">DeepLung</h3>
                <p className="text-sm text-gray-400">
                  AI-Driven Lung Cancer Detection
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              An innovative B.Tech major project focused on early lung cancer
              detection using advanced AI techniques and CT scan analysis.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Project Guide</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Dr. Aswathy M. A.</p>
              <p className="text-gray-400">Associate Professor</p>
              <p className="text-gray-400">
                Department of E&TC Engineering
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Institution</h4>
            <div className="space-y-2">
              <p className="text-gray-300">
                Department of E&TC Engineering
              </p>
              <p className="text-gray-400">B.Tech Major Project 2025-26</p>
              <div className="flex space-x-5 mt-4 pl-18">
                <a
                  href="mailto:onkarsorde@gmail.com"
                  className="text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  <i className="ri-mail-line text-xl"></i>
                </a>

                <a
                  href="https://github.com/OnkarS18/DeepLung"
                  className="text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  <i className="ri-github-line text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 DeepLung Project. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="https://readdy.ai/?origin=logo"
              className="text-gray-400 hover:text-blue-400 text-sm cursor-pointer transition-colors"
            >
              Made with Readdy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
