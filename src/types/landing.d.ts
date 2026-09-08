import { Activity } from './activity';
import { Hotel } from './hotel';
import { TravelRecommend } from './travel';

export interface LandingStats {
  memberStates: number;
  accreditedDelegates: number;
  powerUtilities: number;
  eventDays: number;
}

export interface LandingOverview {
  stats: LandingStats;
  featuredActivities: Activity[];
  featuredHotels: Hotel[];
  featuredTravel: TravelRecommend[];
}
