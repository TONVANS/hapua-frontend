import React from 'react';
import Link from 'next/link';
import { Globe, Mail, MapPin, Shield } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

export function Footer() {
  return (
    <footer className="w-full bg-[#f2f4f6] border-t border-[#e0e3e5] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs border border-[#cca730]/40 overflow-hidden">
                <img
                  src="/logo/logo.webp"
                  alt="42nd HAPUA Council"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#002660]">42nd HAPUA Council Meeting</h3>
                <p className="text-xs text-[#4f616f]">Luang Prabang, Lao PDR • 2026</p>
              </div>
            </div>
            <p className="text-sm text-[#444650] max-w-sm leading-relaxed">
              Heads of ASEAN Power Utilities/Authorities (HAPUA) advancing regional energy connectivity, multilateral power trading, and sustainable power transition across Southeast Asia.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#735c00] font-medium bg-[#ffe088]/20 px-3 py-1.5 rounded-lg w-fit border border-[#ffe088]/40">
              <span>Host Utility: Electricité du Laos (EDL)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#002660]">Summit Info</h4>
            <ul className="space-y-2 text-sm text-[#444650]">
              <li>
                <Link href="/" className="hover:text-[#002660] transition-colors">Overview</Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-[#002660] transition-colors">Council Agenda</Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-[#002660] transition-colors">Activities</Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-[#002660] transition-colors">Accommodations</Link>
              </li>
              <li>
                <Link href="/travel" className="hover:text-[#002660] transition-colors">Travel & Visits</Link>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div className="md:col-span-2 flex flex-col space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#002660]">Governance</h4>
            <ul className="space-y-2 text-sm text-[#444650]">
              <li>
                <span className="text-[#747781] cursor-not-allowed">Working Groups (WG 1-5)</span>
              </li>
              <li>
                <span className="text-[#747781] cursor-not-allowed">Secretariat Notices</span>
              </li>
              <li>
                <span className="text-[#747781] cursor-not-allowed">ASEAN Energy Centre</span>
              </li>
              <li>
                <Link href="/admin/login" className="text-[#002660] font-semibold hover:underline flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#002660]">Secretariat Contact</h4>
            <div className="space-y-2.5 text-sm text-[#444650]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#002660] shrink-0 mt-0.5" />
                <span>Luang Prabang International Convention Center, Lao PDR</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#002660] shrink-0" />
                <span>secretariat@hapua2026.la</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#002660] shrink-0" />
                <span>www.hapua.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Visitor Counter */}
        <div className="border-t border-[#e0e3e5] mt-10 pt-6 flex flex-col lg:flex-row justify-between items-center text-xs text-[#747781] gap-4">
          <p>© 2026 42nd HAPUA Council Secretariat. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[#4f616f]">
            <span>•</span>
            <span>Luang Prabang, Lao PDR</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

