export type NoteType = 'technical' | 'visual' | 'simple' | 'checklist' | 'sensor';

export interface Note {
  id: string;
  tag?: string;
  title: string;
  preview: string;
  type: NoteType;
  timeAgo?: string;
  progress?: number;
  checklistItems?: { label: string; done: boolean }[];
  hasImage?: boolean;
}

export interface LinkedProject {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
}

export const NOTES: Note[] = [
  {
    id: '1',
    tag: 'PRECISION_SPEC',
    title: 'CNC Milling Parameters for Grade 5 Titanium Alloy',
    preview:
      'Optimization of spindle speed and feed rates for reduced tool wear during high-volume production cycles. Preliminary tests indicate a 15% increase in lifespan...',
    type: 'technical',
    progress: 55,
  },
  {
    id: '2',
    title: 'Chassis Integrity Check',
    preview:
      'Inspection of weld points on the X-Series prototype. Minor stress fractures detected...',
    type: 'visual',
    hasImage: true,
  },
  {
    id: '3',
    title: 'Supply Chain Protocol',
    preview:
      'New directive for procurement of rare earth magnets from verified industrial vendors only. Compliance required by Q3.',
    type: 'simple',
    timeAgo: '3h ago',
  },
  {
    id: '4',
    tag: 'UNCATEGORIZED',
    title: 'Maintenance Schedule',
    type: 'checklist',
    preview: '',
    checklistItems: [
      { label: 'Coolant replacement', done: true },
      { label: 'Laser alignment check', done: false },
    ],
  },
  {
    id: '5',
    tag: 'SENSOR DATA LOG',
    title: 'Thermodynamic Variance in Reactor Shell C',
    preview:
      'Log entries recorded during peak operational hours. Heat dissipation is within safety margins but trending upward.',
    type: 'sensor',
  },
];

export const LINKED_PROJECTS: LinkedProject[] = [
  {
    id: '1',
    name: 'Precision OS',
    subtitle: 'CORE ARCHITECTURE',
    icon: 'settings',
  },
  {
    id: '2',
    name: 'Kitly V2 Hardware',
    subtitle: 'SCHEMATICS',
    icon: 'hardware-chip',
  },
];

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'SGD'];

export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.9189,
  GBP: 0.7820,
  JPY: 153.4,
  CHF: 0.8980,
  CAD: 1.3640,
  AUD: 1.5310,
  SGD: 1.3490,
};

export const CURRENCY_FLAGS: Record<string, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  JPY: '🇯🇵',
  CHF: '🇨🇭',
  CAD: '🇨🇦',
  AUD: '🇦🇺',
  SGD: '🇸🇬',
};

export const ACTIVITY_ITEMS = [
  { id: '1', text: 'Unit conversion: PSI to BAR', time: '1 min ago' },
  { id: '2', text: 'Note Edited: "Assembly specs..."', time: '4 min ago' },
  { id: '3', text: 'Archive tool used', time: '9 min ago' },
];
