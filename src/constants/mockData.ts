export type NoteType = 'technical' | 'visual' | 'simple' | 'checklist' | 'sensor';

export interface Task {
  id: string;
  tag?: string;
  title: string;
  preview: string;
  type: NoteType;
  timeAgo?: string;
  progress?: number;
  completed?: boolean;
  checklistItems?: { label: string; status: 'pending' | 'in_progress' | 'completed' }[];
  hasImage?: boolean;
}

// Keep Note as alias for backwards compatibility during migration
export type Note = Task;

export interface LinkedProject {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
}

export const TASKS: Task[] = [];

// Keep NOTES for backwards compatibility
export const NOTES = TASKS;

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
