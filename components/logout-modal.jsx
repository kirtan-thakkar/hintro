import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useMediaQuery } from 'react-responsive';

export function LogoutModal({ isOpen, onClose, onConfirm }) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className={`${isMobile ? 'w-full max-w-85 p-6' : 'w-105 p-8'} h-57 bg-background rounded-lg flex flex-col gap-2 shadow-2xl`}>
        <div className="border-b border-border pb-2.5">
          <h3 className="text-[20px] font-semibold text-gray-900 tracking-tight">
            Leaving already?
          </h3>
        </div>
        
        <p className="text-[13px] font-medium text-gray-800 leading-[1.6] pt-[5px] flex-1 my-2">
          You can log back in anytime to continue your meetings with Hintro.
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <button 
            onClick={onClose}
            className="w-[84px] h-[36px] text-[13px] font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="w-[84px] h-[36px] text-[13px] font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}