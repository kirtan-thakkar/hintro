import React from 'react';
import { Play, ChevronDown } from 'lucide-react';

export function Navbar() {
  return (
    <header className="h-[64px] w-full bg-white border-b border-[#E2E2E8] flex items-center justify-between px-[30px] shrink-0">
      {/* Left side - Page Title */}
      <h1 className="text-lg font-semibold text-gray-900 font-sans">
        Dashboard
      </h1>
      
      {/* Right side - Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Watch Tutorial Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Play className="w-3.5 h-3.5" />
          Watch Tutorial
        </button>

        {/* User Profile Dropdown Placeholder */}
        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-200">
            {/* Using a placeholder avatar for now */}
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
