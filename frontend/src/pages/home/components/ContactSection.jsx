import { useState } from "react";
import Card from "../../../components/base/Card";
import Button from "../../../components/base/Button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch(
        "https://readdy.ai/api/form/d37bdcs23rr1ef6dvlvg",
        {
          method: "POST",
          body: new URLSearchParams(formData),
        },
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          organization: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "ri-mail-line",
      title: "Email",
      value: "deeplung.project@gmail.com",
      description: "Send us your inquiries",
    },
    {
      icon: "ri-phone-line",
      title: "Project Guide",
      value: "Dr. Aswathy M. A.",
      description: "Associate Professor, CSE Department",
    },
    {
      icon: "ri-building-line",
      title: "Institution",
      value: "Computer Science & Engineering",
      description: "B.Tech Major Project 2024",
    },
    {
      icon: "ri-github-line",
      title: "Project Repository",
      value: "github.com/deeplung",
      description: "View source code and documentation",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Get in touch with our team for collaboration opportunities,
            technical discussions, or academic inquiries about the DeepLung
            project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <Card className="p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Get In Touch
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                We welcome collaboration opportunities, technical discussions,
                and academic inquiries. Whether you're a healthcare
                professional, researcher, or fellow student, we'd love to hear
                from you and discuss our innovative AI-driven lung cancer
                detection system.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${info.icon} text-blue-600 text-xl`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-blue-600 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Project Statistics */}
            <Card className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Project Impact
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    95.7%
                  </div>
                  <div className="text-gray-600 text-sm">
                    Detection Accuracy
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    &lt;2min
                  </div>
                  <div className="text-gray-600 text-sm">Analysis Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    10K+
                  </div>
                  <div className="text-gray-600 text-sm">Images Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    7
                  </div>
                  <div className="text-gray-600 text-sm">AI Models</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send a Message
              </h3>

              {submitStatus === "success" && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  There was an error sending your message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} data-readdy-form id="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Organization/Institution
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your organization or institution"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="collaboration">
                      Collaboration Opportunity
                    </option>
                    <option value="technical">Technical Discussion</option>
                    <option value="academic">Academic Inquiry</option>
                    <option value="research">Research Partnership</option>
                    <option value="demo">Request Demo</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    placeholder="Enter your message (max 500 characters)"
                  ></textarea>
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.message.length}/500 characters
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line"></i>
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
