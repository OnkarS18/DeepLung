import Card from "../../../components/base/Card";
import onkarPhoto from "../../../assets/team/onkar_photo.png";
import pratikshaPhoto from "../../../assets/team/pratiksha_photo.jpeg";
import sanvhitaPhoto from "../../../assets/team/sanvhita_photo.jpg";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Ritesh",
      role: "Project Lead & AI Architect",
      specialization: "Deep Learning & Model Development",
      responsibilities: [
        "Project coordination and leadership",
        "AI model architecture design",
        "Deep learning implementation",
        "Performance optimization",
      ],
      skills: [
        "TensorFlow",
        "PyTorch",
        "Computer Vision",
        "Project Management",
      ],
      avatar:
        "https://static.readdy.ai/image/77259ccf12976e7ede23528ca3b8551d/c167732c369446d5c158f816247e7dcd.jfif",
      needsPhoto: false,
    },
    {
      name: "Sanvihita",
      role: "Data Scientist & Research Specialist",
      specialization: "Medical Data Analysis & Research",
      responsibilities: [
        "Medical literature review",
        "Dataset curation and analysis",
        "Research methodology design",
        "Statistical analysis and validation",
      ],
      skills: [
        "Data Science",
        "Medical Imaging",
        "Research",
        "Statistical Analysis",
      ],
      avatar: sanvhitaPhoto,
    },
    {
      name: "Onkar",
      role: "Backend Developer & System Architect",
      specialization: "System Integration & Security",
      responsibilities: [
        "Backend system development",
        "Database design and optimization",
        "Security implementation",
        "API development and integration",
      ],
      skills: ["Python", "Flask/Django", "PostgreSQL", "Cloud Computing"],
      avatar: onkarPhoto,
    },
    {
      name: "Pratiksha",
      role: "Frontend Developer & UI/UX Designer",
      specialization: "User Interface & Experience Design",
      responsibilities: [
        "User interface design and development",
        "User experience optimization",
        "Frontend implementation",
        "Responsive design and testing",
      ],
      skills: ["React.js", "UI/UX Design", "TypeScript", "Responsive Design"],
      avatar: pratikshaPhoto,
    },
  ];

  const guide = {
    name: "Dr. Aswathy M. A.",
    title: "Project Guide & Supervisor",
    position: "Associate Professor",
    department: "Department of Electronics & Telecommunication Engineering",
    expertise: [
      "Artificial Intelligence & Machine Learning",
      "Medical Image Processing",
      "Deep Learning Applications",
      "Research Methodology",
    ],
    avatar:
      "https://static.readdy.ai/image/77259ccf12976e7ede23528ca3b8551d/1b76aefd3a627f339b16e90c294340ac.png",
  };

  return (
    <section
      id="team"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            A dedicated team of Electronics & Telecommunication Engineering
            students working under expert guidance to develop innovative AI
            solutions for healthcare challenges.
          </p>
        </div>

        {/* Project Guide */}
        <div className="mb-16">
          <Card className="p-8 max-w-4xl mx-auto hover-lift medical-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Project Guide
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Expert supervision and academic guidance
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <img
                  src={guide.avatar}
                  alt={guide.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-200 to-green-200 shadow-lg"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {guide.name}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                  {guide.title}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{guide.position}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{guide.department}</p>

                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Areas of Expertise:
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {guide.expertise.map((area, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Team Members */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Student Team Members
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              B.Tech Electronics & Telecommunication Engineering Students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="p-6 text-center hover-lift medical-shadow transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6 relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-gradient-to-r from-blue-100 to-green-100 shadow-lg"
                  />

                  {member.needsPhoto && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                        <i className="ri-camera-line text-white text-xs"></i>
                      </div>
                    </div>
                  )}
                </div>

                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {member.name}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {member.specialization}
                </p>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm">
                    Key Responsibilities:
                  </h5>
                  <div className="space-y-1">
                    {member.responsibilities.map((responsibility, respIndex) => (
                      <div key={respIndex} className="text-left flex items-start">
                        <span className="text-gray-600 dark:text-gray-400 mr-2">•</span>
                        <span className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                          {responsibility}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm">
                    Technical Skills:
                  </h5>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/40 dark:to-green-900/40 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs hover:from-blue-200 hover:to-green-200 transition-all font-medium border border-blue-200 dark:border-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Statistics */}
        <div className="mt-16">
          <Card className="p-8 medical-shadow">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
              Team Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-blue-200 dark:border-blue-700">
                  <i className="ri-trophy-line text-blue-600 dark:text-blue-400 text-2xl"></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">24</h4>
                <p className="text-gray-600 dark:text-gray-400">Weeks of Development</p>
              </div>

              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-green-200 dark:border-green-700">
                  <i className="ri-code-s-slash-line text-green-600 dark:text-green-400 text-2xl"></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">8000+</h4>
                <p className="text-gray-600 dark:text-gray-400">Lines of Code</p>
              </div>

              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-purple-200 dark:border-purple-700">
                  <i className="ri-database-line text-purple-600 dark:text-purple-400 text-2xl"></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  15,000+
                </h4>
                <p className="text-gray-600 dark:text-gray-400">CT Scan Images Processed</p>
              </div>

              <div className="text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-orange-200 dark:border-orange-700">
                  <i className="ri-test-tube-line text-orange-600 dark:text-orange-400 text-2xl"></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">96.2%</h4>
                <p className="text-gray-600 dark:text-gray-400">Detection Accuracy</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
