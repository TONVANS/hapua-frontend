import { TravelRecommend, Weekday } from '@/types';

export const WEEKDAY_NAMES: Record<Weekday, string> = {
  MONDAY: 'Mon',
  TUESDAY: 'Tue',
  WEDNESDAY: 'Wed',
  THURSDAY: 'Thu',
  FRIDAY: 'Fri',
  SATURDAY: 'Sat',
  SUNDAY: 'Sun',
};

export const ALL_WEEKDAYS: Weekday[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

export const formatTime = (timeStr?: string | null): string | null => {
  if (!timeStr) return null;
  const str = String(timeStr).trim();
  if (!str) return null;

  try {
    if (str.includes('T')) {
      const timePart = str.split('T')[1];
      if (timePart) {
        const match = timePart.match(/^(\d{1,2}):(\d{2})/);
        if (match) {
          const hh = match[1].padStart(2, '0');
          const mm = match[2];
          return `${hh}:${mm}`;
        }
      }
    }

    const timeMatch = str.match(/^(\d{1,2}):(\d{2})(?::\d{2})?(?:\s*(AM|PM))?/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      const minutes = timeMatch[2];
      const ampm = timeMatch[3]?.toUpperCase();

      if (ampm) {
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
      }

      const hh = String(hours).padStart(2, '0');
      return `${hh}:${minutes}`;
    }

    return str.slice(0, 5);
  } catch {
    return str;
  }
};

export const getSpotImages = (spot: TravelRecommend) => {
  const list: string[] = [];
  if (spot.coverImage) list.push(spot.coverImage);
  if (spot.images && spot.images.length > 0) {
    spot.images.forEach((img) => {
      if (img.imageUrl && !list.includes(img.imageUrl)) {
        list.push(img.imageUrl);
      }
    });
  }
  return list;
};
