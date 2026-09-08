'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, UserCheck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '/' },
    { label: 'Agenda', href: '/agenda' },
    { label: 'Activities', href: '/activities' },
    { label: 'Hotel Guide', href: '/hotels' },
    { label: 'Travel Guide', href: '/travel' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300">
      {/* ASEAN Flags Ribbon */}
      <div className="w-full bg-[#f7f9fb]/90 backdrop-blur-md py-1.5 overflow-hidden border-b border-[#e2e8f0]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-[#444650]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#cca730] animate-pulse"></span>
            <span className="font-medium tracking-wide">42nd HAPUA Council Meeting • Luang Prabang, Lao PDR</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span>21 - 25 Sep, 2026</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-[#002660] hover:text-[#1a3c7d] font-semibold transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-sm shadow-[#002660]/5'
            : 'bg-[#f7f9fb]/75 backdrop-blur-xl py-4 border-b border-[#e2e8f0]/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md shadow-[#002660]/10 border border-[#cca730]/40 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/logo/logo.webp"
                alt="42nd HAPUA Council"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#002660] tracking-tight leading-tight group-hover:text-[#1a3c7d] transition-colors">
                42nd HAPUA Council
              </span>
              <span className="text-[11px] text-[#4f616f] font-medium tracking-wider uppercase">
                Luang Prabang 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-all relative py-1 ${
                    isActive
                      ? 'text-[#002660] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#002660] after:rounded-full'
                      : 'text-[#444650] hover:text-[#002660]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/activities#register">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-[#002660]/20 text-[#002660] hover:bg-[#d2e5f6]/50 transition-all font-medium text-xs h-9 px-4"
              >
                <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                Check In / Code
              </Button>
            </Link>
            <Link href="/agenda">
              <Button
                size="sm"
                className="rounded-full bg-[#002660] hover:bg-[#1a3c7d] text-white shadow-md shadow-[#002660]/20 active:scale-95 transition-all text-xs font-semibold h-9 px-5"
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                View Schedule
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#002660] hover:bg-[#eceef0] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-modal border-t border-[#e2e8f0] px-4 pt-3 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-[#d2e5f6] text-[#002660] font-semibold'
                      : 'text-[#444650] hover:bg-[#f2f4f6]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#e2e8f0] flex flex-col gap-2">
                <Link
                  href="/activities#register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full justify-center text-xs">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Verify Delegation Code
                  </Button>
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full bg-[#002660] hover:bg-[#1a3c7d] text-white justify-center text-xs">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
