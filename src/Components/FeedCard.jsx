import React, { useState } from "react";

export default function FeedCard({ item, onContentExpand }) {
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const formattedTime = formatTime(time);

  const platformColors = {
    Reddit: {
      gradient: "from-orange-500 to-red-500",
      bg: "bg-gradient-to-br from-orange-50 to-red-50",
      text: "text-orange-800",
      border: "border-orange-200",
      shadow: "shadow-orange-200/50",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 11c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-7 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm3.5 3c-1.38 0-2.5-1.12-2.5-2.5h1c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h1c0 1.38-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
    },
    YouTube: {
      gradient: "from-red-500 to-pink-500",
      bg: "bg-gradient-to-br from-red-50 to-pink-50",
      text: "text-red-800",
      border: "border-red-200",
      shadow: "shadow-red-200/50",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    Unknown: {
      gradient: "from-gray-500 to-slate-500",
      bg: "bg-gradient-to-br from-gray-50 to-slate-50",
      text: "text-gray-800",
      border: "border-gray-200",
      shadow: "shadow-gray-200/50",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
    },
  };

  const platformConfig = platformColors[platform] || platformColors.Unknown;
  const isYouTube = platform === "YouTube";
  const isReddit = platform === "Reddit";
  const hasContent = content && content.length > 0;

  const handleClick = () => {
    if (isYouTube && videoId) {
      onContentExpand?.(videoId);
    } else if (isReddit && hasContent) {
      onContentExpand?.(item);
    }
  };

  const openExternalLink = (e) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  const cardStyle = {
    transform: isHovering
      ? "translateY(-8px) scale(1.02)"
      : "translateY(0) scale(1)",
    boxShadow: isHovering
      ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)"
      : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };

  const imageStyle = {
    transform: isHovering ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.6s ease-out",
  };

  const overlayStyle = {
    opacity: isHovering ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div
      className={`relative bg-white rounded-3xl p-6 border-2 ${platformConfig.border} cursor-pointer overflow-hidden backdrop-blur-lg`}
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${platformConfig.gradient} opacity-5`}
      />

      {/* Animated border gradient */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${platformConfig.gradient} opacity-20`}
        style={{
          padding: "2px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "exclude",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Image Section */}
        {image && !imageError && (
          <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-100">
            <img
              src={image}
              alt="thumbnail"
              className={`w-full h-48 object-cover ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={imageStyle}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />

            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            )}

            {/* YouTube play overlay */}
            {isYouTube && imageLoaded && (
              <div
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                style={overlayStyle}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-10 h-10 text-white ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${platformConfig.bg} ${platformConfig.text} shadow-lg`}
          >
            <span className="mr-2">{platformConfig.icon}</span>
            {platform}
          </div>
          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
            {formattedTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bold text-xl text-gray-900 mb-4 leading-tight line-clamp-2">
          {text}
        </h2>

        {/* Content Preview */}
        {isReddit && hasContent && (
          <div className="relative z-0 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
              {content}
            </p>
            <div className="text-blue-500 text-sm mt-2 font-medium text-bold">
              Click to read more →
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {user.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <span className="block text-sm font-semibold text-gray-800 truncate max-w-[120px]">
                {user}
              </span>
              <span className="text-xs text-gray-500">Creator</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isReddit && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <svg
                    className="w-4 h-4 mr-1 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.89 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {comments}
                  </span>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <svg
                    className="w-4 h-4 mr-1 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {score}
                  </span>
                </div>
              </div>
            )}

            {isYouTube ? (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                Watch Video
              </div>
            ) : (
              url && (
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  onClick={openExternalLink}
                >
                  Visit Post
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
