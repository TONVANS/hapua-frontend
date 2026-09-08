export interface DashboardStats {
  totalDelegations: number;
  totalActivities: number;
  totalRooms: number;
  totalHotels: number;
}

export interface ActivityRegistrationStat {
  activityId: string;
  activityName: string;
  date: string;
  registeredCount: number;
}
