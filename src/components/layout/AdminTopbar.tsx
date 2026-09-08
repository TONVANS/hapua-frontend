'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LogOut, User as UserIcon, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/button';

export function AdminTopbar() {
  const pathname = usePathname();
  const { user, logout, initialize } = useAuthStore();
  const { toggleMobileMenu } = useUIStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Compute page title from path
  const getPageTitle = () => {
    if (pathname.includes('/admin/dashboard')) return 'Dashboard Overview';
    if (pathname.includes('/admin/delegations')) return 'Delegation Management';
    if (pathname.includes('/admin/activities')) return 'Activity Operations';
    if (pathname.includes('/admin/rooms')) return 'Meeting Rooms';
    if (pathname.includes('/admin/hotels')) return 'Hotel Accommodations';
    if (pathname.includes('/admin/travel')) return 'Travel & Hospitality';
    if (pathname.includes('/admin/countries')) return 'Country Master Data';
    if (pathname.includes('/admin/organizations')) return 'Organization Master Data';
    if (pathname.includes('/admin/gallery')) return 'Media & Photo Gallery';
    return 'Admin Console';
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/95 backdrop-blur-md border-b border-[#e6e8ea] flex items-center justify-between px-4 sm:px-6 shrink-0 transition-colors">
      {/* Left: Mobile Toggle & Title / Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 -ml-2 rounded-xl text-[#002660] hover:bg-[#f2f4f6] transition-colors focus:outline-hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 truncate">
          <h1 className="text-base sm:text-lg font-bold text-[#002660] tracking-tight truncate">
            {getPageTitle()}
          </h1>
          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d2e5f6] text-[#002660] shrink-0">
            HAPUA 42nd
          </span>
        </div>
      </div>

      {/* Right: User Actions */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* User Info */}
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-[#e6e8ea]">
          <div className="w-8 h-8 rounded-full bg-[#d2e5f6] text-[#002660] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            {user?.firstName ? user.firstName.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="hidden sm:flex flex-col text-left truncate max-w-[150px]">
            <span className="text-xs font-bold text-[#191c1e] leading-tight truncate">
              {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Administrator'}
            </span>
            <span className="text-[10px] text-[#4f616f] truncate">{user?.email || 'admin@hapua.org'}</span>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-[#ba1a1a] hover:bg-[#ffdad6]/40 hover:text-[#ba1a1a] text-xs h-8 sm:h-9 px-2.5 sm:px-3 rounded-lg"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}

