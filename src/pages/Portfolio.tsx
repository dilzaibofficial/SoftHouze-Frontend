import React, { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { ExternalLink, Github, Calendar, Tag, Eye, Code, Smartphone, Globe, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BASE_API_URL } from '../main';

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  date: string;
}

const Portfolio: React.FC = () => {
  const { isDark } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${BASE_API_URL}/api/project/getprojects`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then(data => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


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
            Our 
            <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Portfolio</span>
          </h1>
          <p className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explore our latest projects and see how we've helped businesses transform their ideas 
            into powerful digital solutions that drive growth and innovation.
          </p>
        </div>
      </section>


      {/* Projects Grid */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <Code className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading Projects...</h3>
              <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Please wait while we fetch the projects.</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <Code className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Error: {error}</h3>
              <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Failed to load projects. Please try again later.</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <Code className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No Projects Found</h3>
              <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>No projects available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                return (
                  <div key={project._id} className="group">
                    <div className={`rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 ${
                      isDark 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-[#218EF2]/50'
                        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                    }`}>
                      {/* Project Thumbnail */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`text-xl font-bold transition-colors ${
                            isDark 
                              ? 'text-white group-hover:text-[#218EF2]' 
                              : 'text-gray-900 group-hover:text-[#218EF2]'
                          }`}>
                            {project.title}
                          </h3>
                          <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(project.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <p className={`mb-4 leading-relaxed line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className={`px-2 py-1 rounded-md text-xs font-medium ${
                              isDark 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="bg-[#218EF2] text-white px-2 py-1 rounded-md text-xs font-medium">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                         
                          
                          {project?.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                                isDark 
                                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                              }`}
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                              isDark 
                                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
            Ready to Start 
            <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Your Project?</span>
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's discuss your ideas and create something amazing together. Our team is ready to bring your vision to life.
          </p>
          <Link to={'/contact'}>
          <button className="group bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 mx-auto text-white">
            <Code className="w-5 h-5" />
            <span>Start Your Project</span>
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;