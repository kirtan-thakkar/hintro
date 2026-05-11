import Link from 'next/link';
import { Info } from 'lucide-react';

export function NavItem({ 
  href, 
  label, 
  icon: Icon, 
  isActive, 
  hasInfo,
  className = ''
}) {
  return (
    <Link 
      href={href} 
      className={`w-full flex items-center justify-between px-[10px] py-[8px] rounded-md font-medium text-sm transition-colors ${
        isActive 
          ? 'bg-[#F0F4FF] text-[#2563EB] hover:bg-[#E0E7FF]' 
          : 'text-[#475569] hover:bg-[#F1F5F9]'
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span className="truncate">{label}</span>
      </div>
      {hasInfo && (
        <Info className="w-3 h-3 text-gray-400 shrink-0" />
      )}
    </Link>
  );
}
