import React from 'react';
import { Info } from 'lucide-react';

export function InfoTooltip({ text }) {
  return (
    <div className="flex items-start gap-2 bg-gray-900 border border-gray-800 p-3 rounded-md max-w-sm">
      <Info className="w-4 h-4 text-gray-400 mt-[2px] shrink-0" />
      <p className="text-xs text-gray-300 leading-relaxed font-sans">
        {text || "A real-time guide that helps you to structure conversations and stay on track by suggesting the right questions and responses during calls."}
      </p>
    </div>
  );
}
