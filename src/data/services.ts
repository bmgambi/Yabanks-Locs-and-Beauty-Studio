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
 * source = founder's menu image supplied 26 Nov 2026; line-by-line verification
 * and meanings of some labels still open (brief blocker 3).
 */
export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'retouch',
    title: 'Retouch',
    items: [
      { name: 'Baby locs', price: 'KSh 500' },
      { name: 'Waxing', price: 'KSh 700' },
      { name: 'Herbal (natural wax)', price: 'KSh 800' },
      { name: 'Kantu products', price: 'KSh 800' },
      { name: 'Crochet', price: 'KSh 1,200' },
      { name: 'Instant locs crafting', price: 'KSh 2,500' },
      { name: 'Sister locs', price: 'KSh 2,500 / 3,500' },
    ],
  },
  {
    id: 'treatments-and-styling',
    title: 'Treatments and styling',
    items: [
      { name: 'Leave-in treatment', price: 'KSh 300' },
      { name: 'Curls', price: 'KSh 300' },
      { name: 'Deep treatment', price: 'KSh 500' },
      { name: 'Hair recovering treatment', price: 'KSh 700' },
      { name: 'Waxing and petals', price: 'KSh 800' },
      { name: 'Waxing + twist style', price: 'KSh 950' },
      { name: 'Crochet + twist', price: 'KSh 1,450' },
    ],
  },
  {
    id: 'artificial-instant-locs',
    title: 'Artificial instant locs',
    items: [
      { name: 'Shoulder length', price: 'KSh 5,500' },
      { name: 'Mid-back plain', price: 'KSh 6,500' },
      { name: 'Mid-back coloured', price: 'KSh 7,000' },
      { name: 'Waist size', price: 'KSh 8,500' },
      { name: 'Waist coloured', price: 'KSh 9,000' },
    ],
  },
  {
    id: 'classic-temporary-locs',
    title: 'Classic temporary locs',
    items: [
      { name: 'Bantu locs', price: 'KSh 3,000' },
      { name: 'Short size', price: 'KSh 4,500' },
      { name: 'Shoulder length', price: 'KSh 6,000' },
      { name: 'Mid-back length', price: 'KSh 7,000' },
      { name: 'Mid-back coloured', price: 'KSh 7,500' },
      { name: 'Waist', price: 'KSh 8,500' },
    ],
  },
  {
    id: 'sister-locs-packages-and-micro-locs',
    title: 'Sister locs packages and micro locs',
    items: [
      { name: 'Sister locs, 1 person over 2 days', price: 'KSh 18,000' },
      { name: 'Sister locs, 2 people in 1 day', price: 'KSh 25,000' },
      { name: 'Artificial micro locs', price: 'KSh 35,000' },
    ],
  },
  {
    id: 'dye',
    title: 'Dye',
    items: [
      // CHECK: possible typo for 3,000, founder to confirm before launch.
      { name: 'Tips highlight', price: 'KSh 300' },
      { name: 'Black (with labour)', price: 'KSh 600' },
      { name: 'Bleaching', price: 'KSh 1,000' },
      { name: 'Tips highlight (full hair)', price: 'KSh 3,000' },
    ],
  },
  {
    id: 'highlights-colours',
    title: 'Highlights colours',
    items: [
      { name: 'Tips', price: 'KSh 3,000' },
      { name: 'Full locs', price: 'KSh 4,500' },
    ],
  },
  {
    id: 'other-services',
    title: 'Other services',
    items: [
      { name: 'Box shaving / style, boys and men', price: 'KSh 4,500' },
      { name: 'Undoing (instant)', price: 'KSh 3,000' },
      { name: 'Undoing (Ugandan style)', price: 'KSh 6,500' },
      { name: 'False locs', price: 'KSh 1,500' },
      { name: 'Braiding, boys style', price: 'KSh 2,000' },
    ],
  },
];
