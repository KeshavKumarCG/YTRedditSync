import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './pages/HomePage';
import RedditPage from './pages/RedditPage';
import YouTubePage from './pages/YouTubePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reddit" element={<RedditPage />} />
            <Route path="/youtube" element={<YouTubePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;