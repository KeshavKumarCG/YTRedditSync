import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="font-bold text-xl">Social Feed</div>
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-900' : 'hover:bg-gray-700'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/reddit" 
                className={({isActive}) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-orange-600' : 'hover:bg-gray-700'
                  }`
                }
              >
                Reddit
              </NavLink>
              <NavLink 
                to="/youtube" 
                className={({isActive}) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-red-600' : 'hover:bg-gray-700'
                  }`
                }
              >
                YouTube
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}