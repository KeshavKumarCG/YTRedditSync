import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
return (
    <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">FeedHub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            View the latest Coding-related content from Reddit and YouTube in one place
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link 
                to="/reddit" 
                className="bg-white rounded-xl shadow-md p-6 border border-orange-300 hover:shadow-lg transition-shadow"
            >
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-orange-500 text-white p-3 rounded-full">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.36 11.5a.5.5 0 01-.86.5 2 2 0 00-3.72 0 .5.5 0 01-.86-.5 3 3 0 015.44 0zM8 8a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Reddit</h2>
                <p className="text-gray-600">Browse the latest Coding discussions from Reddit</p>
            </Link>
            
            <Link 
                to="/youtube" 
                className="bg-white rounded-xl shadow-md p-6 border border-red-300 hover:shadow-lg transition-shadow"
            >
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-red-600 text-white p-3 rounded-full">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 14V6l5 4-5 4z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">YouTube</h2>
                <p className="text-gray-600">Watch the latest Coding videos from YouTube</p>
            </Link>
        </div>
    </div>
);
}