'use client';

import React, { useEffect, useState } from 'react';
import {
  HeroSection,
  AseanTicker,
  ActivitiesBento,
  FeaturedHotelsSection,
  TravelGuideSection,
  CallToActionSection,
  ParallaxFloatingOrbs,
} from '@/components/home';
import { publicService } from '@/services';
import { LandingOverview } from '@/types';

export default function LandingPage() {
  const [overview, setOverview] = useState<LandingOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLandingData() {
      setLoading(true);
      try {
        const data = await publicService.getLandingOverview();
        if (data) {
          setOverview(data);
        }
      } catch (err) {
        console.error('Failed to load landing overview from backend:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLandingData();
  }, []);

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

      {/* HAPUA 5 Strategic Working Groups */}
      {/* <WorkingGroupsSection /> */}

      {/* Recommended Luxury Accommodations with Window Parallax */}
      <FeaturedHotelsSection hotels={hotels} loading={loading} />

      {/* Luang Prabang Travel & Diplomatic VIP Support with Parallax Vistas */}
      <TravelGuideSection travelSpots={travelSpots} loading={loading} />

      {/* Grand Delegate Verification & Registration CTA with Dynamic Flare Expansion */}
      <CallToActionSection />
    </div>
  );
}
