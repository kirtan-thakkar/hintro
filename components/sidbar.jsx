import Link from "next/link";
import {
  LayoutDashboard,
  Phone,
  BookOpen,
  MessageSquare,
  Box,
  ArchiveRestore,
  Gift,
  Info,
  X,
} from "lucide-react";

export default function Sidebar({ isMobile, onClose }) {
  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard, isActive: true },
    { href: "/insights", label: "Call Insights", icon: Phone },
    {
      href: "/knowledge",
      label: "Knowledge Base",
      icon: BookOpen,
      hasInfo: true,
    },
    { href: "/prompts", label: "Prompts", icon: MessageSquare, hasInfo: true },
    { href: "/boxy", label: "Boxy Controls", icon: Box, hasInfo: true },
  ];

  const bottomNavItems = [
    {
      href: "/feedback-history",
      label: "Feedback History",
      icon: ArchiveRestore,
    },
    { href: "/feedback", label: "Feedback", icon: Gift },
  ];

  return (
    <div className={`w-[262px] h-screen bg-white border-r border-[#E2E2E8] flex flex-col font-sans shrink-0 divide-y divide-[#E2E2E8] ${isMobile ? 'shadow-2xl' : ''}`}>
      {/* Header */}
      <div className={`w-full h-[64px] shrink-0 flex items-center ${isMobile ? 'px-4' : 'justify-center'}`}>
        {isMobile && (
          <button onClick={onClose} className="p-1 mr-3 text-gray-700 hover:bg-gray-100 rounded-md">
            <X className="w-5 h-5" />
          </button>
        )}
        <span className={`text-xl font-bold text-gray-900 ${isMobile ? '' : ''}`}>Hintro</span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 pt-[26px]">
          <nav className="pl-[30px] pr-[20px] flex flex-col gap-[6px]">
            {navItems.map((item) => (
              <SidebarItem key={item.href} {...item} />
            ))}
          </nav>
        </div>
        <div className="pt-[16px] pb-6 px-[20px] flex flex-col gap-2">
          {bottomNavItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
          <button className="mt-2 w-[137px] h-[40px] bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm rounded-full transition-colors ml-[10px]">
            Upgrade
          </button>
        </div>
    </div>
  );
}

function SidebarItem({ href, label, icon: Icon, isActive, hasInfo }) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center justify-between px-[10px] py-[8px] rounded-md font-medium text-sm transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="truncate">{label}</span>
      </div>
      {hasInfo && <Info className="w-3 h-3 text-gray-400 shrink-0" />}
    </Link>
  );
}
