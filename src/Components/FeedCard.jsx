import { useState, useRef } from "react";
import redditLogo from "../Images/reddit-logo.png";
import youtubeLogo from "../Images/youtube-logo.jpg";

export default function FeedCard({ item, onContentExpand }) {
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [ripples, setRipples] = useState([]);
  const cardRef = useRef(null);
  const rippleId = useRef(0);

  const {
    platform = "Unknown",
    text = "",
    user = "Unknown",
    time = new Date().toISOString(),
    image = null,
    videoId = null,
    url = "",
    content = "",
    comments = 0,
    score = 0,
  } = item || {};

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const createRipple = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);
    
    const newRipple = {
      id: rippleId.current++,
      x: x - size / 2,
      y: y - size / 2,
      size
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const formattedTime = formatTime(time);

  const platformColors = {
    Reddit: {
      primary: "from-orange-500 to-red-500",
      secondary: "from-orange-400 to-red-400",
      bg: "bg-gradient-to-br from-orange-50 to-red-50",
      text: "text-orange-800",
      border: "border-orange-200",
      shadow: "shadow-orange-200/30",
      glow: "shadow-orange-400/20",
      icon: <img src={redditLogo} alt="Reddit Logo" className="w-5 h-5" />,
    },
    YouTube: {
      primary: "from-red-500 to-pink-500",
      secondary: "from-red-400 to-pink-400",
      bg: "bg-gradient-to-br from-red-50 to-pink-50",
      text: "text-red-800",
      border: "border-red-200",
      shadow: "shadow-red-200/30",
      glow: "shadow-red-400/20",
      icon: <img src={youtubeLogo} alt="YouTube Logo" className="w-5 h-5" />,
    },
    Unknown: {
      primary: "from-gray-500 to-slate-500",
      secondary: "from-gray-400 to-slate-400",
      bg: "bg-gradient-to-br from-gray-50 to-slate-50",
      text: "text-gray-800",
      border: "border-gray-200",
      shadow: "shadow-gray-200/30",
      glow: "shadow-gray-400/20",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
    },
  };

  const platformConfig = platformColors[platform] || platformColors.Unknown;
  const isYouTube = platform === "YouTube";
  const isReddit = platform === "Reddit";
  const hasContent = content && content.length > 0;

  const handleClick = (e) => {
    createRipple(e);
    setTimeout(() => {
      if (isYouTube && videoId) {
        onContentExpand?.(videoId);
      } else if (isReddit && hasContent) {
        onContentExpand?.(item);
      }
    }, 150);
  };

  const openExternalLink = (e) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const cardStyle = {
    transform: isHovering
      ? "translateY(-12px) scale(1.02)"
      : "translateY(0) scale(1)",
    boxShadow: isHovering
      ? `0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 32px ${platformConfig.glow}`
      : "0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };

  const imageStyle = {
    transform: isHovering ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const overlayStyle = {
    opacity: isHovering ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div
      ref={cardRef}
      className={`relative bg-white/95 backdrop-blur-xl rounded-3xl border-2 ${platformConfig.border} cursor-pointer overflow-hidden group`}
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        >
          <div 
            className={`w-full h-full rounded-full bg-gradient-to-r ${platformConfig.secondary} opacity-20 animate-ping`}
            style={{
              animation: "ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards"
            }}
          />
        </div>
      ))}

      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${platformConfig.primary} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Subtle border glow */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${platformConfig.primary} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        style={{
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "exclude",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Image Section */}
        {image && !imageError && (
          <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
            <img
              src={image}
              alt="thumbnail"
              className={`w-full h-48 object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={imageStyle}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />

            {/* Enhanced loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
              </div>
            )}

            {/* YouTube play overlay */}
            {isYouTube && imageLoaded && (
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 flex items-center justify-center"
                style={overlayStyle}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-full blur-lg opacity-50 animate-pulse" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-200">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Image overlay actions */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleBookmark}
                className={`w-8 h-8 rounded-full backdrop-blur-md border transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-yellow-500 text-white border-yellow-400' 
                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
              >
                <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold ${platformConfig.bg} ${platformConfig.text} shadow-lg border ${platformConfig.border} backdrop-blur-sm`}
          >
            <span className="mr-2 transition-transform duration-200 group-hover:scale-110">
              {platformConfig.icon}
            </span>
            {platform}
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 font-medium bg-gray-100/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-bold text-xl text-gray-900 mb-4 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
          {text}
        </h2>

        {/* Content Preview */}
        {isReddit && hasContent && (
          <div className="relative mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-inner">
            <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed mb-3">
              {content}
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
              <span>Read full post</span>
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            </div>
            <div className="ml-3">
              <span className="block text-sm font-semibold text-gray-800 truncate max-w-[120px]">
                {user}
              </span>
              <span className="text-xs text-gray-500">Creator</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Action buttons */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium">{formatNumber(score + (isLiked ? 1 : 0))}</span>
            </button>

            {isReddit && (
              <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.89 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{formatNumber(comments)}</span>
              </div>
            )}

            {/* CTA Button */}
            {isYouTube ? (
              <div className={`bg-gradient-to-r ${platformConfig.primary} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Watch</span>
                </div>
              </div>
            ) : (
              url && (
                <button
                  className={`bg-gradient-to-r ${platformConfig.primary} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}
                  onClick={openExternalLink}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Visit</span>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}