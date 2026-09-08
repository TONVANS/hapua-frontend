export interface HotelImage {
  id: string;
  imageUrl: string;
  order?: number | null;
  hotelId: string;
  createdAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  description?: string | null;
  address: string;
  starRating?: number | null;
  contactInfo?: string | null;
  coverImage?: string | null;
  websiteUrl?: string | null;
  mapUrl?: string | null;
  images?: HotelImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateHotelDto {
  name: string;
  address: string;
  description?: string;
  starRating?: number;
  contactInfo?: string;
  websiteUrl?: string;
  mapUrl?: string;
  distanceToVenue?: number;
  bookingUrl?: string;
  imageUrl?: string;
}

export interface UpdateHotelDto {
  name?: string;
  address?: string;
  description?: string;
  starRating?: number;
  contactInfo?: string;
  websiteUrl?: string;
  mapUrl?: string;
  distanceToVenue?: number;
  bookingUrl?: string;
  imageUrl?: string;
}

