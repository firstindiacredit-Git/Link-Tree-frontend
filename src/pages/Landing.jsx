import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Menu, X, Link as LinkIcon, 
  ArrowRight, Palette, BarChart, Link, 
  Smartphone, Zap, Shield, ChevronDown, 
  ChevronUp, Check, Heart 
} from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

// Link Component
const LinkComponent = ({ 
  href, 
  children, 
  className = '', 
  onClick 
}) => {
  return (
    <a 
      href={href}
      className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

// Navbar Component
const Navbar = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container py-4 mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Linknest Logo" className="w-40 h-12" />
            {/* <span className="text-xl font-bold">LinkHub</span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <LinkComponent href="#features">Features</LinkComponent>
            <LinkComponent href="#demo">Demo</LinkComponent>
            <LinkComponent href="#pricing">Pricing</LinkComponent>
            <LinkComponent href="#faq">FAQ</LinkComponent>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => navigate('/register')}
              className="hidden md:block btn-primary"
            >
              Get Started
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 md:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`fixed inset-0 z-40 bg-white dark:bg-gray-900 transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden pt-20`}
      >
        <nav className="container flex flex-col items-center space-y-6 py-8">
          <LinkComponent 
            href="#features" 
            onClick={() => setIsMenuOpen(false)}
            className="text-xl"
          >
            Features
          </LinkComponent>
          <LinkComponent 
            href="#demo" 
            onClick={() => setIsMenuOpen(false)}
            className="text-xl"
          >
            Demo
          </LinkComponent>
          <LinkComponent 
            href="#pricing" 
            onClick={() => setIsMenuOpen(false)}
            className="text-xl"
          >
            Pricing
          </LinkComponent>
          <LinkComponent 
            href="#faq" 
            onClick={() => setIsMenuOpen(false)}
            className="text-xl"
          >
            FAQ
          </LinkComponent>
          <button
            onClick={() => { setIsMenuOpen(false); navigate('/register'); }}
            className="btn-primary mt-4 w-full text-center"
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="reveal text-center lg:text-left text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-primary-600 dark:text-primary-400">One Link</span> for 
              <br />
              Your Entire Digital World
            </h1>
            
            <p className="reveal text-center lg:text-left text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              Create a beautiful, customizable link page that houses all your important content. Share one link instead of many.
            </p>
            
            <div className="reveal flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button onClick={() => navigate('/register')} className="btn-primary flex items-center gap-2">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <a href="#demo" className="btn-secondary">
                See Examples
              </a>
            </div>
            
            <div className="reveal mt-8 flex items-center justify-center lg:justify-start space-x-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Trusted by over 10,000+ creators</p>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="reveal relative w-[280px] sm:w-[320px]">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-200 dark:bg-primary-900/30 rounded-full filter blur-xl opacity-70 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent-200 dark:bg-accent-900/30 rounded-full filter blur-xl opacity-70 animate-pulse-slow"></div>
              
              <div className="animate-float relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-600 dark:text-primary-400">AS</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Akash Singh</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Digital Creator</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Portfolio Website', bg: 'bg-gray-100 dark:bg-gray-700' },
                      { name: 'YouTube Channel', bg: 'bg-red-100 dark:bg-red-900/30' },
                      { name: 'Instagram Profile', bg: 'bg-purple-100 dark:bg-purple-900/30' },
                      { name: 'Twitter', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                      { name: 'Latest Blog Post', bg: 'bg-green-100 dark:bg-green-900/30' }
                    ].map((link, i) => (
                      <div 
                        key={i} 
                        className={`link-btn ${link.bg} hover:shadow-md`}
                      >
                        {link.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Feature = ({ title, description, icon, delay }) => (
  <div className={`reveal p-6 glass-card`} data-delay={delay}>
    <div className="w-12 h-12 mb-4 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      title: 'Beautiful Designs',
      description: 'Choose from dozens of stunning templates or create your own custom design.',
      icon: <Palette className="w-6 h-6" />,
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track visitor counts, link clicks, and engagement with detailed analytics.',
      icon: <BarChart className="w-6 h-6" />,
    },
    {
      title: 'Custom Domains',
      description: 'Use your own domain name for a more professional and branded experience.',
      icon: <Link className="w-6 h-6" />,
    },
    {
      title: 'Mobile Optimized',
      description: 'Perfect viewing experience across all devices from mobile to desktop.',
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: 'Lightning Fast',
      description: 'Pages load instantly for visitors, ensuring maximum engagement.',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security measures.',
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  return (
    <section id="features" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need in <span className="text-primary-600 dark:text-primary-400">One Link</span>
          </h2>
          <p className="reveal text-lg text-gray-600 dark:text-gray-400">
            Powerful features to help you showcase your content and engage with your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index % 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ProfileDemo Component
const ProfileDemo = () => {
  return (
    <section id="demo" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl sm:text-4xl font-bold mb-4">
            See It In <span className="text-primary-600 dark:text-primary-400">Action</span>
          </h2>
          <p className="reveal text-lg text-gray-600 dark:text-gray-400">
            Check out these beautiful examples of LinkNest profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Shiwani Singh',
              role: 'Digital Artist',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              theme: 'bg-gradient-to-br from-purple-500 to-pink-500',
              links: [
                { name: 'Portfolio', icon: '🎨' },
                { name: 'Instagram', icon: '📸' },
                { name: 'Behance', icon: '💼' },
                { name: 'Shop', icon: '🛍️' }
              ]
            },
            {
              name: 'Aman Singh',
              role: 'Tech Content Creator',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              theme: 'bg-gradient-to-br from-blue-500 to-cyan-500',
              links: [
                { name: 'YouTube', icon: '🎥' },
                { name: 'Twitter', icon: '🐦' },
                { name: 'Blog', icon: '📝' },
                { name: 'Newsletter', icon: '📧' }
              ]
            },
            {
              name: 'Rashmi Singh',
              role: 'Fitness Coach',
              image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
              theme: 'bg-gradient-to-br from-green-500 to-emerald-500',
              links: [
                { name: 'Training Plans', icon: '💪' },
                { name: 'Instagram', icon: '📸' },
                { name: 'Podcast', icon: '🎙️' },
                { name: 'Book a Call', icon: '📅' }
              ]
            }
          ].map((profile, index) => (
            <div key={index} className="reveal" data-delay={index}>
              <div className="glass-card overflow-hidden">
                <div className={`h-32 ${profile.theme}`}></div>
                <div className="p-6">
                  <div className="flex items-center -mt-16 mb-4">
                    <img 
                      src={profile.image} 
                      alt={profile.name}
                      className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800"
                    />
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">{profile.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{profile.role}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {profile.links.map((link, i) => (
                      <div 
                        key={i}
                        className="link-btn bg-gray-100 dark:bg-gray-700 hover:shadow-md"
                      >
                        <span className="mr-2">{link.icon}</span>
                        {link.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonial = ({ quote, author, role, image, delay }) => (
  <div className="reveal glass-card p-6" data-delay={delay}>
    <div className="flex items-center mb-4">
      <img 
        src={image} 
        alt={author}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4">
        <h4 className="font-semibold">{author}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-400">{quote}</p>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      quote: "LinkNest has completely transformed how I share my content. My engagement has increased by 300% since I started using it!",
      author: "Anuj Rawat",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      quote: "The analytics feature is a game-changer. I can now see exactly which links my audience engages with the most.",
      author: "Maya Singh",
      role: "Digital Marketer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      quote: "Setting up my LinkNest page took less than 5 minutes. The customization options are exactly what I needed.",
      author: "Aman Pandey",
      role: "Photographer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl sm:text-4xl font-bold mb-4">
            Loved by <span className="text-primary-600 dark:text-primary-400">Creators</span>
          </h2>
          <p className="reveal text-lg text-gray-600 dark:text-gray-400">
            Join thousands of creators who are using LinkNest to grow their audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Component
const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}) => (
  <div className="border-b border-gray-200 dark:border-gray-700">
    <button
      className="flex justify-between items-center w-full py-5 text-left"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className="text-lg font-semibold">{question}</span>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      )}
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 pb-5' : 'max-h-0'
      }`}
    >
      <p className="text-gray-600 dark:text-gray-400">{answer}</p>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What is LinkNest?',
      answer: 'LinkNest is a platform that allows you to create a beautiful, customizable page that houses all your important links in one place. Instead of sharing multiple links, you can share just one.'
    },
    {
      question: 'How do I get started with LinkNest?',
      answer: 'Getting started is easy! Simply sign up for a free account, customize your profile with a photo and bio, add your links, and choose a theme. Your LinkNest page will be ready to share in minutes.'
    },
    {
      question: 'Can I use my own custom domain?',
      answer: 'Yes! Our Pro and Business plans allow you to connect your own custom domain to your LinkNest page for a more professional and branded experience.'
    },
    {
      question: 'What kind of analytics does LinkNest provide?',
      answer: 'Our analytics dashboard shows you visitor counts, link clicks, and engagement metrics. You can see which links are performing best and where your traffic is coming from to optimize your page.'
    },
    {
      question: 'Can I switch between plans later?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. If you upgrade, you\'ll immediately get access to all the features of your new plan. If you downgrade, the changes will take effect at the end of your current billing cycle.'
    },
    {
      question: 'Is there a limit to how many links I can add?',
      answer: 'Free accounts can add up to 5 links. Pro and Business accounts have unlimited links.'
    }
  ];

  return (
    <section id="faq" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-primary-600 dark:text-primary-400">Questions</span>
          </h2>
          <p className="reveal text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about LinkNest.
          </p>
        </div>

        <div className="reveal max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Have more questions? <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => {
  const navigate = useNavigate();
  return (
    <section id="cta" className="section py-16">
      <div className="container">
        <div className="reveal max-w-4xl mx-auto glass-card overflow-hidden">
          <div className="p-8 md:p-12 relative">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-400/20 dark:bg-primary-800/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-400/20 dark:bg-accent-800/20 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Simplify Your <span className="text-primary-600 dark:text-primary-400">Online Presence</span>?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Join thousands of creators, influencers, and businesses who are using LinkNest to connect with their audience.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                <button 
                  onClick={() => navigate('/register')} 
                  className="btn-primary flex-1"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <a 
                  href="#demo" 
                  className="btn-secondary flex-1"
                >
                  See Examples
                </a>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No credit card required. Free 14-day trial on all paid plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="LinkNest Logo" className="w-40 h-12" />
              {/* <span className="text-xl font-bold">LinkHub</span> */}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Simplify your online presence with a single, beautiful link page.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.636 1.772 1.153.52.5.905 1.104 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772c-.5.519-1.104.904-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764h-2.669V14.16c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.25h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              <li><LinkComponent href="#features">Features</LinkComponent></li>
              <li><LinkComponent href="#pricing">Pricing</LinkComponent></li>
              <li><LinkComponent href="#demo">Examples</LinkComponent></li>
              <li><LinkComponent href="#faq">FAQ</LinkComponent></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><LinkComponent href="#">Blog</LinkComponent></li>
              <li><LinkComponent href="#">Help Center</LinkComponent></li>
              <li><LinkComponent href="#">Community</LinkComponent></li>
              <li><LinkComponent href="#">Status</LinkComponent></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><LinkComponent href="#">About Us</LinkComponent></li>
              <li><LinkComponent href="#">Careers</LinkComponent></li>
              <li><LinkComponent href="#">Privacy Policy</LinkComponent></li>
              <li><LinkComponent href="#">Terms of Service</LinkComponent></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} LinkNest. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-accent-500" /> by the Linknest Team
          </p>
        </div>
      </div>
    </footer>
  );
};

// Pricing Component
const Plan = ({ 
  name, 
  price, 
  description, 
  features, 
  popular = false,
  delay 
}) => {
  const navigate = useNavigate();
  return (
    <div 
      className={`reveal glass-card overflow-hidden transition-all duration-300 ${
        popular ? 'border-primary-500 dark:border-primary-400 transform hover:-translate-y-1' : 'hover:-translate-y-1'
      }`}
      data-delay={delay}
    >
      {popular && (
        <div className="bg-primary-500 text-white py-1 px-4 text-sm font-semibold text-center">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold">{price}</span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        
        <ul className="mt-6 space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <button 
            onClick={() => navigate('/register')} 
            className={`block w-full py-3 px-4 rounded-xl text-center font-semibold transition-all ${
              popular 
                ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Basic link page',
        'Up to 5 links',
        'Limited customization',
        'Basic analytics',
        'LinkNest branding'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$9',
      description: 'Everything you need to grow',
      features: [
        'Unlimited links',
        'Custom themes',
        'Advanced analytics',
        'Custom domain',
        'No LinkNest branding',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Business',
      price: '$29',
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'API access',
        'Multiple profiles',
        'Advanced integrations',
        '24/7 dedicated support'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl sm:text-4xl font-bold mb-4">
            Simple, <span className="text-primary-600 dark:text-primary-400">Transparent</span> Pricing
          </h2>
          <p className="reveal text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that works best for you. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Plan 
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              delay={index}
            />
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

// Main App Component
function Landing() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check user preference
    if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update HTML class for dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  // Animation on scroll
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - elementHeight / 4) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', reveal);
    // Initial check
    setTimeout(reveal, 100);
    
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <Features />
        <ProfileDemo />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default Landing; 