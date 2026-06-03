import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import type { RegisterRequest, AuthResponse } from '../types';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [roles, setRoles] = useState<('sharer' | 'taker')[]>(['taker']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleRole = (role: 'sharer' | 'taker') => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (roles.length === 0) {
      setError('Please select at least one role');
      setLoading(false);
      return;
    }

    try {
      const payload: RegisterRequest = { email, password, name, roles };
      const response = await apiClient.post<AuthResponse>('/auth/register', payload);
      
      if (response.data) {
        apiClient.setToken(response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BookStar</h1>
        <p className="text-gray-600 mb-8">Create your account</p>

        {error && (
          <div className="bg-error-50 border border-error-500 text-error-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Account Type</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={roles.includes('taker')}
                  onChange={() => toggleRole('taker')}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="ml-2 text-gray-700">I want to book sessions (Taker)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={roles.includes('sharer')}
                  onChange={() => toggleRole('sharer')}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="ml-2 text-gray-700">I want to share sessions (Sharer)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
