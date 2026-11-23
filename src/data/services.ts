export interface ServiceItem {
  name: string;
  price: string;
}

export interface ServiceGroup {
  id: string;
  title: string;
  items: ServiceItem[];
}

/**
 * Single provisional price data array (all prices in KSh).
 * Replace items below with the exact prototype price list when ready.
 */
export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'retouch-and-maintenance',
    title: 'Retouch and maintenance',
    items: [
      { name: 'Wash and retouch (short to medium)', price: 'KSh 800' },
      { name: 'Wash and retouch (long)', price: 'KSh 1,000' },
      { name: 'Wash, retouch and styling', price: 'KSh 1,200' },
      { name: 'Interlocking maintenance', price: 'KSh 1,500' },
      { name: 'Detox and deep cleanse', price: 'KSh 1,000' },
      { name: 'Loc repair (per loc)', price: 'KSh 100' },
    ],
  },
  {
    id: 'extras',
    title: 'Extras',
    items: [
      { name: 'Hot oil scalp treatment', price: 'KSh 500' },
      { name: 'Steam treatment', price: 'KSh 500' },
      { name: 'Simple styling (two-strand twists or petals)', price: 'KSh 500' },
      { name: 'Intricate updo or barrel rolls', price: 'KSh 800' },
      { name: 'Trim and shaping', price: 'KSh 300' },
    ],
  },
  {
    id: 'fresh-artificial-instant-locs',
    title: 'Fresh (artificial instant locs)',
    items: [
      { name: 'Short instant locs installation', price: 'KSh 4,500' },
      { name: 'Medium instant locs installation', price: 'KSh 6,000' },
      { name: 'Long instant locs installation', price: 'KSh 8,000' },
      { name: 'Loc extensions (labour only)', price: 'KSh 5,000' },
      { name: 'Loc extensions (hair included, medium)', price: 'KSh 9,500' },
    ],
  },
  {
    id: 'classic-temporary-locs',
    title: 'Classic temporary locs',
    items: [
      { name: 'Soft faux locs (short)', price: 'KSh 2,500' },
      { name: 'Soft faux locs (shoulder length)', price: 'KSh 3,000' },
      { name: 'Soft faux locs (waist length)', price: 'KSh 3,800' },
      { name: 'Butterfly locs (medium)', price: 'KSh 3,000' },
      { name: 'Goddess faux locs', price: 'KSh 3,500' },
    ],
  },
  {
    id: 'sister-locs-packages-and-micro-locs',
    title: 'Sister locs packages and micro locs',
    items: [
      { name: 'Consultation and test locs', price: 'KSh 500' },
      { name: 'Micro locs installation (short hair)', price: 'KSh 8,000' },
      { name: 'Micro locs installation (medium hair)', price: 'KSh 12,000' },
      { name: 'Sister locs installation package', price: 'KSh 15,000' },
      { name: 'Micro or sister locs retightening', price: 'KSh 2,500' },
    ],
  },
  {
    id: 'colour',
    title: 'Colour',
    items: [
      { name: 'Single-process colour (tips)', price: 'KSh 1,500' },
      { name: 'Full-head single colour', price: 'KSh 2,500' },
      { name: 'Highlights or ombre', price: 'KSh 3,000' },
      { name: 'Bleach and tone', price: 'KSh 3,500' },
    ],
  },
  {
    id: 'other-services',
    title: 'Other services',
    items: [
      { name: 'Starter locs (comb coils)', price: 'KSh 1,800' },
      { name: 'Starter locs (two-strand twists)', price: 'KSh 2,200' },
      { name: 'Loc takedown and wash', price: 'KSh 2,500' },
      { name: 'Natural hair wash and blow-dry', price: 'KSh 600' },
    ],
  },
];
