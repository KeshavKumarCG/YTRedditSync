import React, { useState, useEffect } from 'react';
import FeedCard from '../Components/FeedCard';
import Pagination from '../Components/Pagination';

export default function YouTubePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    async function fetchFeed() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:1880/api/youtube/feed', {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error(`YouTube feed failed: ${response.status}`);

        const data = await response.json();
        setItems(data);
        setLastUpdate(new Date());
      } catch (error) {
        setError(error.message || "Failed to fetch YouTube feed");
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
    const interval = setInterval(fetchFeed, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
    setPlayerReady(false);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">YouTube Feed</h1>
        <div className="text-sm text-gray-500">
          Last update: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-red-700">Error Loading Feed</h3>
          <p className="text-red-600">{error}</p>
          <button 
            className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index}
              className="bg-gray-100 border border-gray-200 rounded-2xl p-4 h-80 animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <div className="text-gray-500 mb-4">No YouTube videos found</div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Refresh Feed
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentItems.map((item, index) => (
              <FeedCard 
                key={`youtube-${item.time}-${index}`} 
                item={item} 
                onContentExpand={handleVideoSelect}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
            <button
              className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-100 transition-all"
              onClick={closeVideoPlayer}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative pt-[56.25%]">
              {!playerReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="w-16 h-16 border-t-4 border-red-600 rounded-full animate-spin"></div>
                </div>
              )}
              
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setPlayerReady(true)}
              ></iframe>
            </div>
            
            <div className="p-4 bg-gray-900">
              <button 
                className="mt-2 text-white hover:text-red-500 transition-colors flex items-center"
                onClick={closeVideoPlayer}
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to feed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}