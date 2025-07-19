import React, { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { Calendar, User, Clock, Tag, ArrowRight, Search, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BASE_API_URL } from '../main';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  slug: string; // Added slug
  category: string; // Added category
  userId: string; // Added userId
  image: string; // Added image
  createdAt: string; // Added createdAt
}

const Blog: React.FC = () => {
  const { isDark } = useTheme();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${BASE_API_URL}/api/post/getposts`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch blog posts');
        return res.json();
      })
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Get all unique tags
  const allTags = ['All', ...Array.from(new Set(posts.flatMap(post => post.tags)))];

  // Filter posts based on search and tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Remove featured/regular split
  // const featuredPosts = filteredPosts.filter(post => post.featured);
  // const regularPosts = filteredPosts.filter(post => !post.featured);

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
            <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Blog</span>
          </h1>
          <p className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Stay updated with the latest insights, trends, and best practices in software development, 
            technology, and digital innovation from our expert team.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className={`py-12 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl transition-colors focus:outline-none ${
                  isDark 
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      {loading ? (
        <div className="text-center py-20">
          <p>Loading articles...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">
          Error: {error}
        </div>
      ) : filteredPosts.length === 0 ? (
        <section className={`py-20 transition-colors duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center mb-12">
              <BookOpen className="w-8 h-8 text-[#218EF2] mr-3" />
              <h2 className="text-3xl font-bold">
                Latest 
                <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Articles</span>
              </h2>
            </div>
            <div className="text-center py-20">
              <BookOpen className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No Articles Found</h3>
              <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>No articles match your current search or filter criteria.</p>
            </div>
          </div>
        </section>
      ) : (
        <section className={`py-20 transition-colors duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center mb-12">
              <BookOpen className="w-8 h-8 text-[#218EF2] mr-3" />
              <h2 className="text-3xl font-bold">
                Latest 
                <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Articles</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post._id} className="group">
                  <div className={`rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-[#218EF2]/50'
                      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                  }`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.thumbnail || post.image} 
                        alt={post.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {post.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#218EF2] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-800 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{post.category}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className={`flex items-center space-x-4 mb-4 text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author || post.userId}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                        isDark 
                          ? 'text-white group-hover:text-[#218EF2]' 
                          : 'text-gray-900 group-hover:text-[#218EF2]'
                      }`}>
                        {post.title}
                      </h3>
                      
                      <p className={`mb-4 leading-relaxed break-words ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{
                        post.excerpt && post.excerpt.length > 120
                          ? post.excerpt.slice(0, 120) + '...'
                          : post.excerpt
                      }</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {(post.tags || []).map((tag) => (
                          <span key={tag} className={`px-2 py-1 rounded-md text-xs font-medium ${
                            isDark 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link to={`/blog/${post._id}`} className="flex items-center space-x-2 text-[#218EF2] hover:text-blue-500 font-medium group-hover:translate-x-2 transition-all duration-300">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Blog;