'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, ChevronDown, LogOut, Menu } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { LogoutModal } from './logout-modal';

export function Navbar({ isMobile, onMenuClick, title = "Dashboard" }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <header className={`h-[64px] w-full bg-white border-b border-[#E2E2E8] flex items-center shrink-0 ${isMobile ? 'px-5 justify-between relative' : 'justify-between px-[30px]'}`}>
        {/* Left side - Menu (Mobile only) */}
        {isMobile && (
          <button onClick={onMenuClick} className="p-1 -ml-1 text-gray-700 hover:bg-gray-100 rounded-md z-10">
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* Page Title */}
        <h1 className={`text-lg font-semibold text-gray-900 font-sans ${isMobile ? 'absolute left-1/2 -translate-x-1/2' : ''}`}>
          {title}
        </h1>
        
        {/* Right side - Actions & Profile */}
        <div className="flex items-center gap-4 z-10">
          {/* Watch Tutorial Button */}
          {!isMobile && (
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Play className="w-3.5 h-3.5" />
              Watch Tutorial
            </button>
          )}

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-200">
                <img 
                  src="https://i.pravatar.cc/150?img=11" 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
              {!isMobile && (
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-10">
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
