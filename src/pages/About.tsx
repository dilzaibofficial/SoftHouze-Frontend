import React from 'react';
import { useTheme } from '../App';
import { 
  Users, 
  Trophy, 
  Globe, 
  Rocket,
  Code,
  Brain,
  Heart,
  Shield,
  Target,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const { isDark } = useTheme();
  
  const values = [
    {
      icon: Brain,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex problems and drive digital transformation."
    },
    {
      icon: Heart,
      title: "Quality",
      description: "We deliver exceptional quality in every project, ensuring robust, scalable, and reliable software solutions."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work closely with our clients as partners, fostering transparent communication and shared success."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest standards of honesty, transparency, and ethical practices in all our dealings."
    }
  ];

  const skills = [
    { name: "Frontend Development", percentage: 95, color: "from-red-500 to-red-600" },
    { name: "Backend Development", percentage: 90, color: "from-red-600 to-red-700" },
    { name: "Mobile Development", percentage: 85, color: "from-red-700 to-red-800" },
    { name: "Cloud Solutions", percentage: 88, color: "from-red-500 to-red-700" },
    { name: "AI/ML Integration", percentage: 80, color: "from-red-600 to-red-800" },
    { name: "DevOps & Infrastructure", percentage: 92, color: "from-red-400 to-red-600" }
  ];

  const team = [
    {
      name: "Alex Rodriguez",
      role: "CEO & Founder",
      description: "10+ years in software development and business strategy. Expert in scaling tech companies.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Expert in cloud architecture and scalable systems. Former senior engineer at major tech companies.",
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Michael Johnson",
      role: "Lead Designer",
      description: "Specialist in UX/UI design and user research. Award-winning designer with 8+ years experience.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Emily Davis",
      role: "Senior Developer",
      description: "Full-stack developer with expertise in modern frameworks and AI integration technologies.",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const timeline = [
    {
      year: "2016",
      title: "Company Founded",
      description: "Soft Houze was founded with a vision to create innovative software solutions for businesses of all sizes.",
      icon: Rocket
    },
    {
      year: "2018",
      title: "Team Expansion",
      description: "Grew our team to 15 talented developers and designers, expanding our service offerings to include mobile development.",
      icon: Users
    },
    {
      year: "2020",
      title: "Major Milestone",
      description: "Completed 100+ successful projects and established partnerships with leading cloud providers.",
      icon: Trophy
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Pioneered AI-powered solutions and machine learning integrations for our clients.",
      icon: Brain
    },
    {
      year: "2024",
      title: "Global Reach",
      description: "Expanded internationally with clients across 25 countries and a team of 30+ professionals.",
      icon: Globe
    }
  ];

 
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
            About 
            <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Soft Houze</span>
          </h1>
          <p className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We are a passionate team of developers, designers, and innovators dedicated to creating 
            exceptional digital experiences that drive business growth and technological advancement.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className={`rounded-2xl p-8 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
            }`}>
              <Target className="w-12 h-12 text-[#218EF2] mb-6" />
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Mission</h2>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                To empower businesses with innovative technology solutions that transform ideas into reality. 
                We strive to deliver exceptional software that not only meets current needs but anticipates 
                future challenges and opportunities in the digital landscape.
              </p>
            </div>
            
            <div className={`rounded-2xl p-8 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
            }`}>
              <Globe className="w-12 h-12 text-[#218EF2] mb-6" />
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Vision</h2>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                To be the leading software development partner for businesses worldwide, recognized for our 
                technical excellence, innovative solutions, and unwavering commitment to client success in 
                the rapidly evolving digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

     

      {/* Core Values */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Core 
              <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Values</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group">
                  <div className={`rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-105 text-center ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:border-[#218EF2]/50'
                      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                  }`}>
                    <div className="w-16 h-16 bg-gradient-to-r from-[#218EF2] to-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                    <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className={`py-20 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-blue-50'}`}>
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Our <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent">Technology Stack</span>
          </h2>
          <p className={`text-lg mb-12 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>We use the latest and most reliable technologies to deliver robust, scalable, and innovative solutions.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Frontend */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-[#218EF2] text-center">Frontend</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {["React", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "Next.js"].map((tech) => (
                  <span key={tech} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-200 hover:bg-[#218EF2] hover:text-white' : 'bg-blue-100 text-blue-900 hover:bg-blue-600 hover:text-white'}`}>{tech}</span>
                ))}
              </div>
            </div>
            {/* Backend */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-[#218EF2] text-center">Backend</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {["Node.js", "Python", "Java", ".NET", "Express", "Django", "Spring Boot"].map((tech) => (
                  <span key={tech} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-200 hover:bg-[#218EF2] hover:text-white' : 'bg-blue-100 text-blue-900 hover:bg-blue-600 hover:text-white'}`}>{tech}</span>
                ))}
              </div>
            </div>
            {/* Mobile & Cloud */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-[#218EF2] text-center">Mobile & Cloud</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {["React Native", "Flutter", "AWS", "Azure", "Docker", "Kubernetes"].map((tech) => (
                  <span key={tech} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-200 hover:bg-[#218EF2] hover:text-white' : 'bg-blue-100 text-blue-900 hover:bg-blue-600 hover:text-white'}`}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 transition-colors duration-300 relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-900/30 via-gray-900 to-black' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'}`}>
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/4 w-96 h-96 ${isDark ? 'bg-[#218EF2]/15' : 'bg-blue-200/30'} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${isDark ? 'bg-blue-600/10' : 'bg-blue-300/20'} rounded-full blur-3xl`}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Work 
            <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Together?</span>
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}> 
            Let's discuss your project and create something amazing together. Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to={'/contact'}>
            <button className={`group bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 ${isDark ? 'text-white' : 'text-white'}`}>
              <Rocket className="w-5 h-5" />
              <span>Start Your Project</span>
            </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;