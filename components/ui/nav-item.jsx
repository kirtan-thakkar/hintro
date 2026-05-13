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
          ? 'bg-blue-50 text-primary hover:bg-blue-100' 
          : 'text-muted-foreground hover:bg-muted'
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
