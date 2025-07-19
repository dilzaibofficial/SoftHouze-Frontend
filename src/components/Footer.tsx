import React from 'react';
import { useTheme } from '../App';
import { Code, Smartphone, Cloud, Brain } from 'lucide-react';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <footer className={`border-t py-12 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900 border-blue-900/30' 
        : 'bg-gray-50 border-blue-200/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent">
                SOFT HOUZE
              </span>
            </div>
            <p className={`mb-4 max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}> 
              Transforming ideas into powerful digital solutions. We specialize in web development, 
              mobile apps, cloud services, and AI-powered systems.
            </p>
            <div className="flex space-x-4">
              {[Code, Smartphone, Cloud, Brain].map((Icon, index) => (
                <div key={index} className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#218EF2] transition-colors ${
                  isDark ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  <Icon className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
              ))}
            </div>
          </div>
          {/* Services */}
          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Services</h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className={`transition-colors  ${
                isDark ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Web Development</li>
              <li className={`transition-colors  ${
                isDark ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Mobile Apps</li>
              <li className={`transition-colors  ${
                isDark ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Cloud Solutions</li>
              <li className={`transition-colors  ${
                isDark ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>AI Integration</li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact</h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>hello@softhouze.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>
        <div className={`border-t mt-8 pt-8 text-center transition-colors duration-300 ${
          isDark 
            ? 'border-blue-900/30 text-gray-400' 
            : 'border-blue-200/30 text-gray-600'
        }`}>
          <p>&copy; {new Date().getFullYear()} Soft Houze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 