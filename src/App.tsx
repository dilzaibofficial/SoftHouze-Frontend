import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, Code, Smartphone, Cloud, Brain, Home as HomeIcon, User, Briefcase, FileText, Mail, Sun, Moon } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

const menuItems = [
  { key: 'home', label: 'Home', path: '/', icon: HomeIcon },
  { key: 'about', label: 'About', path: '/about', icon: User },
  { key: 'portfolio', label: 'Portfolio', path: '/portfolio', icon: Briefcase },
  { key: 'blog', label: 'Blog', path: '/blog', icon: FileText },
  { key: 'contact', label: 'Contact', path: '/contact', icon: Mail },
];

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  if (localStorage.getItem('isAdmin') !== 'true') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppLayout() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
        </Routes>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;