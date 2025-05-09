import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    bio: '',
    avatar: '',
    theme: 'default',
    links: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newLink, setNewLink] = useState({
    platform: '',
    url: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me/profile');
      setProfile({
        bio: res.data.bio || '',
        avatar: res.data.avatar || '',
        theme: res.data.theme || 'default',
        links: res.data.links || []
      });
      setError('');
    } catch (err) {
      setError('Failed to load profile: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleNewLinkChange = (field, value) => {
    setNewLink(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const addLink = () => {
    if (!newLink.platform || !newLink.url) {
      setError('Please enter both platform name and URL');
      return;
    }

    const newLinkEntry = {
      title: newLink.platform,
      url: newLink.url,
      active: true
    };

    setProfile(prev => ({
      ...prev,
      links: [...prev.links, newLinkEntry]
    }));
    
    setNewLink({ platform: '', url: '' });
    setError('');
    setSuccess('');
  };

  const removeLink = (index) => {
    const links = profile.links.filter((_, i) => i !== index);
    setProfile(prev => ({ ...prev, links }));
    setError('');
    setSuccess('');
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validate links
      const invalidLinks = profile.links.filter(link => !link.title || !link.url);
      if (invalidLinks.length > 0) {
        throw new Error('All links must have both platform name and URL');
      }

      await axios.post('http://localhost:5000/api/users/update', profile);
      setSuccess('Profile saved successfully!');
    } catch (err) {
      setError('Failed to save profile: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading && !profile.bio && !profile.avatar && profile.links.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => navigate(`/${user.username}`)}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-fade-in">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 animate-fade-in">
              {success}
            </div>
          )}

          <div className="space-y-8">
            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 group-hover:text-purple-600 transition-colors duration-300">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                rows="3"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 group-hover:text-purple-600 transition-colors duration-300">Avatar URL</label>
              <input
                type="text"
                value={profile.avatar}
                onChange={(e) => handleChange('avatar', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="https://example.com/your-avatar.jpg"
              />
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 group-hover:text-purple-600 transition-colors duration-300">Theme</label>
              <select
                value={profile.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="default">Default</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Social Links</h2>
              </div>

              <div className="mb-6 bg-gray-50 p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Platform Name</label>
                    <input
                      type="text"
                      value={newLink.platform}
                      onChange={(e) => handleNewLinkChange('platform', e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., WhatsApp, Facebook, Instagram"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Platform URL</label>
                    <input
                      type="text"
                      value={newLink.url}
                      onChange={(e) => handleNewLinkChange('url', e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter the full URL"
                    />
                  </div>
                </div>
                <button
                  onClick={addLink}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Add Social Link
                </button>
              </div>

              <div className="space-y-4">
                {profile.links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg group hover:bg-purple-50 transition-all duration-300">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={link.title}
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
                        readOnly
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={link.url}
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
                        readOnly
                      />
                    </div>
                    <button
                      onClick={() => removeLink(index)}
                      className="bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={saveProfile}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 