'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Lock,
  Globe2,
  Zap,
  Clock,
  Shield,
  Activity,
  Building2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { LoginFormData } from '@/lib/validations';
import { useAuthStore } from '@/store/useAuthStore';
import { AdminLoginForm, SessionExpiredNotice } from '@/components/admin/login';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [authError, setAuthError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live summit local time (GMT+7 Luang Prabang, Lao PDR)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Vientiane',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setCurrentTime(formatted);
      } catch {
        setCurrentTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    clearError();

    const toastId = toast.loading('Authenticating credentials...', {
      description: 'Verifying with the HAPUA Council Security Server...',
    });

    try {
      await login(data);
      toast.success('Authentication Successful', {
        id: toastId,
        description: 'Welcome to the 42nd HAPUA Council Secretariat Terminal. Redirecting...',
        duration: 3000,
      });
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      let errorMessage = 'Invalid email or password. Please verify your credentials.';

      if (err && typeof err === 'object') {
        const axiosErr = err as {
          response?: {
            data?: {
              message?: string | string[];
              error?: string;
            };
          };
          message?: string;
        };

        const serverMessage = axiosErr.response?.data?.message;
        if (Array.isArray(serverMessage) && serverMessage.length > 0) {
          errorMessage = serverMessage.join(', ');
        } else if (typeof serverMessage === 'string' && serverMessage.trim()) {
          errorMessage = serverMessage;
        } else if (axiosErr.response?.data?.error) {
          errorMessage = axiosErr.response.data.error;
        } else if (axiosErr.message) {
          errorMessage = axiosErr.message;
        }
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setAuthError(errorMessage);

      toast.error('Authentication Failed', {
        id: toastId,
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#f7f9fb] text-[#191c1e] p-4 sm:p-6 lg:p-8 relative overflow-x-hidden selection:bg-[#002660] selection:text-white">
      <Suspense fallback={null}>
        <SessionExpiredNotice onError={setAuthError} />
      </Suspense>

      {/* Atmospheric Ambient Lighting Gradients */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#d2e5f6]/70 via-[#b0c6ff]/40 to-transparent rounded-full blur-3xl opacity-80 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#ffe088]/35 via-[#d2e5f6]/40 to-transparent rounded-full blur-3xl opacity-70 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial from-[#002660]/[0.02] to-transparent rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ASEAN Energy Grid Mesh Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #002660 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Top Header Navigation */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between relative z-10 py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#002660] hover:text-[#1a3c7d] bg-white/90 hover:bg-white px-4 py-2 rounded-xl border border-[#e2e8f0] shadow-xs backdrop-blur-md transition-all duration-200 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#002660] group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Public Portal</span>
        </Link>

        {/* Security Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#e2e8f0] shadow-xs backdrop-blur-md text-xs font-medium text-[#002660]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cca730] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cca730]" />
          </span>
          <span className="font-semibold">Council Node Active</span>
          <span className="text-[#c4c6d2]">|</span>
          <span className="text-[#4f616f] font-mono text-[11px]">Luang Prabang 2026</span>
        </div>
      </header>

      {/* Main Diplomatic Gateway Showcase & Card */}
      <main className="w-full max-w-6xl mx-auto my-auto relative z-10 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Institutional Summit Showcase (Hidden on small screens, prominent on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6 text-left hidden lg:block"
          >
            {/* Summit Badge & Emblem */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#d2e5f6]/60 border border-[#b0c6ff]/50 text-[#002660] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#cca730]" />
              <span>42nd HAPUA COUNCIL MEETING • LAO PDR</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl xl:text-4xl font-extrabold text-[#002660] tracking-tight leading-tight">
                Heads of ASEAN Power Utilities / Authorities
              </h2>
              <p className="text-sm text-[#4f616f] leading-relaxed max-w-lg font-normal">
                Restricted diplomatic command center for managing delegations, bilateral activities, summit decrees, and the ASEAN Power Grid cooperation framework.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-2 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-white/85 border border-[#e2e8f0] shadow-xs backdrop-blur-md space-y-1.5 hover:border-[#002660]/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#002660]/5 flex items-center justify-center text-[#002660]">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-[#002660]">10 ASEAN Utilities</div>
                <div className="text-[11px] text-[#747781] leading-tight">
                  Unified delegation protocols & credentials
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/85 border border-[#e2e8f0] shadow-xs backdrop-blur-md space-y-1.5 hover:border-[#002660]/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-[#cca730]/10 flex items-center justify-center text-[#cca730]">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-[#002660]">Energy Interconnection</div>
                <div className="text-[11px] text-[#747781] leading-tight">
                  Sustainable cross-border power grid accords
                </div>
              </div>
            </div>

            {/* Live Summit Clock & Security Protocol Status */}
            <div className="pt-2 flex items-center gap-4 text-xs text-[#4f616f]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 border border-[#e2e8f0] shadow-2xs font-mono">
                <Clock className="w-3.5 h-3.5 text-[#002660]" />
                <span className="text-[#002660] font-semibold">{currentTime || '00:00:00'}</span>
                <span className="text-[10px] text-[#747781] font-sans font-medium">(ICT / GMT+7)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#747781]">
                <ShieldCheck className="w-4 h-4 text-[#002660]" />
                <span>E2E Authenticated Terminal</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Executive Secretariat Authentication Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="w-full max-w-md mx-auto lg:col-span-6 lg:ml-auto"
          >
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 shadow-[0_24px_60px_-15px_rgba(0,38,96,0.12)] border border-white/90 relative overflow-hidden transition-all">
              {/* Card Top Accent Band */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#002660] via-[#cca730] to-[#002660]" />

              {/* Official Emblem & Branding */}
              <div className="text-center mb-6 pt-2">
                {/* Official Logo Container */}
                <div className="relative inline-block mb-3">
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-white p-2.5 mx-auto shadow-lg shadow-[#002660]/10 border-2 border-[#cca730]/40 ring-4 ring-[#d2e5f6]/40 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
                    <img
                      src="/logo/logo.webp"
                      alt="42nd HAPUA Council Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 bg-[#d4af37] text-white p-1 rounded-full shadow-md border-2 border-white"
                    title="Official Council Crest"
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>

                <h1 className="text-2xl sm:text-2xl font-extrabold text-[#002660] tracking-tight">
                  Secretariat Portal
                </h1>
                <p className="text-xs text-[#4f616f] mt-1 font-medium">
                  42nd HAPUA Council Meeting • Luang Prabang 2026
                </p>

                <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full bg-[#f2f4f6] text-[11px] font-semibold text-[#002660] border border-[#e2e8f0]">
                  <Lock className="w-3 h-3 text-[#cca730]" />
                  <span>Restricted Diplomatic Gateway</span>
                </div>
              </div>

              {/* Inline Error Alert */}
              {(authError || error) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 p-3.5 rounded-2xl bg-[#ffdad6]/80 border border-[#ba1a1a]/30 text-[#93000a] text-xs flex items-start gap-2.5 shadow-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#ba1a1a]" />
                  <div className="flex-1">
                    <p className="font-bold">Authentication Notice</p>
                    <p className="text-[11px] text-[#93000a]/90 mt-0.5 leading-relaxed">
                      {authError || error}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Login Form */}
              <AdminLoginForm onSubmit={onSubmit} isLoading={isLoading} />

              {/* Security & Protocol Notice */}
              <div className="mt-6 pt-4 border-t border-[#eceef0] flex items-center justify-between text-[11px] text-[#747781]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#002660]" />
                  <span>TLS 1.3 256-Bit Encrypted</span>
                </div>
                <span className="font-mono text-[10px] text-[#747781] bg-[#f2f4f6] px-2 py-0.5 rounded-md border border-[#e2e8f0]">
                  v42.0.26
                </span>
              </div>
            </div>

            {/* Mobile Only Summit Attribution */}
            <div className="lg:hidden text-center mt-4 space-y-1">
              <p className="text-[11px] text-[#4f616f] font-medium">
                Host Utility: Electricite du Laos (EDL)
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer Credentials Info */}
      <footer className="w-full max-w-6xl mx-auto text-center relative z-10 py-2">
        <p className="text-[11px] text-[#747781]">
          Heads of ASEAN Power Utilities / Authorities (HAPUA) Secretariat © 2026. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
