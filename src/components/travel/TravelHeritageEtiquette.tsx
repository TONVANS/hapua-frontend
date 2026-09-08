import React from 'react';
import { Sparkles } from 'lucide-react';

export function TravelHeritageEtiquette() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
      <div className="glass-modal p-8 sm:p-12 rounded-3xl border border-white/80 shadow-xl relative overflow-hidden space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d2e5f6] text-[#002660] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Delegate Visiting Etiquette
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002660] tracking-tight">
            UNESCO Heritage Guidelines
          </h2>
          <p className="text-xs sm:text-sm text-[#444650] max-w-3xl leading-relaxed">
            As esteemed guests of Lao PDR, we encourage all delegations to experience the ancient spiritual and natural beauty of Luang Prabang while observing local cultural customs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white/70 border border-[#e2e8f0] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#002660] text-[#ffe088] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-[#002660]">Sacred Temple Dress Code</h4>
            <p className="text-xs text-[#444650] leading-relaxed">
              Shoulders and knees must be respectfully covered when entering sacred Buddhist monasteries (Vats) and the Royal Palace Museum.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-[#e2e8f0] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#002660] text-[#ffe088] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-[#002660]">Morning Alms Giving (Tak Bat)</h4>
            <p className="text-xs text-[#444650] leading-relaxed">
              Witness the dawn saffron-robed procession silently from a respectful distance. Flash photography and obstructing monks are strictly prohibited.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-[#e2e8f0] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#002660] text-[#ffe088] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-[#002660]">Eco-Tourism & Waterfalls</h4>
            <p className="text-xs text-[#444650] leading-relaxed">
              Preserve pristine travertine waterways by swimming only in designated zones at Kuang Si and leaving no trace in national park reserves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
