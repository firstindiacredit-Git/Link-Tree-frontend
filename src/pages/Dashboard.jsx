import React, { useState, useEffect, useRef } from 'react';
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const dropdownRef = useRef(null);
  const [editingLink, setEditingLink] = useState(null);
  const [editLinkData, setEditLinkData] = useState({ title: '', url: '' });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Theme color logic (copied from Profile.jsx)
  const themes = {
    default: {
      background: 'bg-gradient-to-br from-purple-600 to-blue-500',
      text: 'text-white',
      button: 'bg-white text-purple-600 hover:bg-opacity-90 transform hover:scale-105',
      container: 'bg-white/10 backdrop-blur-md'
    },
    dark: {
      background: 'bg-gray-700',
      text: 'text-white',
      button: 'bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105',
      container: 'bg-gray-800/50 backdrop-blur-md'
    },
    light: {
      background: 'bg-gray-200',
      text: 'text-gray-900',
      button: 'bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105',
      container: 'bg-gray-50/80 backdrop-blur-md'
    }
  };

  useEffect(() => {
    fetchProfile();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('https://link-tree-backend-theta.vercel.app/api/users/me/profile');
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

  const addLink = async () => {
    if (!newLink.platform || !newLink.url) {
      setError('Please enter both platform name and URL');
      return;
    }

    // Validate URL format
    try {
      new URL(newLink.url);
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

    const newLinkEntry = {
      title: newLink.platform,
      url: newLink.url,
      active: true
    };

      // Create a new array with the new link
      const updatedLinks = [...profile.links, newLinkEntry];

      // Send only the links array to update
      const response = await axios.post('https://link-tree-backend-theta.vercel.app/api/users/update', {
        links: updatedLinks
      });

      // Update the profile with the response data
    setProfile(prev => ({
      ...prev,
        links: response.data.links
    }));
    
      // Clear the form
    setNewLink({ platform: '', url: '' });
      setSuccess('Link added successfully!');
    } catch (err) {
      console.error('Error adding link:', err);
      setError('Failed to add link: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const removeLink = async (index) => {
    try {
      setLoading(true);
    setError('');
    setSuccess('');

      // Create a new array without the link to be removed
      const updatedLinks = profile.links.filter((_, i) => i !== index);

      // Send only the links array to update
      const response = await axios.post('https://link-tree-backend-theta.vercel.app/api/users/update', {
        links: updatedLinks
      });

      // Update the profile with the response data
      setProfile(prev => ({
        ...prev,
        links: response.data.links
      }));

      setSuccess('Link removed successfully!');
    } catch (err) {
      console.error('Error removing link:', err);
      setError('Failed to remove link: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const invalidLinks = profile.links.filter(link => !link.title || !link.url);
      if (invalidLinks.length > 0) {
        throw new Error('All links must have both platform name and URL');
      }

      const response = await axios.post('https://link-tree-backend-theta.vercel.app/api/users/update', {
        bio: profile.bio,
        theme: profile.theme,
        links: profile.links
      });

      // Update the profile state with the response data
      setProfile(prev => ({
        ...prev,
        bio: response.data.bio,
        theme: response.data.theme,
        links: response.data.links
      }));

      setSuccess('Profile saved successfully!');
      setShowUpdateModal(false);
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

  const getFaviconUrl = (url) => {
    try {
      const urlObject = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${urlObject.hostname}&sz=128`;
    } catch (e) {
      return null;
    }
  };

  // In the right-side profile preview, use the selected theme
  const theme = themes[profile.theme || 'default'];

  const handleEditLink = (index) => {
    const link = profile.links[index];
    setEditingLink(index);
    setEditLinkData({ title: link.title, url: link.url });
  };

  const handleEditLinkChange = (field, value) => {
    setEditLinkData(prev => ({ ...prev, [field]: value }));
  };

  const saveEditLink = async () => {
    if (!editLinkData.title || !editLinkData.url) {
      setError('Please enter both platform name and URL');
      return;
    }

    // Validate URL format
    try {
      new URL(editLinkData.url);
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Create a new array with the updated link
      const updatedLinks = [...profile.links];
      updatedLinks[editingLink] = {
        ...updatedLinks[editingLink],
        title: editLinkData.title,
        url: editLinkData.url
      };

      // Send only the links array to update
      const response = await axios.post('https://link-tree-backend-theta.vercel.app/api/users/update', {
        links: updatedLinks
      });

      // Update the profile with the response data
      setProfile(prev => ({
        ...prev,
        links: response.data.links
      }));

      setEditingLink(null);
      setEditLinkData({ title: '', url: '' });
      setSuccess('Link updated successfully!');
    } catch (err) {
      console.error('Error updating link:', err);
      setError('Failed to update link: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingLink(null);
    setEditLinkData({ title: '', url: '' });
  };

  const toggleLink = async (index) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Create a new array with the toggled link
      const updatedLinks = [...profile.links];
      updatedLinks[index] = {
        ...updatedLinks[index],
        active: !updatedLinks[index].active
      };

      // Send only the links array to update
      const response = await axios.post('https://link-tree-backend-theta.vercel.app/api/users/update', {
        links: updatedLinks
      });

      // Update the profile with the response data
      setProfile(prev => ({
        ...prev,
        links: response.data.links
      }));

      setSuccess(`Link ${updatedLinks[index].active ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      console.error('Error toggling link:', err);
      setError('Failed to update link status: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      setError('');
      setSuccess('');

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.post('https://link-tree-backend-theta.vercel.app/api/users/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProfile(prev => ({ ...prev, avatar: response.data.avatar }));
      setSuccess('Avatar updated successfully!');
    } catch (err) {
      setError('Failed to upload avatar: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Helper for public profile URL
  const publicProfileUrl = `${window.location.origin}/${user.username}`;

  if (loading && !profile.bio && !profile.avatar && profile.links.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Premium Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
              <div className="h-6 w-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">Welcome back, {user.username}</span>
            </div>
            
            {/* Premium Avatar and Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 focus:outline-none group"
              >
                <div className="relative">
                  <img
                    src={profile.avatar || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-gray-700 font-medium">{user.username}</span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Premium Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-10 border border-gray-100 transform transition-all duration-300 origin-top-right">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/${user.username}`);
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUpdateModal(true);
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Update Profile</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
              </button>
                </div>
              )}
            </div>
          </div>
            </div>
      </header>

      {/* Main Content with padding-top to account for fixed header */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            {/* Left Column - Social Links */}
            <div className="lg:col-span-2">
              {/* Linktree Live Box */}
              <div className="mb-6 flex items-center justify-between bg-blue-100 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <span className="font-semibold text-gray-700">Your Linktree is live:</span>
                  <a
                    href={publicProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 underline text-blue-700 hover:text-blue-900"
                  >
                    {publicProfileUrl}
                  </a>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(publicProfileUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="bg-white font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition border border-gray-200"
                >
                  {copied ? 'Copied!' : 'Copy your Linktree URL'}
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Social Links
                  </h2>
                  <span className="text-sm text-gray-500">{profile.links.length} links</span>
            </div>

                {/* Add New Link Form */}
                <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Link</h3>
                  <div className="grid grid-cols-1 gap-4">
            <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                    <input
                      type="text"
                      value={newLink.platform}
                      onChange={(e) => handleNewLinkChange('platform', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., YouTube, Instagram, Twitter"
                    />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform URL</label>
                    <input
                      type="text"
                      value={newLink.url}
                      onChange={(e) => handleNewLinkChange('url', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="https://www.example.com/"
                    />
                  </div>
                </div>
                <button
                  onClick={addLink}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Add Social Link
                </button>
              </div>

                {/* Links List */}
              <div className="space-y-4">
                  {profile.links && profile.links.length > 0 ? (
                    profile.links.map((link, idx) => (
                      <div key={idx} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="p-4 flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              {editingLink === idx ? (
                                <div className="space-y-3 w-full">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                                    <input
                                      type="text"
                                      value={editLinkData.title}
                                      onChange={(e) => handleEditLinkChange('title', e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                      placeholder="Enter platform name"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform URL</label>
                      <input
                        type="text"
                                      value={editLinkData.url}
                                      onChange={(e) => handleEditLinkChange('url', e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                      placeholder="Enter platform URL"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={saveEditLink}
                                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={cancelEdit}
                                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">{link.title}</span>
                                    <button 
                                      onClick={() => handleEditLink(idx)}
                                      className="text-gray-400 hover:text-gray-600"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                      </svg>
                                    </button>
                                  </div>
                                  <span className="text-sm text-gray-500">{link.url}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => toggleLink(idx)}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                link.active ? 'bg-green-500' : 'bg-gray-200'
                              }`}
                            >
                              <span className={`${
                                link.active ? 'translate-x-5' : 'translate-x-0'
                              } inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`}></span>
                            </button>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between bg-gray-50 rounded-b-xl">
                          <div className="flex items-center gap-4">
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 bg-white rounded-lg shadow-sm hover:shadow transition-all duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3h6m-6 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 bg-white rounded-lg shadow-sm hover:shadow transition-all duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                              </svg>
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 bg-white rounded-lg shadow-sm hover:shadow transition-all duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => removeLink(idx)}
                              className="p-1.5 text-red-400 hover:text-red-600 bg-white rounded-lg shadow-sm hover:shadow transition-all duration-300"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="text-sm text-gray-500">0 clicks</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <p className="text-gray-500">No links added yet. Add your first social link above!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Fixed Profile Preview */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div
                  className={`w-full max-h-[560px] rounded-[40px] shadow-2xl flex flex-col items-center relative border-4 border-black overflow-y-auto ${theme.background}`}
                >
                  {/* Avatar */}
                  <div className="mt-10 mb-4">
                    <div 
                      className="w-24 h-24 rounded-full border-4 border-white mx-auto flex items-center justify-center overflow-hidden shadow-lg cursor-pointer group relative"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {profile.avatar ? (
                        <>
                          <img
                            src={profile.avatar}
                            alt={user.username}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-sm font-medium">Change Photo</span>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-400 text-4xl">?</span>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    {uploadingAvatar && (
                      <div className="mt-2 text-center">
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                        <span className="ml-2 text-sm text-gray-500">Uploading...</span>
                      </div>
                    )}
                  </div>
                  {/* Username */}
                  <h1 className={`text-xl font-bold mb-1 ${theme.text}`}>@{user.username}</h1>
                  {/* Bio */}
                  <p className={`text-sm mb-4 text-center px-4 ${theme.text}`}>{profile.bio || 'No bio provided.'}</p>

                  {/* Links */}
                  <div className="w-full flex flex-col gap-4 items-center py-2">
                    {profile.links && profile.links.length > 0 ? (
                      profile.links
                        .filter(link => link.active)
                        .map((link, idx) => (
                          <div key={idx} className="w-[90%] flex items-center bg-white rounded-[32px] shadow p-3 px-5 transition-all duration-300 group hover:shadow-lg">
                            {getFaviconUrl(link.url) ? (
                              <img
                                src={getFaviconUrl(link.url)}
                                alt={link.title}
                                className="w-8 h-8 rounded-full object-contain mr-3"
                                onError={e => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center" />
                            )}
                            <span className="flex-1 text-[#222] font-medium text-base truncate">
                              {link.title}
                            </span>
                            <span className="ml-2 text-gray-400 text-2xl font-bold select-none">&#8230;</span>
                          </div>
                        ))
                    ) : (
                      <div className="text-gray-400 text-center">No links added yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Update Profile
              </h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Avatar Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-20 h-20 rounded-full border-2 border-gray-200 overflow-hidden cursor-pointer group relative"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profile.avatar ? (
                      <>
                        <img
                          src={profile.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-xs font-medium">Change</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      {profile.avatar ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    {uploadingAvatar && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent mr-2"></div>
                        Uploading...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  rows="3"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={profile.theme}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="default">Default</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
            </div>

              <div className="flex space-x-4">
            <button
              onClick={saveProfile}
              disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 