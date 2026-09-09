import React from 'react';
import {
  HeroSection,
  AseanTicker,
  ActivitiesBento,
  FeaturedHotelsSection,
  TravelGuideSection,
  CallToActionSection,
  ParallaxFloatingOrbs,
} from '@/components/home';
import { LandingOverview } from '@/types';

// Cache data on Next.js server for 5 minutes (ISR)
export const revalidate = 300;

async function getLandingData(): Promise<LandingOverview | null> {
  const backendUrl =
    process.env.INTERNAL_BACKEND_URL && process.env.INTERNAL_BACKEND_URL.startsWith('http')
      ? process.env.INTERNAL_BACKEND_URL
      : 'http://localhost:3001/api/v1';

  try {
    const res = await fetch(`${backendUrl}/public/landing`, {
      next: { revalidate: 300 },
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

  const hotels = overview?.featuredHotels?.slice(0, 3) || [];
  const travelSpots = overview?.featuredTravel?.slice(0, 2) || [];

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
