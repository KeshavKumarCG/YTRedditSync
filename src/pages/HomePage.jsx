import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import redditLogo from "../Images/reddit-logo.png";
import youtubeLogo from "../Images/youtube-logo.jpg";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats] = useState({
    reddit: { posts: "50K+", users: "2M+" },
    youtube: { videos: "25K+", channels: "500+" }
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-time Updates",
      description: "Get the latest content as it's published"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Unified Experience",
      description: "All your coding content in one place"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Trending Topics",
      description: "Discover what's popular in the coding community"
    }
  ];

  const PlatformCard = ({ 
    to, 
    logo, 
    title, 
    description, 
    gradient, 
    borderColor, 
    stats: cardStats,
    delay = 0 
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Link
        to={to}
        className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border-2 ${borderColor} overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: `${delay}ms`,
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
            : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Animated border */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
             style={{
               padding: "2px",
               mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
               maskComposite: "exclude",
               WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
               WebkitMaskComposite: "exclude",
             }} />

        <div className="relative z-10 p-8">
          {/* Logo section */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                <img 
                  src={logo} 
                  alt={`${title} logo`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-6 mb-6">
            {Object.entries(cardStats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-gray-800">{value}</div>
                <div className="text-sm text-gray-500 capitalize">{key}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <div className={`bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center space-x-2`}>
              <span>Explore {title}</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Main heading */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                DevSync
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-700">
                Social Media Aggregator
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest coding content from Reddit and YouTube in one unified, 
              beautiful interface. Stay updated with trending discussions, tutorials, and insights 
              from the developer community.
            </p>
          </div>

          {/* Features section */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Platform cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PlatformCard
              to="/reddit"
              logo={redditLogo}
              title="Reddit"
              description="Browse the latest coding discussions, ask questions, and share knowledge with the vibrant Reddit programming community."
              gradient="from-orange-500 to-red-500"
              borderColor="border-orange-200"
              stats={stats.reddit}
              delay={400}
            />
            <PlatformCard
              to="/youtube"
              logo={youtubeLogo}
              title="YouTube"
              description="Watch coding tutorials, tech talks, and educational content from top creators and industry experts."
              gradient="from-red-500 to-pink-500"
              borderColor="border-red-200"
              stats={stats.youtube}
              delay={600}
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className={`relative py-20 transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`} style={{ transitionDelay: '800ms' }}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to dive into the coding community?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of developers who use DevSync to stay updated with the latest trends, 
            tutorials, and discussions in the programming world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reddit"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start with Reddit
            </Link>
            <Link
              to="/youtube"
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Explore YouTube
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}