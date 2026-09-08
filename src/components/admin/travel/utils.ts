import { TravelRecommend, Weekday } from '@/types';

export const ALL_WEEKDAYS: { key: Weekday; label: string; short: string }[] = [
  { key: 'MONDAY', label: 'Monday', short: 'Mon' },
  { key: 'TUESDAY', label: 'Tuesday', short: 'Tue' },
  { key: 'WEDNESDAY', label: 'Wednesday', short: 'Wed' },
  { key: 'THURSDAY', label: 'Thursday', short: 'Thu' },
  { key: 'FRIDAY', label: 'Friday', short: 'Fri' },
  { key: 'SATURDAY', label: 'Saturday', short: 'Sat' },
  { key: 'SUNDAY', label: 'Sunday', short: 'Sun' },
];

export const formatTravelTime = (timeStr?: string | null): string => {
  if (!timeStr) return '';
  const str = String(timeStr).trim();
  if (!str) return '';

  // If ISO datetime string like '1970-01-01T08:30:00.000Z' or '2026-08-24T08:30:00'
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

  // If standard time string like '08:30:00', '8:30', '08:30', or '08:00 AM'
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
};

export const getTravelAllImages = (travel: TravelRecommend | null): string[] => {
  if (!travel) return [];
  const imgs: string[] = [];
  if (travel.coverImage) imgs.push(travel.coverImage);
  if (travel.images && travel.images.length > 0) {
    travel.images.forEach((img) => {
      if (img.imageUrl && !imgs.includes(img.imageUrl)) {
        imgs.push(img.imageUrl);
      }
    });
  }
  return imgs;
};

export interface TimeOption {
  value: string;
  label: string;
}

export const TIME_OPTIONS: TimeOption[] = (() => {
  const list: TimeOption[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const hh = String(hour).padStart(2, '0');
      const mm = String(min).padStart(2, '0');
      const value = `${hh}:${mm}`;
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const displayHourStr = String(displayHour).padStart(2, '0');
      const label = `${value} (${displayHourStr}:${mm} ${period})`;
      list.push({ value, label });
    }
  }
  return list;
})();

export const getTimeOptionsWithCustom = (customTime?: string | null): TimeOption[] => {
  const formatted = formatTravelTime(customTime);
  if (!formatted) return TIME_OPTIONS;
  const exists = TIME_OPTIONS.some((o) => o.value === formatted);
  if (exists) return TIME_OPTIONS;

  const [hStr, mStr] = formatted.split(':');
  const h = parseInt(hStr, 10);
  const m = mStr || '00';
  const period = h < 12 ? 'AM' : 'PM';
  const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const displayHourStr = String(displayHour).padStart(2, '0');
  const customOption: TimeOption = {
    value: formatted,
    label: `${formatted} (${displayHourStr}:${m} ${period})`,
  };

  const list = [...TIME_OPTIONS, customOption];
  return list.sort((a, b) => a.value.localeCompare(b.value));
};


