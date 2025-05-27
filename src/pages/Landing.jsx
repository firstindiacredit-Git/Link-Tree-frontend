import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import hero from '../assets/hero.avif';

// Image constants
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  mockup: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
};

const FEATURE_IMAGES = {
  create: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  design: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80",
  monetize: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80"
};

const SOCIAL_PLATFORMS = [
  {
    name: "Instagram",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
    color: "from-pink-500 to-purple-500"
  },
  {
    name: "Twitter",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    color: "from-blue-400 to-blue-600"
  },
  {
    name: "TikTok",
    icon: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
    color: "from-black to-gray-800"
  }
];

const BRAND_NAMES = [
  "Pizeonfly",
  "First India Credit",
  "A2Z Globic",
  "India Educates"
];

const FAQ_ITEMS = [
  {
    question: "Why do I need a link in bio tool?",
    answer: "A link in bio tool helps you share multiple links through a single URL, perfect for social media profiles where you can only share one link."
  },
  {
    question: "Is Linktree the original link in bio tool?",
    answer: "Yes, we pioneered the 'link in bio' category, helping creators share more content with their audience."
  },
  {
    question: "Can you get paid and sell things from a Linktree?",
    answer: "Absolutely! You can accept payments, sell products, and monetize your audience directly through your Linktree."
  },
  {
    question: "Is Linktree safe to use on all my social media profiles?",
    answer: "Yes, Linktree is trusted by 70M+ creators and brands worldwide for their social media profiles."
  }
];

const FEATURES = [
  {
    title: "Create and Share",
    description: "Build your personalized link page in minutes with our easy-to-use tools."
  },
  {
    title: "Track Analytics",
    description: "Get insights into your audience with detailed click and engagement tracking."
  },
  {
    title: "Customize Design",
    description: "Choose from beautiful themes or create your own unique look."
  },
  {
    title: "Monetize",
    description: "Accept payments and sell products directly through your links."
  }
];

// Update color theme constants
const GRADIENT_COLORS = {
  primary: 'from-indigo-600 to-violet-600',
  secondary: 'from-fuchsia-600 to-pink-600',
  accent: 'from-violet-600 to-indigo-600',
  subtle: 'from-indigo-50 to-violet-50',
  dark: 'from-gray-900 via-indigo-900 to-violet-900'
};

const Landing = () => {
  const { user } = useAuth();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🔗</span>
              <span className={`text-2xl font-bold bg-gradient-to-r ${GRADIENT_COLORS.primary} bg-clip-text text-transparent select-none`}>
                Linktree
              </span>
            </Link>

            {/* Navigation Links & Auth Buttons */}
            <div className="flex items-center">
              <div className="flex items-center space-x-8 bg-[#5637f7] px-5 py-2 rounded-xl shadow-lg">
                {user ? (
                  <Link
                    to="/dashboard"
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 text-white hover:bg-white/10`}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="font-medium text-white transition-colors duration-300 hover:text-indigo-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="px-6 py-3 rounded-lg font-medium transition-all duration-300 text-white bg-white/10 hover:bg-white/20"
                    >
                      Sign Up Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[600px] py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={IMAGES.hero}
              alt="Hero Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_COLORS.dark} opacity-90`}></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
                <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-indigo-200 to-violet-200 text-transparent bg-clip-text">
                    Everything you are, in one simple link in bio.
                  </h1>
                  <p className="text-xl mb-8 text-indigo-100">
                    Connect your audience to all of your content with just one link. Share more, sell more, and grow more.
                  </p>
                  {user ? (
                    <Link
                      to="/dashboard"
                      className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block border border-white/20"
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/register"
                      className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block border border-white/20"
                    >
                      Get Started For Free
                    </Link>
                  )}
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-6'}`}>
                  <img
                    src={hero}
                    alt="Link in Bio Illustration"
                    className="w-full max-w-md transform hover:scale-105 transition duration-500 rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50/50">
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r ${GRADIENT_COLORS.primary} bg-clip-text text-transparent`}>
              Create and customize your Linktree in minutes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-indigo-100/50"
                >
                  <div className="mb-6 rounded-xl overflow-hidden h-48">
                    <img
                      src={Object.values(FEATURE_IMAGES)[index]}
                      alt={feature.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${GRADIENT_COLORS.primary} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Integration Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={IMAGES.mockup}
              alt="Background Pattern"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-8 text-white">
                Share your Linktree from your favorite social platforms
              </h2>
              <p className="text-xl mb-12 text-purple-200 max-w-3xl mx-auto">
                Connect with your audience across all your social media platforms. One link does it all.
              </p>
              <div className="flex justify-center space-x-6">
                {SOCIAL_PLATFORMS.map((platform, index) => (
                  <div 
                    key={platform.name}
                    className="w-64 h-64 bg-gradient-to-br border border-white/10 backdrop-blur-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 p-6 flex flex-col items-center justify-center"
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${platform.color} p-4 mb-4`}>
                      <img
                        src={platform.icon}
                        alt={platform.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-white text-xl font-semibold">{platform.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent">
                  Analyze your audience and keep your followers engaged
                </h2>
                <p className="text-xl text-gray-600">
                  Get detailed insights about your audience's behavior and optimize your content strategy.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                  <img
                    src={IMAGES.analytics}
                    alt="Analytics Dashboard"
                    className="w-full rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r ${GRADIENT_COLORS.primary} bg-clip-text text-transparent`}>
              Trusted by leading brands worldwide
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {BRAND_NAMES.map((name, i) => (
                <div key={i} className="h-20 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 text-xl font-semibold text-indigo-900 tracking-wide border border-indigo-100/50 hover:border-indigo-200 group">
                  <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-violet-700 transition-all duration-300">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <blockquote className="text-2xl font-medium text-gray-900 max-w-3xl mx-auto">
                "Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link."
              </blockquote>
              <p className="mt-4 text-purple-600">- The Verge</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`py-20 bg-gradient-to-br ${GRADIENT_COLORS.dark} relative overflow-hidden`}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOTEzOS0xLjc5MDg2MS00LTQtNHMtNCAxLjc5MDg2MS00IDQgMS43OTA4NjEgNCA0IDQgNC0xLjc5MDg2MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Got questions?
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20">
                  <button
                    className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center text-white"
                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  >
                    {item.question}
                    <span className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {activeAccordion === index && (
                    <div className="px-6 py-4 bg-white/5">
                      <p className="text-indigo-200">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-16 bg-gradient-to-br ${GRADIENT_COLORS.primary}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Jumpstart your corner of the internet today
            </h2>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/10 backdrop-blur-md text-white placeholder-indigo-200 border border-white/20"
              />
              <button className="px-8 py-3 rounded-full font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Press</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Community</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Stories</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Creators</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Developers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Partners</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Status</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookies</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Guidelines</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Linktree. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing; 