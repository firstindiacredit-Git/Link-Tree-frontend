import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const socialIcons = {
  whatsapp: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/>
    </svg>
  )
};

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showProfileShare, setShowProfileShare] = useState(false);
  const [showInputIndex, setShowInputIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  useEffect(() => {
    if (user?.username) {
      fetchProfile();
    }
  }, [user?.theme]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://link-tree-backend-theta.vercel.app/api/users/${username}`);
      setUser(res.data);
      setError('');
    } catch (err) {
      setError('Profile not found');
    } finally {
      setLoading(false);
    }
  };

  const getFaviconUrl = (url) => {
    try {
      const urlObject = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${urlObject.hostname}&sz=128`;
    } catch (e) {
      return null;
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-2">Profile Not Found</p>
        <p className="text-white/80">The profile you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  const theme = themes[user.theme || 'default'];

  const threeDotIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-400 hover:text-gray-700 cursor-pointer">
      <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
    </svg>
  );

  const profileUrl = `${window.location.origin}/profile/${username}`;

  // Only one popup at a time
  const isAnyPopupOpen = showProfileShare || showInputIndex !== null;

  return (
    <div className={`min-h-screen ${theme.background} py-12 px-4 transition-colors duration-300`}>
      <div className="max-w-md mx-auto">
        {/* Overlay for blur when any popup is open */}
        {isAnyPopupOpen && (
          <div
            className="fixed inset-0 bg-black/20 "
            onClick={() => { setShowProfileShare(false); setShowInputIndex(null); setShowMoreOptions(false); }}
          />
        )}
        <div className={`rounded-2xl p-8 ${theme.container} transition-all duration-300 relative`}>
          {/* Three-dot icon at top right for profile share */}
          <div className="absolute top-4 right-4 z-40" onClick={() => { setShowProfileShare(true); setShowInputIndex(null); setShowMoreOptions(false); }}>
            {threeDotIcon}
          </div>
          <div className="text-center">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            )}
            <h1 className={`text-3xl font-bold mb-3 ${theme.text}`}>@{user.username}</h1>
            {user.bio && (
              <p className={`mb-8 ${theme.text} opacity-90`}>{user.bio}</p>
            )}
          </div>

          {/* Profile share popup (improved design) */}
          {showProfileShare && (
            <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-8 rounded-3xl shadow-2xl min-w-[280px] max-w-[98vw] w-[95%] sm:w-[500px] flex flex-col items-center max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center w-full mb-4 sticky top-0 bg-white z-10 pb-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Share link</h2>
                <button
                  className="text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileShare(false);
                  }}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              {/* Preview Card */}
              <div className="w-full flex flex-col items-center bg-gray-100 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl mb-2 object-cover bg-white" />
                ) : (
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl mb-2 bg-white flex items-center justify-center text-3xl sm:text-4xl text-gray-300">👤</div>
                )}
                <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">@{user.username}</div>
                <div className="text-gray-500 text-xs sm:text-sm truncate w-full text-center">{profileUrl}</div>
              </div>
              {/* Share Buttons Row */}
              <div className="flex w-full justify-between gap-1 sm:gap-2 mb-4 sm:mb-6 flex-wrap">
                {!showMoreOptions ? (
                  <>
                    {/* Copy Link */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(profileUrl); setShowProfileShare(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700"><path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1m3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11v14Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Copy link</span>
                    </button>
                    {/* X (Twitter) */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`, '_blank'); setShowProfileShare(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black flex items-center justify-center group-hover:bg-gray-800 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-white"><path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">X</span>
                    </button>
                    {/* Facebook */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank'); setShowProfileShare(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-50 transition border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-[#1877F2]"><path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Facebook</span>
                    </button>
                    {/* WhatsApp */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/?text=${encodeURIComponent(profileUrl)}`, '_blank'); setShowProfileShare(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:bg-green-400 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-white"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">WhatsApp</span>
                    </button>
                    {/* LinkedIn */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`, '_blank'); setShowProfileShare(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#0A66C2] flex items-center justify-center group-hover:bg-blue-700 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-white"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">LinkedIn</span>
                    </button>
                    {/* Messenger */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(profileUrl)}`,'_blank'); setShowProfileShare(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-600 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-white"><path fill="currentColor" d="M12 2C6.48 2 2 6.19 2 11.09c0 2.44 1.07 4.65 2.89 6.23c.15.13.23.32.2.52l-.31 2.19c-.07.47.41.85.84.63l2.42-1.21c.16-.08.34-.09.5-.03c.98.32 2.03.5 3.15.5c5.52 0 10-4.19 10-9.09S17.52 2 12 2m1.19 12.47l-2.13-2.27l-4.13 2.27l4.47-4.77l2.13 2.27l4.13-2.27l-4.47 4.77Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Messenger</span>
                    </button>
                    {/* Show more */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); setShowMoreOptions(true); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500">
                          <circle cx={12} cy={12} r={2}/>
                          <circle cx={19} cy={12} r={2}/>
                          <circle cx={5} cy={12} r={2}/>
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Show more</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Email */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(profileUrl)}`,'_blank'); setShowProfileShare(false); setShowMoreOptions(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-red-400"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 2v.01L12 13L4 6.01V6h16M4 20v-9.99l7.29 6.71a1 1 0 0 0 1.42 0L20 10.01V20H4Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Email</span>
                    </button>
                    {/* Reddit */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(profileUrl)}`,'_blank'); setShowProfileShare(false); setShowMoreOptions(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500"><path fill="currentColor" d="M22 12.5c0-1.1-.9-2-2-2c-.5 0-.9.2-1.3.5c-1.2-.8-2.8-1.3-4.7-1.4l.9-2.7l3.8.9c0 .6.5 1 1 1s1-.4 1-1s-.4-1-1-1c-.4 0-.7.2-.9.5l-4.1-1c-.2 0-.4.1-.5.3c0 .1 0 .2.1.3l-1 2.9c-1.9 0-3.6.5-4.8 1.3c-.3-.3-.8-.5-1.2-.5c-1.1 0-2 .9-2 2c0 .7.4 1.3 1 1.7c-.1.4-.1.8-.1 1.3c0 2.7 3.6 4.8 8 4.8s8-2.1 8-4.8c0-.4 0-.9-.1-1.3c.6-.4 1-1 1-1.7m-14.5 2c0-.6.5-1 1-1s1 .4 1 1s-.5 1-1 1s-1-.4-1-1m8.5 3.5c-1.1 0-2.2-.2-3-.6c-.2-.1-.3-.4-.2-.6c.1-.2.4-.3.6-.2c.7.3 1.7.5 2.7.5s2-.2 2.7-.5c.2-.1.5 0 .6.2c.1.2 0 .5-.2.6c-.8.4-1.9.6-3 .6m2.5-2.5c-.6 0-1-.4-1-1s.5-1 1-1s1 .4 1 1s-.4 1-1 1Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Reddit</span>
                    </button>
                    {/* Pinterest */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(profileUrl)}`,'_blank'); setShowProfileShare(false); setShowMoreOptions(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-red-500"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.44 7.56 6.09 8.94c-.08-.76-.15-1.93.03-2.76c.16-.7 1.04-4.47 1.04-4.47s-.26-.52-.26-1.29c0-1.21.7-2.12 1.57-2.12c.74 0 1.1.56 1.1 1.23c0 .75-.48 1.87-.73 2.91c-.21.89.45 1.62 1.33 1.62c1.6 0 2.83-1.69 2.83-4.13c0-2.16-1.56-3.67-3.79-3.67c-2.58 0-4.1 1.93-4.1 3.93c0 .78.3 1.62.68 2.07c.08.1.09.19.07.29c-.08.32-.26 1.01-.29 1.15c-.05.21-.17.26-.39.16c-1.45-.67-2.36-2.77-2.36-4.46c0-3.63 2.64-6.97 7.61-6.97c4.01 0 6.67 2.91 6.67 6.05c0 4.13-2.29 7.21-5.67 7.21c-1.14 0-2.21-.62-2.58-1.32l-.7 2.67c-.2.77-.59 1.74-.88 2.33c.66.2 1.36.31 2.09.31c5.52 0 10-4.48 10-10S17.52 2 12 2Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Pinterest</span>
                    </button>
                    {/* Back */}
                    <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); setShowMoreOptions(false); }}>
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                        <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2Z"/></svg>
                      </div>
                      <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Back</span>
                    </button>
                  </>
                )}
              </div>
              {/* Footer CTA */}
              <div className="w-full bg-gray-50 rounded-2xl p-3 sm:p-4 flex flex-col items-center mb-2">
                <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Join {user.username} on Linktree</div>
                <div className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 text-center">Get your own free Linktree. The only link in bio trusted by 70M+ people.</div>
                <div className="flex w-full gap-2">
                  <button className="flex-1 py-2 rounded-full bg-black text-white font-semibold text-xs sm:text-sm hover:bg-gray-900 transition" onClick={(e) => { e.stopPropagation(); navigate('/register'); }}>Sign up free</button>
                  <button className="flex-1 py-2 rounded-full bg-white border border-gray-300 text-gray-900 font-semibold text-xs sm:text-sm hover:bg-gray-100 transition">Find out more</button>
                </div>
              </div>
              {/* Footer Links */}
              <div className="w-full flex justify-between text-[10px] sm:text-xs text-gray-400 mt-2">
                <button className="hover:underline">Report link</button>
                <button className="hover:underline">Privacy notice</button>
              </div>
            </div>
          )}
          <div className="space-y-4">
            {user.links.map((link, index) => {
              const faviconUrl = getFaviconUrl(link.url);

              return link.active && (
                <div key={index} className="flex items-center w-full p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group relative cursor-pointer" onClick={async () => {
                  try {
                    await axios.post(`https://link-tree-backend-theta.vercel.app/api/users/${user.username}/links/${index}/click`);
                  } catch (err) {}
                  window.open(link.url, '_blank');
                }}>
                  {faviconUrl && (
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      <img
                        src={faviconUrl}
                        alt={link.title}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <span className="flex-grow text-center font-medium text-gray-700 group-hover:text-gray-900">
                    {link.title}
                  </span>
                  <div
                    className="ml-2 flex-shrink-0"
                    onClick={(e) => { 
                      e.stopPropagation();
                      setShowInputIndex(showInputIndex === index ? null : index); 
                      setShowProfileShare(false); 
                      setShowMoreOptions(false); 
                    }}
                  >
                    {threeDotIcon}
                  </div>
                  {/* Link share popup (improved design) */}
                  {showInputIndex === index && (
                    <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-8 rounded-3xl shadow-2xl min-w-[280px] max-w-[98vw] w-[95%] sm:w-[500px] flex flex-col items-center max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-center w-full mb-4 sticky top-0 bg-white z-10 pb-2">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Share link</h2>
                        <button
                          className="text-gray-400 hover:text-gray-700 text-2xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowInputIndex(null);
                          }}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                      </div>
                      {/* Preview Card */}
                      <div className="w-full flex flex-col items-center bg-gray-100 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                        {faviconUrl ? (
                          <img src={faviconUrl} alt={link.title} className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl mb-2 object-contain bg-white" />
                        ) : (
                          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl mb-2 bg-white flex items-center justify-center text-3xl sm:text-4xl text-gray-300">🔗</div>
                        )}
                        <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{link.title}</div>
                        <div className="text-gray-500 text-xs sm:text-sm truncate w-full text-center">{link.url}</div>
                      </div>
                      {/* Share Buttons Row */}
                      <div className="flex w-full justify-between gap-1 sm:gap-2 mb-4 sm:mb-6 flex-wrap">
                        {!showMoreOptions ? (
                          <>
                            {/* Copy Link */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(link.url); setShowInputIndex(null); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700"><path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1m3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11v14Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Copy link</span>
                            </button>
                            {/* X (Twitter) */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(link.url)}`, '_blank'); setShowInputIndex(null); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black flex items-center justify-center group-hover:bg-gray-800 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-white"><path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">X</span>
                            </button>
                            {/* Facebook */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link.url)}`, '_blank'); setShowInputIndex(null); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-50 transition border border-gray-200">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-[#1877F2]"><path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Facebook</span>
                            </button>
                            {/* WhatsApp */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/?text=${encodeURIComponent(link.url)}`, '_blank'); setShowInputIndex(null); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:bg-green-400 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-white"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">WhatsApp</span>
                            </button>
                            {/* LinkedIn */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link.url)}`, '_blank'); setShowInputIndex(null); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#0A66C2] flex items-center justify-center group-hover:bg-blue-700 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-white"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">LinkedIn</span>
                            </button>
                            {/* Messenger */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(link.url)}`,'_blank'); setShowInputIndex(null); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-600 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-white"><path fill="currentColor" d="M12 2C6.48 2 2 6.19 2 11.09c0 2.44 1.07 4.65 2.89 6.23c.15.13.23.32.2.52l-.31 2.19c-.07.47.41.85.84.63l2.42-1.21c.16-.08.34-.09.5-.03c.98.32 2.03.5 3.15.5c5.52 0 10-4.19 10-9.09S17.52 2 12 2m1.19 12.47l-2.13-2.27l-4.13 2.27l4.47-4.77l2.13 2.27l4.13-2.27l-4.47 4.77Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Messenger</span>
                            </button>
                            {/* Show more */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); setShowMoreOptions(true); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500">
                                  <circle cx={12} cy={12} r={2}/>
                                  <circle cx={19} cy={12} r={2}/>
                                  <circle cx={5} cy={12} r={2}/>
                                </svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Show more</span>
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Email */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(link.url)}`,'_blank'); setShowInputIndex(null); setShowMoreOptions(false); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-red-400"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 2v.01L12 13L4 6.01V6h16M4 20v-9.99l7.29 6.71a1 1 0 0 0 1.42 0L20 10.01V20H4Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Email</span>
                            </button>
                            {/* Reddit */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(link.url)}`,'_blank'); setShowInputIndex(null); setShowMoreOptions(false); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500"><path fill="currentColor" d="M22 12.5c0-1.1-.9-2-2-2c-.5 0-.9.2-1.3.5c-1.2-.8-2.8-1.3-4.7-1.4l.9-2.7l3.8.9c0 .6.5 1 1 1s1-.4 1-1s-.4-1-1-1c-.4 0-.7.2-.9.5l-4.1-1c-.2 0-.4.1-.5.3c0 .1 0 .2.1.3l-1 2.9c-1.9 0-3.6.5-4.8 1.3c-.3-.3-.8-.5-1.2-.5c-1.1 0-2 .9-2 2c0 .7.4 1.3 1 1.7c-.1.4-.1.8-.1 1.3c0 2.7 3.6 4.8 8 4.8s8-2.1 8-4.8c0-.4 0-.9-.1-1.3c.6-.4 1-1 1-1.7m-14.5 2c0-.6.5-1 1-1s1 .4 1 1s-.5 1-1 1s-1-.4-1-1m8.5 3.5c-1.1 0-2.2-.2-3-.6c-.2-.1-.3-.4-.2-.6c.1-.2.4-.3.6-.2c.7.3 1.7.5 2.7.5s2-.2 2.7-.5c.2-.1.5 0 .6.2c.1.2 0 .5-.2.6c-.8.4-1.9.6-3 .6m2.5-2.5c-.6 0-1-.4-1-1s.5-1 1-1s1 .4 1 1s-.4 1-1 1Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Reddit</span>
                            </button>
                            {/* Pinterest */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(link.url)}`,'_blank'); setShowInputIndex(null); setShowMoreOptions(false); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-red-500"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.44 7.56 6.09 8.94c-.08-.76-.15-1.93.03-2.76c.16-.7 1.04-4.47 1.04-4.47s-.26-.52-.26-1.29c0-1.21.7-2.12 1.57-2.12c.74 0 1.1.56 1.1 1.23c0 .75-.48 1.87-.73 2.91c-.21.89.45 1.62 1.33 1.62c1.6 0 2.83-1.69 2.83-4.13c0-2.16-1.56-3.67-3.79-3.67c-2.58 0-4.1 1.93-4.1 3.93c0 .78.3 1.62.68 2.07c.08.1.09.19.07.29c-.08.32-.26 1.01-.29 1.15c-.05.21-.17.26-.39.16c-1.45-.67-2.36-2.77-2.36-4.46c0-3.63 2.64-6.97 7.61-6.97c4.01 0 6.67 2.91 6.67 6.05c0 4.13-2.29 7.21-5.67 7.21c-1.14 0-2.21-.62-2.58-1.32l-.7 2.67c-.2.77-.59 1.74-.88 2.33c.66.2 1.36.31 2.09.31c5.52 0 10-4.48 10-10S17.52 2 12 2Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Pinterest</span>
                            </button>
                            {/* Back */}
                            <button className="flex flex-col items-center group w-[calc(25%-8px)]" onClick={(e) => { e.stopPropagation(); setShowMoreOptions(false); }}>
                              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2Z"/></svg>
                              </div>
                              <span className="text-[10px] sm:text-xs mt-1 text-gray-900">Back</span>
                            </button>
                          </>
                        )}
                      </div>
                      {/* Footer CTA */}
                      <div className="w-full bg-gray-50 rounded-2xl p-3 sm:p-4 flex flex-col items-center mb-2">
                        <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Join {user.username} on Linktree</div>
                        <div className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 text-center">Get your own free Linktree. The only link in bio trusted by 70M+ people.</div>
                        <div className="flex w-full gap-2">
                          <button className="flex-1 py-2 rounded-full bg-black text-white font-semibold text-xs sm:text-sm hover:bg-gray-900 transition" onClick={(e) => { e.stopPropagation(); navigate('/register'); }}>Sign up free</button>
                          <button className="flex-1 py-2 rounded-full bg-white border border-gray-300 text-gray-900 font-semibold text-xs sm:text-sm hover:bg-gray-100 transition">Find out more</button>
                        </div>
                      </div>
                      {/* Footer Links */}
                      <div className="w-full flex justify-between text-[10px] sm:text-xs text-gray-400 mt-2">
                        <button className="hover:underline">Report link</button>
                        <button className="hover:underline">Privacy notice</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Profile as default };