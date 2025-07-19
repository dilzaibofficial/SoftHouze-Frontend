import React, { useState, useRef } from 'react';
import { useTheme } from '../App';
import emailjs from 'emailjs-com';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Linkedin, 
  Twitter, 
  Github,
  MessageCircle,
  CheckCircle,
  Globe,
  Headphones
} from 'lucide-react';

const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    projectType: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    if (!formRef.current) return;
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          projectType: '',
          budget: ''
        });
      })
      .catch((err) => {
        setIsSubmitting(false);
        setError('Failed to send message. Please try again later.');
      });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@softhouze.com",
      description: "Send us an email anytime",
      color: "from-[#218EF2] to-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm EST",
      color: "from-blue-500 to-blue-700"
    },
    
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM EST",
      description: "We're here to help",
      color: "from-[#218EF2] to-blue-700"
    }
  ];

  const services = [
    { icon: Globe, title: "Web Development", description: "Custom web applications and websites" },
    { icon: Phone, title: "Mobile Apps", description: "iOS and Android applications" },
    { icon: MessageCircle, title: "Cloud Solutions", description: "Scalable cloud infrastructure" },
    { icon: Headphones, title: "Consulting", description: "Technical consulting and strategy" }
  ];

  const socialLinks = [
    { icon: Linkedin, name: "LinkedIn", url: "#", color: "hover:text-blue-400" },
    { icon: Twitter, name: "Twitter", url: "#", color: "hover:text-blue-400" },
    { icon: Github, name: "GitHub", url: "#", color: "hover:text-gray-400" }
  ];

  if (isSubmitted) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-to-r from-[#218EF2] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-white"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-blue-900/30 via-gray-900 to-black'
              : 'bg-gradient-to-br from-blue-50 via-white to-gray-50'
          }`}></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#218EF2]/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Get In 
            <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Touch</span>
          </h1>
          <p className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to start your next project? We'd love to hear from you. Let's discuss your ideas 
            and create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className={`rounded-2xl p-8 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
              }`}>
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Send Us a Message</h2>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Your Company Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Project Type</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-600 border border-gray-500 text-white focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 focus:border-[#218EF2]'
                        }`}
                      >
                        <option value="">Select a service</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-app">Mobile App</option>
                        <option value="cloud-solutions">Cloud Solutions</option>
                        <option value="ai-integration">AI Integration</option>
                        <option value="consulting">Consulting</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-600 border border-gray-500 text-white focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 focus:border-[#218EF2]'
                        }`}
                      >
                        <option value="">Select budget range</option>
                        <option value="5k-15k">$5K - $15K</option>
                        <option value="15k-50k">$15K - $50K</option>
                        <option value="50k-100k">$50K - $100K</option>
                        <option value="100k+">$100K+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                        isDark 
                          ? 'bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:border-[#218EF2]'
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                      }`}
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none resize-none ${
                        isDark 
                          ? 'bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:border-[#218EF2]'
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                      }`}
                      placeholder="Tell us about your project requirements, timeline, and any specific questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Information</h2>
                <p className={`mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  We're here to help and answer any question you might have. We look forward to hearing from you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className={`rounded-2xl p-6 transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                    }`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{info.title}</h3>
                          <p className="text-[#218EF2] font-medium mb-1">{info.content}</p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{info.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Services Quick Links */}
              <div className={`rounded-2xl p-6 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Services</h3>
                <div className="space-y-3">
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className={`flex items-center space-x-3 transition-colors ${
                        isDark 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}>
                        <Icon className="w-5 h-5 text-[#218EF2]" />
                        <div>
                          <div className="font-medium">{service.title}</div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{service.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className={`rounded-2xl p-6 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                          isDark 
                            ? 'bg-gray-600 text-gray-400' 
                            : 'bg-gray-200 text-gray-600'
                        } ${social.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className={`rounded-2xl p-6 ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-[#218EF2]/30'
                  : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-[#218EF2]/30'
              }`}>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Response Guarantee</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-blue-100' : 'text-blue-800'}`}>
                  We typically respond to all inquiries within 2-4 hours during business hours. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Frequently Asked 
              <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Questions</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Quick answers to common questions about our services and process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity, but most web applications take 8-16 weeks, while mobile apps typically require 12-20 weeks."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, we offer comprehensive maintenance and support packages to ensure your application stays secure, updated, and performing optimally."
              },
              {
                question: "What's your development approach?",
                answer: "We follow agile methodologies with regular sprints, client feedback sessions, and transparent communication throughout the development process."
              },
              {
                question: "Can you work with our existing team?",
                answer: "Absolutely! We can integrate with your existing development team or work as an extension of your organization to meet your specific needs."
              }
            ].map((faq, index) => (
              <div key={index} className={`rounded-2xl p-6 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-[#218EF2]/50'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
              }`}>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;