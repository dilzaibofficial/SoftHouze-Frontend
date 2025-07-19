import React, { useState } from 'react';
import { useTheme } from '../App';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../main';

const Login: React.FC = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // Store login state (for demo, just a flag)
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <form onSubmit={handleSubmit} className={`w-full max-w-md p-8 rounded-2xl shadow-lg border transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="admin@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl transition-colors focus:outline-none ${isDark ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-[#218EF2]' : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#218EF2]'}`}
            placeholder="Your password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#218EF2] to-blue-600 hover:from-blue-500 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login; 