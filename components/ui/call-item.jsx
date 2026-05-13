import React from 'react';
import { MoreVertical, MessageSquare } from 'lucide-react';

export function CallItem({ 
  initial = 'K',
  title = 'Design Call',
  time = '11:00 am',
  interactions,
  avatars = [] 
}) {
  return (
    <div className="w-full flex items-center justify-between py-3 px-4 border border-transparent hover:bg-gray-50 rounded-lg group transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-accent text-white flex flex-col items-center justify-center font-medium text-sm shrink-0">
          {initial}
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-900 leading-none">{title}</span>
          
          <div className="flex -space-x-1">
            <div className="w-4 h-4 rounded-full bg-gray-200 border border-white ring-1 ring-white shrink-0 flex items-center justify-center text-[8px] text-gray-500 overflow-hidden">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-gray-400" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <div className="w-4 h-4 rounded-full bg-gray-200 border border-white ring-1 ring-white shrink-0 flex items-center justify-center text-[8px] text-gray-500 overflow-hidden">
               <svg viewBox="0 0 24 24" className="w-3 h-3 text-gray-400" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <div className="w-4 h-4 rounded-full bg-gray-200 border border-white ring-1 ring-white shrink-0 flex items-center justify-center text-[8px] text-gray-500 overflow-hidden">
               <svg viewBox="0 0 24 24" className="w-3 h-3 text-gray-400" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
        <span>{time}</span>
        
        {interactions && (
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            <span>{interactions} AI Interactions</span>
          </div>
        )}
        
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
