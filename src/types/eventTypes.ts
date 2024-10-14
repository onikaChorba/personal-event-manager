export type Event = {
  id: number;
  name: string;
  description: string;
  category: 'work' | 'personal' | 'leisure';
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};
