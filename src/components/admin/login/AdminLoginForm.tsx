'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  Check,
  Shield,
  AlertCircle,
  HelpCircle,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginSchema, LoginFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminLoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

const REMEMBER_EMAIL_KEY = 'hapua_admin_remembered_email';

export function AdminLoginForm({ onSubmit, isLoading }: AdminLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Load remembered email on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
      if (savedEmail) {
        setValue('email', savedEmail);
        setRememberEmail(true);
      }
    } catch {
      // Ignore localStorage errors in restricted environments
    }
  }, [setValue]);

  // Caps lock detection
  const handleKeyActivity = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState('CapsLock'));
    }
  };

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      if (rememberEmail) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, data.email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
    } catch {
      // Ignore localStorage errors
    }
    await onSubmit(data);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-5" noValidate>
        {/* Email Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="admin-email"
              className="text-xs font-semibold text-[#002660] tracking-wide flex items-center gap-1.5"
            >
              <span>Official Email Address</span>
              <span className="text-[#ba1a1a]">*</span>
            </Label>
            <span className="text-[11px] text-[#4f616f] font-medium">Secretariat Account</span>
          </div>

          <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#747781] group-focus-within:text-[#002660] transition-colors duration-200">
              <Mail className="w-4 h-4" />
            </div>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              placeholder="admin@hapua.org"
              disabled={isLoading}
              className={`pl-10 h-11 bg-white/95 border text-sm rounded-xl shadow-xs transition-all duration-200 placeholder:text-slate-400 ${
                errors.email
                  ? 'border-[#ba1a1a] focus:border-[#ba1a1a] focus-visible:ring-2 focus-visible:ring-[#ba1a1a]/20 text-[#ba1a1a]'
                  : 'border-[#c4c6d2] hover:border-[#747781] focus:border-[#002660] focus-visible:ring-2 focus-visible:ring-[#002660]/20 text-[#191c1e]'
              }`}
              {...register('email')}
            />
          </div>

          <AnimatePresence>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5 text-xs text-[#ba1a1a] font-medium pt-0.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="admin-password"
              className="text-xs font-semibold text-[#002660] tracking-wide flex items-center gap-1.5"
            >
              <span>Security Password</span>
              <span className="text-[#ba1a1a]">*</span>
            </Label>
            <span className="text-[11px] text-[#4f616f] font-medium flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#cca730]" />
              <span>Encrypted</span>
            </span>
          </div>

          <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#747781] group-focus-within:text-[#002660] transition-colors duration-200">
              <Lock className="w-4 h-4" />
            </div>
            <Input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••••••"
              disabled={isLoading}
              onKeyDown={handleKeyActivity}
              onKeyUp={handleKeyActivity}
              className={`pl-10 pr-11 h-11 bg-white/95 border text-sm rounded-xl shadow-xs transition-all duration-200 placeholder:text-slate-400 font-mono tracking-wider ${
                errors.password
                  ? 'border-[#ba1a1a] focus:border-[#ba1a1a] focus-visible:ring-2 focus-visible:ring-[#ba1a1a]/20'
                  : 'border-[#c4c6d2] hover:border-[#747781] focus:border-[#002660] focus-visible:ring-2 focus-visible:ring-[#002660]/20'
              }`}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isLoading}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#747781] hover:text-[#002660] hover:bg-[#f2f4f6] rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              title={showPassword ? 'Hide security password' : 'Show security password'}
              aria-label={showPassword ? 'Hide security password' : 'Show security password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 transition-transform active:scale-90" />
              ) : (
                <Eye className="w-4 h-4 transition-transform active:scale-90" />
              )}
            </button>
          </div>

          {/* Caps Lock Alert */}
          <AnimatePresence>
            {capsLockActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ffe088]/30 border border-[#cca730]/40 text-[#574500] text-[11px] font-semibold mt-1">
                  <AlertCircle className="w-3 h-3 text-[#cca730] shrink-0" />
                  <span>Caps Lock is ON — check your keystrokes</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {errors.password && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5 text-xs text-[#ba1a1a] font-medium pt-0.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.password.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Options Row: Remember Email & Help */}
        <div className="flex items-center justify-between pt-1">
          <label
            htmlFor="remember-email-checkbox"
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div
              id="remember-email-checkbox"
              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all duration-150 ${
                rememberEmail
                  ? 'bg-[#002660] border-[#002660] text-white shadow-xs'
                  : 'border-[#c4c6d2] bg-white group-hover:border-[#002660]'
              }`}
              onClick={() => setRememberEmail((prev) => !prev)}
              role="checkbox"
              aria-checked={rememberEmail}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setRememberEmail((prev) => !prev);
                }
              }}
            >
              {rememberEmail && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="text-xs text-[#191c1e] font-medium group-hover:text-[#002660] transition-colors">
              Remember email
            </span>
          </label>

          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4f616f] hover:text-[#002660] transition-colors cursor-pointer group"
          >
            <HelpCircle className="w-3 h-3 text-[#747781] group-hover:text-[#002660]" />
            <span>Need Support?</span>
          </button>
        </div>

        {/* Submit CTA Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-[#002660] hover:bg-[#1a3c7d] active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md shadow-[#002660]/20 hover:shadow-lg hover:shadow-[#002660]/25 transition-all duration-200 mt-2 cursor-pointer relative overflow-hidden group border border-white/10"
        >
          {/* Subtle gold shine effect on hover */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#ffe088]" />
              <span>Authenticating credentials...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>Sign In to Secretariat Terminal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          )}
        </Button>
      </form>

      {/* Diplomatic Assistance Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setShowHelpModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e2e8f0] z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
                <div className="flex items-center gap-2 text-[#002660] font-bold text-sm">
                  <Shield className="w-4 h-4 text-[#cca730]" />
                  <span>Secretariat Credential Support</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="p-1 rounded-lg text-[#747781] hover:text-[#002660] hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs text-[#4f616f] leading-relaxed">
                <p>
                  Access to the <strong>42nd HAPUA Council Administration Gateway</strong> is restricted to authorized Secretariat personnel and certified delegation officers.
                </p>
                <div className="p-3 bg-[#f7f9fb] rounded-xl border border-[#eceef0] space-y-1.5">
                  <div className="font-semibold text-[#002660]">Default / Test Credentials:</div>
                  <div className="font-mono text-[11px] text-[#191c1e] bg-white p-2 rounded-lg border border-[#e2e8f0]">
                    Email: <span className="font-semibold">admin@hapua.org</span>
                    <br />
                    Password: <span className="font-semibold">password123</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#747781]">
                  If your account has been locked or if you require 2FA verification reset, contact the Secretariat IT Command Desk at <span className="text-[#002660] font-medium">sec@hapua.org</span>.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="h-9 px-4 bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-lg font-medium cursor-pointer"
                >
                  Understood
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
