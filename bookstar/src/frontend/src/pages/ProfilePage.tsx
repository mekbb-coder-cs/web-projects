import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600 mt-2">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-outline"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm">Rating</p>
              <p className="text-3xl font-bold text-primary-600">{user.rating_avg || 'N/A'}</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Account Type</p>
              <p className="text-lg font-bold text-gray-900">{user.roles.join(', ')}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            {user.roles.includes('taker') && (
              <div className="card mb-4">
                <h3 className="text-lg font-bold text-gray-900">My Orders</h3>
                <p className="text-gray-600 mt-2">No orders yet</p>
              </div>
            )}
            
            {user.roles.includes('sharer') && (
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900">My Listings</h3>
                <p className="text-gray-600 mt-2">No listings yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
