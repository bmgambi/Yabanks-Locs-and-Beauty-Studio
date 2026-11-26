export type DayCode = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface DailyHours {
  day: DayCode;
  label: string;
  open: string;
  close: string;
}

export interface GroupedHoursRow {
  days: string;
  shortDays: string;
  hours: string;
}

export interface NairobiOpenStatus {
  isOpen: boolean;
  summary: string;
}

export const STUDIO_TIMEZONE = 'Africa/Nairobi';

export const WEEKLY_HOURS: readonly DailyHours[] = [
  { day: 'Mon', label: 'Monday', open: '07:30', close: '21:00' },
  { day: 'Tue', label: 'Tuesday', open: '07:30', close: '21:00' },
  { day: 'Wed', label: 'Wednesday', open: '07:30', close: '21:00' },
  { day: 'Thu', label: 'Thursday', open: '07:30', close: '21:00' },
  { day: 'Fri', label: 'Friday', open: '07:30', close: '21:00' },
  { day: 'Sat', label: 'Saturday', open: '07:30', close: '22:00' },
  { day: 'Sun', label: 'Sunday', open: '07:30', close: '21:00' },
] as const;

function parse24HourToMinutes(time24: string): number {
  const [hourStr, minuteStr] = time24.split(':');
  const hour = Number.parseInt(hourStr ?? '0', 10);
  const minute = Number.parseInt(minuteStr ?? '0', 10);
  return hour * 60 + minute;
}

export function format24HourTime(time24: string): string {
  const [hourStr, minuteStr] = time24.split(':');
  const hour24 = Number.parseInt(hourStr ?? '0', 10);
  const minute = Number.parseInt(minuteStr ?? '0', 10);
  const period = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return minute === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

export function formatTimeRange(open: string, close: string): string {
  return `${format24HourTime(open)} to ${format24HourTime(close)}`;
}

export function getGroupedOpeningHours(): GroupedHoursRow[] {
  const groups: Array<{
    start: DailyHours;
    end: DailyHours;
    open: string;
    close: string;
  }> = [];

  for (const entry of WEEKLY_HOURS) {
    const last = groups[groups.length - 1];
    if (last && last.open === entry.open && last.close === entry.close) {
      last.end = entry;
    } else {
      groups.push({
        start: entry,
        end: entry,
        open: entry.open,
        close: entry.close,
      });
    }
  }

  return groups.map((group) => {
    const sameDay = group.start.day === group.end.day;
    return {
      days: sameDay
        ? group.start.label
        : `${group.start.label} to ${group.end.label}`,
      shortDays: sameDay
        ? group.start.day
        : `${group.start.day}–${group.end.day}`,
      hours: formatTimeRange(group.open, group.close),
    };
  });
}

export function getWrittenHoursFallback(): string {
  return getGroupedOpeningHours()
    .map((group) => `${group.shortDays} ${group.hours}`)
    .join(' · ');
}

export function getNairobiOpenStatus(now: Date = new Date()): NairobiOpenStatus {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: STUDIO_TIMEZONE,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).formatToParts(now);

    const weekday = parts.find((p) => p.type === 'weekday')?.value;
    const rawHour = parts.find((p) => p.type === 'hour')?.value;
    const rawMinute = parts.find((p) => p.type === 'minute')?.value;

    if (!weekday || rawHour === undefined || rawMinute === undefined) {
      return { isOpen: false, summary: getWrittenHoursFallback() };
    }

    const parsedHour = Number.parseInt(rawHour, 10);
    const parsedMinute = Number.parseInt(rawMinute, 10);

    if (!Number.isFinite(parsedHour) || !Number.isFinite(parsedMinute)) {
      return { isOpen: false, summary: getWrittenHoursFallback() };
    }

    const dayEntry = WEEKLY_HOURS.find((entry) => entry.day === weekday);
    if (!dayEntry) {
      return { isOpen: false, summary: getWrittenHoursFallback() };
    }

    const hour = parsedHour % 24;
    const currentMinutes = hour * 60 + parsedMinute;
    const openMinutes = parse24HourToMinutes(dayEntry.open);
    const closeMinutes = parse24HourToMinutes(dayEntry.close);

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
    const range = formatTimeRange(dayEntry.open, dayEntry.close);

    return {
      isOpen,
      summary: isOpen
        ? `Open today · ${range}`
        : `Closed now · ${dayEntry.day} ${range}`,
    };
  } catch {
    return { isOpen: false, summary: getWrittenHoursFallback() };
  }
}
