import React from 'react';
import { Clock, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Activity, ActivityStatus } from '@/types';

/** Format Date/ISO to YYYY-MM-DD for <input type="date"> */
export function toDateInputValue(val?: string | Date | null): string {
  if (!val) return '';
  try {
    if (typeof val === 'string' && val.includes('T')) {
      return val.split('T')[0];
    }
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
      return val;
    }
    const d = typeof val === 'string' ? new Date(val) : val;
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  } catch {
    return '';
  }
}

/** Format Date/ISO to HH:mm for <input type="time"> */
export function toTimeInputValue(val?: string | Date | null, defaultTime = '09:00'): string {
  if (!val) return defaultTime;
  if (typeof val === 'string' && val.length === 5 && val.includes(':')) {
    return val;
  }
  try {
    const d = typeof val === 'string' ? new Date(val) : val;
    if (isNaN(d.getTime())) return defaultTime;
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${mins}`;
  } catch {
    return defaultTime;
  }
}

/**
 * Format a calendar date (YYYY-MM-DD or ISO) safely in UTC to prevent timezone shifts (e.g. 20/08/2026 shifting to 19/08/2026)
 */
export function formatEventDate(
  val?: string | Date | null,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  if (!val) return '';
  try {
    const str = typeof val === 'string' ? val : val.toISOString();
    const dateOnly = str.split('T')[0];
    const parts = dateOnly.split('-').map(Number);
    if (parts.length < 3) return '';
    const [year, month, day] = parts;
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) return '';
    const d = new Date(Date.UTC(year, month - 1, day));
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });
  } catch {
    return '';
  }
}

/**
 * Check whether the current calendar date (today) has reached the activity's scheduled date.
 * Returns true if today >= activity.date.
 * Returns false if today is strictly before the activity start date (i.e. has not started yet).
 */
export function isActivityDateReached(activity?: Partial<Activity> | null): boolean {
  if (!activity) return false;

  let actDateStr = '';
  if (typeof activity.date === 'string' && activity.date) {
    actDateStr = activity.date.includes('T') ? activity.date.split('T')[0] : activity.date;
  } else if ((activity.date as unknown) instanceof Date) {
    actDateStr = ((activity.date as unknown) as Date).toISOString().split('T')[0];
  } else if (activity.startTime) {
    const d = new Date(activity.startTime);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      actDateStr = `${y}-${m}-${day}`;
    }
  }

  if (!actDateStr) return true; // If no date specified, do not block

  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const todayStr = `${y}-${m}-${d}`;

  return todayStr >= actDateStr;
}

/**
 * Check whether registration can currently be performed for this activity.
 * Returns false if the activity date has not been reached, or if status is COMPLETED or CANCELED.
 */
export function isActivityRegistrationOpen(activity?: Partial<Activity> | null): boolean {
  if (!activity) return false;
  if (activity.status === 'COMPLETED' || activity.status === 'CANCELED') {
    return false;
  }
  return isActivityDateReached(activity);
}

/** Combine a date string (YYYY-MM-DD or ISO) and a time string (HH:mm) into an ISO string */
export function toISOStringFromDateTime(dateStr?: string | null, timeStr?: string | null): string {
  if (!dateStr) return '';
  const cleanTime = timeStr && timeStr.includes(':') ? timeStr : '09:00';
  try {
    const justDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const parts = justDate.split('-').map(Number);
    if (parts.length < 3) return '';
    const [year, month, day] = parts;
    const [h, m] = cleanTime.split(':').map(Number);
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      return '';
    }
    const d = new Date(year, month - 1, day, h || 0, m || 0, 0);
    return isNaN(d.getTime()) ? '' : d.toISOString();
  } catch {
    return '';
  }
}

/** Calculate duration between two time strings (HH:mm) on the same day */
export function getTimeDuration(startTimeStr?: string, endTimeStr?: string): {
  formatted: string;
  minutes: number;
  isInvalid: boolean;
  errorMsg?: string;
} {
  if (!startTimeStr || !endTimeStr) return { formatted: '', minutes: 0, isInvalid: false };
  try {
    const [sh, sm] = startTimeStr.split(':').map(Number);
    const [eh, em] = endTimeStr.split(':').map(Number);
    if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) {
      return { formatted: '', minutes: 0, isInvalid: false };
    }

    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    const diff = endMin - startMin;

    if (diff < 0) {
      return {
        formatted: 'End time is before start time',
        minutes: diff,
        isInvalid: true,
        errorMsg: 'End time cannot be earlier than start time',
      };
    }
    if (diff === 0) {
      return {
        formatted: '0 min duration',
        minutes: 0,
        isInvalid: true,
        errorMsg: 'Start and end time cannot be identical',
      };
    }

    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    let formatted = '';
    if (hours > 0 && mins > 0) {
      formatted = `${hours}h ${mins}m`;
    } else if (hours > 0) {
      formatted = `${hours} hr${hours > 1 ? 's' : ''}`;
    } else {
      formatted = `${mins} mins`;
    }
    return { formatted, minutes: diff, isInvalid: false };
  } catch {
    return { formatted: '', minutes: 0, isInvalid: false };
  }
}

/** Add hours to a time string (HH:mm) */
export function addHoursToTime(timeStr?: string, hoursToAdd = 1): string {
  try {
    const [h, m] = (timeStr || '09:00').split(':').map(Number);
    const totalMinutes = (h || 0) * 60 + (m || 0) + Math.round(hoursToAdd * 60);
    const newH = Math.floor((totalMinutes / 60) % 24);
    const newM = totalMinutes % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
  } catch {
    return '11:00';
  }
}

export const STATUS_OPTIONS: {
  value: ActivityStatus;
  label: string;
  desc: string;
  icon: React.ElementType;
  badgeStyle: string;
  cardStyle: string;
  activeCardStyle: string;
}[] = [
  {
    value: 'UPCOMING',
    label: 'Upcoming',
    desc: 'Scheduled session',
    icon: Clock,
    badgeStyle: 'bg-blue-50 text-[#002660] border border-blue-200',
    cardStyle: 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 text-slate-700',
    activeCardStyle: 'border-[#002660] bg-blue-50/60 text-[#002660] ring-1.5 ring-[#002660]',
  },
  {
    value: 'ONGOING',
    label: 'Ongoing',
    desc: 'Currently active',
    icon: RefreshCw,
    badgeStyle: 'bg-amber-50 text-amber-800 border border-amber-300 animate-pulse',
    cardStyle: 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 text-slate-700',
    activeCardStyle: 'border-amber-600 bg-amber-50/60 text-amber-900 ring-1.5 ring-amber-600',
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    desc: 'Session concluded',
    icon: CheckCircle2,
    badgeStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-300',
    cardStyle: 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-700',
    activeCardStyle: 'border-emerald-600 bg-emerald-50/60 text-emerald-900 ring-1.5 ring-emerald-600',
  },
  {
    value: 'CANCELED',
    label: 'Canceled',
    desc: 'Postponed / Void',
    icon: AlertCircle,
    badgeStyle: 'bg-rose-50 text-rose-800 border border-rose-300',
    cardStyle: 'border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 text-slate-700',
    activeCardStyle: 'border-rose-600 bg-rose-50/60 text-rose-900 ring-1.5 ring-rose-600',
  },
];

export function getActivityStatusBadge(status: ActivityStatus) {
  const config = STATUS_OPTIONS.find((s) => s.value === status);
  return config ? config.badgeStyle : 'bg-gray-100 text-gray-800';
}

export interface ActivityTimeOption {
  value: string;
  label: string;
}

export const ACTIVITY_TIME_OPTIONS: ActivityTimeOption[] = (() => {
  const list: ActivityTimeOption[] = [];
  for (let hour = 6; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 15) {
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

export const getActivityTimeOptions = (currentTime?: string | null): ActivityTimeOption[] => {
  if (!currentTime || !currentTime.includes(':')) return ACTIVITY_TIME_OPTIONS;
  const exists = ACTIVITY_TIME_OPTIONS.some((o) => o.value === currentTime);
  if (exists) return ACTIVITY_TIME_OPTIONS;

  const [hStr, mStr] = currentTime.split(':');
  const h = parseInt(hStr, 10);
  const m = mStr || '00';
  const period = h < 12 ? 'AM' : 'PM';
  const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const displayHourStr = String(displayHour).padStart(2, '0');
  const customOption: ActivityTimeOption = {
    value: currentTime,
    label: `${currentTime} (${displayHourStr}:${m} ${period})`,
  };

  const list = [...ACTIVITY_TIME_OPTIONS, customOption];
  return list.sort((a, b) => a.value.localeCompare(b.value));
};

