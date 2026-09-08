import { Hotel } from '@/types';

export function getHotelImages(hotel: Hotel): string[] {
  const images: string[] = [];
  if (hotel.coverImage) images.push(hotel.coverImage);
  if (hotel.images && Array.isArray(hotel.images)) {
    hotel.images.forEach((img) => {
      const url = typeof img === 'string' ? img : img?.imageUrl;
      if (url && !images.includes(url)) images.push(url);
    });
  }
  return images;
}
