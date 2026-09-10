import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';
import { LandingOverview } from '@/types';

// Dynamically code-split below-the-fold components to slash initial JS execution & TBT
const ParallaxFloatingOrbs = dynamic(
  () => import('@/components/home/ParallaxFloatingOrbs').then((m) => m.ParallaxFloatingOrbs)
);

const AseanTicker = dynamic(
  () => import('@/components/home/AseanTicker').then((m) => m.AseanTicker),
  {
    loading: () => <div className="h-44 my-8 w-full max-w-7xl mx-auto px-4 animate-pulse bg-slate-100/60 rounded-2xl" />,
  }
);

const ActivitiesBento = dynamic(
  () => import('@/components/home/ActivitiesBento').then((m) => m.ActivitiesBento),
  {
    loading: () => <div className="min-h-[500px] my-12 w-full max-w-7xl mx-auto px-4 animate-pulse bg-slate-100/40 rounded-3xl" />,
  }
);

const FeaturedHotelsSection = dynamic(
  () => import('@/components/home/FeaturedHotelsSection').then((m) => m.FeaturedHotelsSection),
  {
    loading: () => <div className="min-h-[420px] my-12 w-full max-w-7xl mx-auto px-4 animate-pulse bg-slate-100/40 rounded-3xl" />,
  }
);

const TravelGuideSection = dynamic(
  () => import('@/components/home/TravelGuideSection').then((m) => m.TravelGuideSection),
  {
    loading: () => <div className="min-h-[420px] my-12 w-full max-w-7xl mx-auto px-4 animate-pulse bg-slate-100/40 rounded-3xl" />,
  }
);

const CallToActionSection = dynamic(
  () => import('@/components/home/CallToActionSection').then((m) => m.CallToActionSection),
  {
    loading: () => <div className="min-h-[320px] my-12 w-full max-w-5xl mx-auto px-4 animate-pulse bg-slate-100/40 rounded-3xl" />,
  }
);

// Cache data on Next.js server for 5 minutes (ISR)
export const revalidate = 300;

async function getLandingData(): Promise<LandingOverview | null> {
  const backendUrl =
    process.env.INTERNAL_BACKEND_URL && process.env.INTERNAL_BACKEND_URL.startsWith('http')
      ? process.env.INTERNAL_BACKEND_URL
      : 'http://localhost:3001/api/v1';

  try {
    const res = await fetch(`${backendUrl}/public/landing`, {
      next: { revalidate: 300, tags: ['landing-overview'] },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch landing overview: ${res.status} ${res.statusText}`);
      return null;
    }

    const payload = await res.json();
    // In case payload was wrapped by backend TransformInterceptor { statusCode, message, data }
    return payload?.data || payload;
  } catch (err) {
    console.error('Failed to load landing overview on server:', err);
    return null;
  }
}

export default async function LandingPage() {
  const overview = await getLandingData();

  const stats = overview?.stats || {
    memberStates: 10,
    accreditedDelegates: 500,
    powerUtilities: 50,
    eventDays: 5,
  };

  const hotels = overview?.featuredHotels?.slice(0, 2) || [];
  const travelSpots = overview?.featuredTravel?.slice(0, 3) || [];

  return (
    <div className="relative">
      {/* Multi-tier floating parallax particles & geometric energy constellation */}
      <ParallaxFloatingOrbs />

      {/* Hero Section (Multi-Plane Parallax Depth & Official Branding) */}
      <HeroSection stats={stats} />

      {/* ASEAN Power Utilities Institutional Interconnectivity Ribbon */}
      <AseanTicker />

      {/* Council Activities Bento Grid with Column Parallax */}
      <ActivitiesBento />

      {/* Recommended Luxury Accommodations with Window Parallax */}
      <FeaturedHotelsSection hotels={hotels} loading={false} />

      {/* Luang Prabang Travel & Diplomatic VIP Support with Parallax Vistas */}
      <TravelGuideSection travelSpots={travelSpots} loading={false} />

      {/* Grand Delegate Verification & Registration CTA with Dynamic Flare Expansion */}
      <CallToActionSection />
    </div>
  );
}
