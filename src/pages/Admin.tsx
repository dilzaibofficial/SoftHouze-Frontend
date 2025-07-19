import React, { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Eye, 
  Calendar,
  Tag,
  Globe,
  Image as ImageIcon,
  FileText,
  Briefcase,
  Github
} from 'lucide-react';
import { GithubOutlined } from '@ant-design/icons';
import { BASE_API_URL } from '../main';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  category?: string;
  createdAt?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  date: string;
  userId?: string;
}

const Admin: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects'>('blogs');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPost | Project | null>(null);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    readTime: '',
    tags: '',
    thumbnail: '',
    featured: false,
    category: ''
  });

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    thumbnail: '',
    liveUrl: '',
    githubUrl: '',
    technologies: '',
  });

  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [errorBlogs, setErrorBlogs] = useState<string | null>(null);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Helper to fetch blogs
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    setErrorBlogs(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/post/getposts`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch blog posts');
      setBlogs(data.posts || []);
    } catch (err: any) {
      setErrorBlogs(err.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Helper to fetch projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    setErrorProjects(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/project/getprojects`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
      setProjects(data || []);
    } catch (err: any) {
      setErrorProjects(err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);
  useEffect(() => { fetchProjects(); }, []);

  const saveBlog = async () => {
    setLoadingBlogs(true);
    setErrorBlogs(null);
    setSuccessMessage(null);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem
        ? `${BASE_API_URL}/api/post/updatepost/${(editingItem as any)?._id}`
        : `${BASE_API_URL}/api/post/create`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: blogForm.title,
          excerpt: blogForm.excerpt,
          content: blogForm.content,
          author: blogForm.author,
          date: editingItem ? (editingItem as any)?.date : new Date().toISOString().split('T')[0],
          readTime: blogForm.readTime,
          tags: blogForm.tags.split(',').map(tag => tag.trim()),
          image: blogForm.thumbnail,
          category: blogForm.category || 'uncategorized',
          featured: blogForm.featured
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save blog post');
      setSuccessMessage(editingItem ? 'Blog post updated!' : 'Blog post created!');
      resetBlogForm();
      fetchBlogs();
    } catch (err: any) {
      setErrorBlogs(err.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const deleteBlog = async (_id: any, userId: any) => {
    setLoadingBlogs(true);
    setErrorBlogs(null);
    setSuccessMessage(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/post/deletepost/${_id}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete blog post');
      setSuccessMessage('Blog post deleted!');
      fetchBlogs();
    } catch (err: any) {
      setErrorBlogs(err.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const editBlog = (blog: BlogPost) => {
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      readTime: blog.readTime,
      tags: (blog.tags || []).join(', '),
      thumbnail: blog.thumbnail,
      featured: blog.featured,
      category: blog.category || ''
    });
    setEditingItem(blog);
    setIsEditing(true);
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      readTime: '',
      tags: '',
      thumbnail: '',
      featured: false,
      category: ''
    });
    setEditingItem(null);
    setIsEditing(false);
  };

  const saveProject = async () => {
    setLoadingProjects(true);
    setErrorProjects(null);
    setSuccessMessage(null);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem
        ? `${BASE_API_URL}/api/project/updateproject/${(editingItem as any)?._id}/${(editingItem as any)?.userId}`
        : `${BASE_API_URL}/api/project/create`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: projectForm.title,
          description: projectForm.description,
          thumbnail: projectForm.thumbnail,
          liveUrl: projectForm.liveUrl,
          githubUrl: projectForm.githubUrl,
          technologies: projectForm.technologies.split(',').map(tech => tech.trim()),
          date: editingItem ? (editingItem as any)?.date : new Date().toISOString().split('T')[0],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save project');
      setSuccessMessage(editingItem ? 'Project updated!' : 'Project created!');
      resetProjectForm();
      fetchProjects();
    } catch (err: any) {
      setErrorProjects(err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  const deleteProject = async (_id: any, userId: any) => {
    setLoadingProjects(true);
    setErrorProjects(null);
    setSuccessMessage(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/project/deleteproject/${_id}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete project');
      setSuccessMessage('Project deleted!');
      fetchProjects();
    } catch (err: any) {
      setErrorProjects(err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  const editProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      thumbnail: project.thumbnail,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl || '',
      technologies: (project.technologies || []).join(', '),
    });
    setEditingItem(project);
    setIsEditing(true);
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      thumbnail: '',
      liveUrl: '',
      githubUrl: '',
      technologies: '',
    });
    setEditingItem(null);
    setIsEditing(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Header */}
      <div className={`border-b py-6 transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800 border-blue-900/30' 
          : 'bg-gray-50 border-blue-200/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold">
            Admin 
            <span className="bg-gradient-to-r from-[#218EF2] to-blue-600 bg-clip-text text-transparent"> Dashboard</span>
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your blog posts and portfolio projects</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('blogs')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'blogs'
                  ? 'border-[#218EF2] text-[#218EF2]'
                  : isDark 
                    ? 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Blog Posts ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'projects'
                  ? 'border-[#218EF2] text-[#218EF2]'
                  : isDark 
                    ? 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Briefcase className="w-5 h-5 inline mr-2" />
              Projects ({projects.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Add New Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-white"
          >
            <Plus className="w-5 h-5" />
            <span>Add New {activeTab === 'blogs' ? 'Blog Post' : 'Project'}</span>
          </button>
        </div>

        {/* Blog Posts Tab */}
        {activeTab === 'blogs' && (
          <div>
            {isEditing ? (
              /* Blog Form */
              <div className={`rounded-2xl p-8 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {editingItem ? 'Edit Blog Post' : 'Add New Blog Post'}
                  </h2>
                  <button
                    onClick={resetBlogForm}
                    className={`transition-colors ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Title *</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Enter blog title"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Author *</label>
                      <input
                        type="text"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Author name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Read Time *</label>
                      <input
                        type="text"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="e.g., 5 min read"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Tags (comma separated) *</label>
                      <input
                        type="text"
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="React, JavaScript, Web Development"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Thumbnail URL *</label>
                      <input
                        type="url"
                        value={blogForm.thumbnail}
                        onChange={(e) => setBlogForm({...blogForm, thumbnail: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                      <input
                        type="text"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Enter category (optional)"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={blogForm.featured}
                        onChange={(e) => setBlogForm({...blogForm, featured: e.target.checked})}
                        className={`w-4 h-4 rounded focus:ring-[#218EF2] ${
                          isDark 
                            ? 'text-[#218EF2] bg-gray-700 border-gray-600'
                            : 'text-[#218EF2] bg-white border-gray-300'
                        }`}
                      />
                      <label htmlFor="featured" className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Featured Post
                      </label>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Excerpt *</label>
                      <textarea
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none resize-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Brief description of the blog post"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Content *</label>
                      <textarea
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                        rows={12}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none resize-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Full blog post content (supports markdown)"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={saveBlog}
                    className="bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-white"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingItem ? 'Update' : 'Save'} Blog Post</span>
                  </button>
                  <button
                    onClick={resetBlogForm}
                    className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Blog List */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadingBlogs ? (
                  <p>Loading blog posts...</p>
                ) : errorBlogs ? (
                  <p className="text-red-500">{errorBlogs}</p>
                ) : blogs.length === 0 ? (
                  <p>No blog posts found. Add a new one!</p>
                ) : (
                  blogs.map((blog) => (
                    <div key={(blog as any)._id} className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-[#218EF2]/50'
                        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                    }`}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={(blog as any).image} 
                          alt={blog.title}
                          className="w-full h-48 object-cover"
                        />
                        {blog.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#218EF2] text-white px-3 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-800 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{(blog as any).category}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{blog.title}</h3>
                        <p className={`text-sm mb-3 break-words ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{
                          blog.excerpt && blog.excerpt.length > 120
                            ? blog.excerpt.slice(0, 120) + '...'
                            : blog.excerpt
                        }</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(blog.tags || []).map((tag) => (
                            <span key={tag} className={`px-2 py-1 rounded-md text-xs font-medium ${
                              isDark 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}> 
                          <span>{blog.author}</span>
                          <span>{(blog as any).createdAt ? new Date((blog as any).createdAt).toLocaleDateString() : 'No date'}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <button
                            onClick={() => editBlog(blog)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBlog((blog as any)._id, (blog as any).userId)}
                            className="text-[#218EF2] hover:text-blue-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            {isEditing ? (
              /* Project Form */
              <div className={`rounded-2xl p-8 transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {editingItem ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button
                    onClick={resetProjectForm}
                    className={`transition-colors ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Project Title *</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Enter project title"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Technologies (comma separated) *</label>
                      <input
                        type="text"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Live URL *</label>
                      <input
                        type="url"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="https://project-demo.com"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>GitHub URL (optional)</label>
                      <input
                        type="url"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Thumbnail URL *</label>
                      <input
                        type="url"
                        value={projectForm.thumbnail}
                        onChange={(e) => setProjectForm({...projectForm, thumbnail: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description *</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        rows={8}
                        className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none resize-none ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]'
                            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'
                        }`}
                        placeholder="Detailed description of the project"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={saveProject}
                    className="bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-white"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingItem ? 'Update' : 'Save'} Project</span>
                  </button>
                  <button
                    onClick={resetProjectForm}
                    className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Project List */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadingProjects ? (
                  <p>Loading projects...</p>
                ) : errorProjects ? (
                  <p className="text-red-500">{errorProjects}</p>
                ) : projects.length === 0 ? (
                  <p>No projects found. Add a new one!</p>
                ) : (
                  projects.map((project) => (
                    <div key={(project as any)._id} className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 hover:border-[#218EF2]/50'
                        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#218EF2]/50 shadow-lg'
                    }`}>
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-[#218EF2]/20 text-[#218EF2] px-2 py-1 rounded-full text-xs font-medium">
                            Project
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => editProject(project)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProject((project as any)._id, (project as any).userId)}
                              className="text-[#218EF2] hover:text-blue-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                        <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className={`px-2 py-1 rounded text-xs ${
                              isDark 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          <span>{project.date && !isNaN(Date.parse(project.date)) ? new Date(project.date).toLocaleDateString() : 'No date'}</span>
                          <div className="flex space-x-2">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#218EF2] hover:text-blue-500">
                              <Globe className="w-4 h-4" />
                            </a>
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`transition-colors ${
                                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                              }`}>
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;