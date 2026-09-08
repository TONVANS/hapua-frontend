export type Weekday =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface TravelImage {
  id: string;
  imageUrl: string;
  order?: number | null;
  travelId: string;
  createdAt: string;
}

export interface TravelRecommend {
  id: string;
  placeName: string;
  description?: string | null;
  location: string;
  openTime?: string | null;
  closeTime?: string | null;
  openDays?: Weekday[];
  mapUrl?: string | null;
  coverImage?: string | null;
  images?: TravelImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTravelDto {
  placeName: string;
  location: string;
  description?: string;
  openTime?: string;
  closeTime?: string;
  openDays?: Weekday[];
  mapUrl?: string;
  coverImage?: string;
}

export interface UpdateTravelDto {
  placeName?: string;
  location?: string;
  description?: string;
  openTime?: string;
  closeTime?: string;
  openDays?: Weekday[];
  mapUrl?: string;
  coverImage?: string;
}
