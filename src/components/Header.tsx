import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { Menu, X, Code, Sun, Moon, Home as HomeIcon, User, Briefcase, FileText, Mail } from 'lucide-react';

const menuItems = [
  { key: 'home', label: 'Home', path: '/', icon: HomeIcon },
  { key: 'about', label: 'About', path: '/about', icon: User },
  { key: 'portfolio', label: 'Portfolio', path: '/portfolio', icon: Briefcase },
  { key: 'blog', label: 'Blog', path: '/blog', icon: FileText },
  { key: 'contact', label: 'Contact', path: '/contact', icon: Mail },
];

const Header: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/90 border-blue-900/50' 
        : 'bg-white/90 border-blue-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-xl" />
            <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent">
              SOFT HOUZE
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? `bg-gradient-to-r from-[#218EF2]/20 to-blue-600/20 text-[#218EF2] border border-[#218EF2]/30`
                      : isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`lg:hidden backdrop-blur-md border-t transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-900/95 border-blue-900/50' 
            : 'bg-white/95 border-blue-200/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? `bg-gradient-to-r from-[#218EF2]/20 to-blue-600/20 text-[#218EF2] border border-[#218EF2]/30`
                        : isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 w-full ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 