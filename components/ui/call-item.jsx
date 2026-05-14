import React from 'react';
import { MoreVertical, MessageSquare } from 'lucide-react';

export function CallItem({ 
  initial = 'K',
  title = 'Design Call',
  time = '11:00 am',
  interactions,
  avatars = [
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=11"
  ] 
}) {
  return (
    <div className="w-full flex items-center justify-between py-3 px-4 border border-transparent hover:bg-gray-50 rounded-lg group transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-accent text-white flex flex-col items-center justify-center font-medium text-sm shrink-0">
          <img src="logo.png" height={100} width={100} />
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-900 leading-none">{title}</span>
          
          <div className="flex -space-x-1">
            {avatars.map((avatar, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-gray-200 border border-white ring-1 ring-white shrink-0 flex items-center justify-center text-[8px] text-gray-500 overflow-hidden">
                <img src={avatar} alt="User" className="w-full h-full object-cover" />
              </div>
            ))}
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
