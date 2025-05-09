import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import hero from '../assets/hero.avif'

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

const Landing = () => {
  const { user } = useAuth();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [email, setEmail] = useState('');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-green-600 min-h-[600px] py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Everything you are, in one simple link in bio.
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Connect your audience to all of your content with just one link. Share more, sell more, and grow more.
            </p>
            {user ? (
              <Link
                to="/dashboard"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition shadow-lg inline-block"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition shadow-lg inline-block"
              >
                Get Started For Free
              </Link>
            )}
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={hero}
              alt="Link in Bio Illustration"
              className="w-full max-w-md transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-purple-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-purple-900">
            Create and customize your Linktree in minutes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-3 text-purple-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Integration Section */}
      <section className="bg-gradient-to-br from-red-800 to-red-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Share your Linktree from your Instagram, TikTok, Twitter and other links
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
            Connect with your audience across all your social media platforms. One link does it all.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="w-64 h-64 bg-red-700 rounded-2xl shadow-lg"></div>
            <div className="w-64 h-64 bg-red-700 rounded-2xl shadow-lg hidden md:block"></div>
            <div className="w-64 h-64 bg-red-700 rounded-2xl shadow-lg hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-4xl font-bold mb-6 text-yellow-900">
                Analyze your audience and keep your followers engaged
              </h2>
              <p className="text-xl text-yellow-800">
                Get detailed insights about your audience's behavior and optimize your content strategy.
              </p>
            </div>
            <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl p-8">
              {/* Placeholder for analytics dashboard image */}
              <div className="w-full h-64 bg-yellow-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            The only link in bio trusted by 70M+ creators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-gray-100"></div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <blockquote className="text-2xl font-medium text-gray-900 max-w-3xl mx-auto">
              "Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link."
            </blockquote>
            <p className="mt-4 text-gray-600">- The Verge</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-purple-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Got questions?
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  {item.question}
                  <span className={`transform transition-transform ${activeAccordion === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeAccordion === index && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Jumpstart your corner of the internet today
          </h2>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
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
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-400">About</a></li>
                <li><a href="#" className="hover:text-purple-400">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400">Press</a></li>
                <li><a href="#" className="hover:text-purple-400">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-400">Stories</a></li>
                <li><a href="#" className="hover:text-purple-400">Creators</a></li>
                <li><a href="#" className="hover:text-purple-400">Developers</a></li>
                <li><a href="#" className="hover:text-purple-400">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400">FAQ</a></li>
                <li><a href="#" className="hover:text-purple-400">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-400">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400">Terms</a></li>
                <li><a href="#" className="hover:text-purple-400">Cookies</a></li>
                <li><a href="#" className="hover:text-purple-400">Guidelines</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Linktree. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 