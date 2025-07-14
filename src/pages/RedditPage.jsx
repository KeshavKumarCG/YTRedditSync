import React, { useState, useEffect } from 'react';
import FeedCard from '../Components/FeedCard';
import Pagination from '../Components/Pagination';
import redditLogo from "../Images/reddit-logo.png";

export default function RedditPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    async function fetchFeed() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:1880/api/reddit/feed', {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error(`Reddit feed failed: ${response.status}`);

        const data = await response.json();
        setItems(data);
        setLastUpdate(new Date());
      } catch (error) {
        setError(error.message || "Failed to fetch Reddit feed");
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

  const handleContentExpand = (item) => {
    setSelectedContent(item);
  };

  const closeContentModal = () => {
    setSelectedContent(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <img src={redditLogo} alt="Reddit Logo" className="w-10 h-10 rounded-full shadow-md" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 tracking-tight flex items-center">
            Reddit <span className="ml-2 text-gray-800 font-semibold">Feed</span>
          </h1>
        </div>
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
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, index) => (
            <div 
              key={index}
              className="bg-gray-100 border border-gray-200 rounded-2xl p-4 h-40 animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <div className="text-gray-500 mb-4">No Reddit posts found</div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Refresh Feed
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {currentItems.map((item, index) => (
              <FeedCard 
                key={`reddit-${item.time}-${index}`} 
                item={item} 
                onContentExpand={handleContentExpand}
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

      {/* Content Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-xl max-h-[90vh] flex flex-col">
            <button
              className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2"
              onClick={closeContentModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden w-10 h-10">
                    <img src={redditLogo} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{selectedContent.user}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(selectedContent.time).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <a 
                  href={selectedContent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  Open on Reddit
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedContent.text}</h2>
              
              {selectedContent.content && (
                <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                  {selectedContent.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              )}
              
              <div className="flex items-center mt-6 text-sm text-gray-600">
                <div className="flex items-center mr-4">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zM7 9h6v2H7V9z" />
                  </svg>
                  {selectedContent.comments} comments
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-8v4h2v-4h-2zm-2</svg> 0v4H7v-4h2z" />
                  </svg>
                  {selectedContent.score} points
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t">
              <button 
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
                onClick={closeContentModal}
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-</svg>4 4h18" />
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