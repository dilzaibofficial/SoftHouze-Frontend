import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { 
  ArrowRight, 
  CheckCircle, 
  Code, 
  Smartphone, 
  Cloud, 
  Brain,
  Users,
  Trophy,
  Globe,
  Rocket,
  Star,
  Play,
  ChevronRight
} from 'lucide-react';

const Home: React.FC = () => {
  const { isDark } = useTheme();
  
 
  const features = [
    {
      icon: Code,
      title: "Custom Development",
      description: "Tailored solutions built with cutting-edge technologies to meet your specific business needs.",
      color: "from-[#218EF2] to-blue-600"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Approach",
      description: "Responsive designs that work seamlessly across all devices and platforms.",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment strategies for modern applications.",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Smart solutions powered by artificial intelligence and machine learning.",
      color: "from-[#218EF2] to-blue-700"
    }
  ];

  const services = [
    { 
      title: "Web Development", 
      description: "Modern web applications with React, Vue, and Angular",
      technologies: ["React", "Next.js", "TypeScript", "Node.js"]
    },
    { 
      title: "Mobile Apps", 
      description: "Native and cross-platform mobile applications",
      technologies: ["React Native", "Flutter", "iOS", "Android"]
    },
    { 
      title: "Cloud Services", 
      description: "AWS, Azure, and GCP deployment and management",
      technologies: ["AWS", "Docker", "Kubernetes", "DevOps"]
    },
    { 
      title: "AI & ML", 
      description: "Intelligent solutions with machine learning algorithms",
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechStart",
      content: "Soft Houze delivered an exceptional web application that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder, InnovateCorp",
      content: "The mobile app they built for us has been a game-changer. Professional, reliable, and always available for support.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, DataFlow",
      content: "Their AI integration transformed our business processes. The team's knowledge of machine learning is impressive.",
      rating: 5
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a detailed project roadmap.",
      icon: Users
    },
    {
      step: "02",
      title: "Design & Development",
      description: "Our team builds your solution using agile methodologies and best practices.",
      icon: Code
    },
    {
      step: "03",
      title: "Testing & Deployment",
      description: "Comprehensive testing ensures quality before smooth deployment to production.",
      icon: Trophy
    },
    {
      step: "04",
      title: "Support & Maintenance",
      description: "Ongoing support and updates to keep your application running smoothly.",
      icon: Globe
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Effects */}
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
          <div className="space-y-8">
            <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-[#218EF2]/20 to-blue-600/20 border border-[#218EF2]/30 rounded-full px-6 py-3`}>
              <Rocket className="w-4 h-4 text-[#218EF2]" />
              <span className="text-[#218EF2] font-medium">Building the Future of Software</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.2]">
              Transform Ideas into
              <span className="block bg-gradient-to-r from-[#218EF2] via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Digital Reality
              </span>
            </h1>
            
            <p className={`text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mt-5 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We craft exceptional software solutions that drive innovation and accelerate business growth. 
              From web applications to AI-powered systems, we turn your vision into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <button className="group bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 text-white">
                  <Rocket className="w-5 h-5" />
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              
            </div>

            {/* Trust Indicators */}
            <div className={`flex flex-wrap justify-center items-center gap-8 pt-12 opacity-60`}>
              {["Enterprise Ready", "24/7 Support", "Agile Process", "Latest Tech"].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#218EF2]" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    

      {/* Features Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose 
              <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Soft Houze?</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We combine technical expertise with creative innovation to deliver solutions that drive business growth and exceed expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className={`rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-105 ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                  }`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                    <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Core 
              <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Services</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              From concept to deployment, we offer comprehensive technology solutions tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className={`rounded-2xl p-8 transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-[#218EF2]/50'
                    : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                }`}>
                  <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                    isDark 
                      ? 'text-white group-hover:text-[#218EF2]' 
                      : 'text-gray-900 group-hover:text-[#218EF2]'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-[#218EF2] hover:text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-[#218EF2] hover:text-white'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Development 
              <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Process</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              A proven methodology that ensures project success from start to finish with transparency and collaboration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div className={`rounded-2xl p-6 transition-all duration-300 group-hover:scale-105 ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                  }`}>
                    <div className="text-4xl font-bold text-[#218EF2] mb-4">{step.step}</div>
                    <Icon className="w-8 h-8 text-[#218EF2] mb-4" />
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{step.description}</p>
                  </div>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#218EF2] to-blue-600 transform -translate-y-1/2"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Our 
              <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Clients Say</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className={`rounded-2xl p-8 transition-all duration-300 group-hover:scale-105 ${
                  isDark 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-[#218EF2]/50'
                    : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                }`}>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#218EF2] fill-current" />
                    ))}
                  </div>
                  <p className={`mb-6 leading-relaxed italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>"{testimonial.content}"</p>
                  <div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
                    <div className="text-[#218EF2] text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-blue-900/30 via-gray-900 to-black'
          : 'bg-gradient-to-br from-blue-50 via-white to-gray-50'
      }`}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#218EF2]/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform 
            <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Your Ideas?</span>
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's discuss your project and create something amazing together. Our team is ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <button className="group bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 text-white">
                <Rocket className="w-5 h-5" />
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link to="/portfolio">
              <button className={`group border px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 ${
                isDark 
                  ? 'border-gray-600 hover:border-[#218EF2] hover:bg-[#218EF2]/10'
                  : 'border-gray-300 hover:border-[#218EF2] hover:bg-[#218EF2]/10'
              }`}>
                <Trophy className="w-5 h-5" />
                <span>View Our Work</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;