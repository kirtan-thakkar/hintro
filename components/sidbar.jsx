'use client';

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
import { FeedbackModal } from "./feedback-modal";

export default function Sidebar({ isMobile, onClose }) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/#insights", label: "Call Insights", icon: Phone },
    {
      href: "/#knowledge",
      label: "Knowledge Base",
      icon: BookOpen,
      hasInfo: true,
    },
    { href: "/#prompts", label: "Prompts", icon: MessageSquare, hasInfo: true },
    { href: "/#boxy", label: "Boxy Controls", icon: Box, hasInfo: true },
  ];

  const bottomNavItems = [
    {
      href: "/feedback-history",
      label: "Feedback History",
      icon: ArchiveRestore,
    },
    { 
      label: "Feedback", 
      icon: Gift,
      onClick: () => setIsFeedbackOpen(true)
    },
  ];

  return (
    <>
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
                <SidebarItem 
                  key={item.label} 
                  {...item} 
                  isActive={pathname === item.href}
                />
              ))}
            </nav>
          </div>
          <div className="pt-[16px] pb-6 px-[20px] flex flex-col gap-2">
            {bottomNavItems.map((item) => (
              <SidebarItem 
                key={item.label} 
                {...item} 
                isActive={pathname === item.href}
              />
            ))}
            <button className="mt-2 w-[137px] h-[40px] bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm rounded-full transition-colors ml-[10px]">
              Upgrade
            </button>
          </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  );
}

function SidebarItem({ href, label, icon: Icon, isActive, hasInfo, onClick }) {
  const content = (
    <>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="truncate">{label}</span>
      </div>
      {hasInfo && <Info className="w-3 h-3 text-gray-400 shrink-0" />}
    </>
  );

  const className = `w-full flex items-center justify-between px-[10px] py-[8px] rounded-md font-medium text-sm transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
      : "text-gray-600 hover:bg-gray-50"
  }`;

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} className={className}>
      {content}
    </Link>
  );
}
