import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react';
import { BASE_API_URL } from '../main';

interface BlogPost {
  _id: string;
  userId: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  featured: boolean;
  category: string;
  slug: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${BASE_API_URL}/api/post/getpost/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch blog post');
        return res.json();
      })
      .then(data => {
        setPost(data.post);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading blog post...</div>;
  }
  if (error || !post) {
    return <div className="text-center py-20 text-red-500">{error || 'Blog post not found.'}</div>;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-3xl mx-auto px-4 lg:px-0 py-16">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center mb-8 text-[#218EF2] hover:text-blue-500 font-medium transition-all duration-300`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Blog
        </button>
        <div className="rounded-2xl overflow-hidden mb-8">
          <img src={post.image} alt={post.title} className="w-full h-80 object-cover" />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags && post.tags.map(tag => (
            <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>{tag}</span>
          ))}
          {post.featured && (
            <span className="bg-[#218EF2] text-white px-3 py-1 rounded-full text-xs font-medium">Featured</span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-800 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{post.category}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className={`flex items-center space-x-6 mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center"><User className="w-4 h-4 mr-1" />{post.author || post.userId}</div>
          <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{post.date ? new Date(post.date).toLocaleDateString() : ''}</div>
          <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{post.readTime}</div>
        </div>
        {post.excerpt && <p className={`mb-8 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{post.excerpt}</p>}
        <div className={`prose max-w-none break-words whitespace-pre-line ${isDark ? 'prose-invert' : ''}`}>{post.content}</div>
      </div>
    </div>
  );
};

export default BlogDetail; 