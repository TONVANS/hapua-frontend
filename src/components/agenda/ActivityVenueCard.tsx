'use client';

import React from 'react';
import { motion } from 'motion/react';
import { DoorOpen, Building, MapPin, Users, Wifi, MonitorPlay } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Room } from '@/types';

interface ActivityVenueCardProps {
  room: Room;
}

export function ActivityVenueCard({ room }: ActivityVenueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl space-y-5"
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#002660] to-[#1a3c7d] text-white flex items-center justify-center shadow-md">
            <DoorOpen className="w-5 h-5 text-[#ffe088]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#002660]">Meeting Room & Facility</h2>
            <p className="text-xs text-[#747781]">Luang Prabang International Convention Hall</p>
          </div>
        </div>

        <Badge className="bg-[#d2e5f6] text-[#002660] text-xs font-bold px-3 py-1 rounded-full border border-[#b0c6ff]/40">
          <Users className="w-3.5 h-3.5 mr-1" />
          Capacity: {room.capacity} Delegates
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-1">
        {room.imageUrl ? (
          <div className="w-full sm:w-52 aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shrink-0 group">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full sm:w-36 h-28 rounded-2xl bg-gradient-to-br from-[#d2e5f6] to-[#b0c6ff]/40 text-[#002660] flex flex-col items-center justify-center shrink-0 border border-[#b0c6ff]/50 shadow-xs">
            <Building className="w-8 h-8 mb-1 text-[#002660]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Hall Facility</span>
          </div>
        )}

        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-black text-[#002660]">{room.name}</h3>

          {room.location && (
            <p className="text-xs sm:text-sm text-[#4f616f] flex items-center gap-1.5 font-semibold">
              <MapPin className="w-4 h-4 text-[#cca730] shrink-0" />
              <span>{room.location}</span>
            </p>
          )}

          {room.description && (
            <p className="text-xs text-[#747781] leading-relaxed pt-1">
              {room.description}
            </p>
          )}

          {/* Facility Highlights */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-[11px] font-bold text-[#002660] bg-white/90 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
              <MonitorPlay className="w-3 h-3 text-[#cca730]" /> Plenary Screen
            </span>
            <span className="text-[11px] font-bold text-[#002660] bg-white/90 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-[#cca730]" /> 5G Delegation Stream
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
