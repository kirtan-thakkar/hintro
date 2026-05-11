import React from 'react';

export function StatCard({ title, value, icon: Icon, iconBgClass, iconColorClass }) {
  return (
    <div className="h-[80px] bg-white border border-[#E2E2E8] rounded-xl flex items-center px-4 gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className={`w-[42px] h-[42px] rounded-lg flex items-center justify-center shrink-0 ${iconBgClass} ${iconColorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-[13px] font-medium text-gray-600 mb-0.5">{title}</span>
        <span className="text-[18px] font-bold text-gray-900 leading-none">{value}</span>
      </div>
    </div>
  );
}
