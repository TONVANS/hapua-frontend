'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Loader2, Search, Filter, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ActivitiesHeader,
  PublicActivityCard,
  useDelegateVerification,
} from '@/components/activities';
import { useActivityStore } from '@/store';
import { Input } from '@/components/ui/input';

export default function ActivitiesPage() {
  const { activities, isLoading, fetchPublicActivities } = useActivityStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const {
    delegationCode,
    setDelegationCode,
    verifying,
    verifiedDelegate,
    registering,
    isActivityRegistered,
    markActivityRegistered,
    handleRegisterActivity,
  } = useDelegateVerification();

  useEffect(() => {
    fetchPublicActivities({ limit: 50 });
  }, [fetchPublicActivities]);

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesSearch =
        search.trim() === '' ||
        act.name.toLowerCase().includes(search.toLowerCase()) ||
        (act.description && act.description.toLowerCase().includes(search.toLowerCase())) ||
        (act.room && act.room.name.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = statusFilter === 'ALL' || act.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activities, search, statusFilter]);

  return (
    <main className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative z-10">
      {/* Delegate Verification & Hero Header Component */}
      <ActivitiesHeader />

      {/* Directory Controls & Search */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pt-6 border-t border-slate-200/80"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#002660] tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#cca730]" />
            <span>Council Sessions & Excursions Directory</span>
          </h2>
          <p className="text-xs text-[#4f616f] mt-0.5">
            Select any activity to check in with your registered delegation code or explore session briefs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search activities & tours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 text-xs bg-white/90 border-slate-200 rounded-xl shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'UPCOMING', 'ONGOING', 'COMPLETED'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#002660] text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-[#444650] border border-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid of Activities */}
      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center text-xs text-[#4f616f] glass-panel rounded-3xl p-12 max-w-xl mx-auto shadow-lg">
          <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#002660]" />
          <span className="font-bold text-sm text-[#002660]">Loading Summit Activities Directory...</span>
          <span className="text-xs text-[#747781] mt-1">Fetching plenary and technical sessions</span>
        </div>
      ) : filteredActivities.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center glass-panel rounded-3xl p-10 max-w-md mx-auto shadow-lg border border-white/80"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#002660]/5 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-7 h-7 text-[#cca730]" />
          </div>
          <h3 className="font-black text-lg text-[#002660]">No activities found</h3>
          <p className="text-xs text-[#4f616f] mt-1.5 leading-relaxed">
            No summit sessions match your query. Try resetting your search or status filter.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {filteredActivities.map((act, idx) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <PublicActivityCard
                activity={act}
                isRegistered={isActivityRegistered(act.id)}
                verifiedDelegate={verifiedDelegate}
                delegationCode={delegationCode}
                registering={registering}
                onRegister={handleRegisterActivity}
                onRegisterSuccess={markActivityRegistered}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
