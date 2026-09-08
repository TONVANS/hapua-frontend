import { Hotel } from '@/types';

export const STAR_RATING_LABELS: Record<number, string> = {
  5: '5 Stars - Luxury Hotel / Resort',
  4: '4 Stars - Superior / Executive',
  3: '3 Stars - Standard / Boutique',
  2: '2 Stars - Economy Accommodations',
  1: '1 Star - Budget Stay',
};

export const getHotelAllImages = (hotel: Hotel | null): string[] => {
  if (!hotel) return [];
  const imgs: string[] = [];
  if (hotel.coverImage) imgs.push(hotel.coverImage);
  if (hotel.images && hotel.images.length > 0) {
    hotel.images.forEach((img) => {
      if (img.imageUrl && !imgs.includes(img.imageUrl)) {
        imgs.push(img.imageUrl);
      }
    });
  }
  return imgs;
};
