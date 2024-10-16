import { useEffect, useState } from 'react';
import { Event } from '../types/eventTypes';

const fetchEvents = async () => {

  return new Promise<Event[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Event 1', description: 'A fun event', status: 'upcoming', category: 'leisure', date: '2024-10-20' },
        { id: 2, name: 'Event 2', description: 'Another exciting event', status: 'upcoming', category: 'leisure', date: '2024-11-15' },
        { id: 3, name: 'Event 3', description: 'A thrilling adventure', status: 'upcoming', category: 'personal', date: '2024-12-01' },
        { id: 4, name: 'Event 4', description: 'Networking opportunity', status: 'upcoming', category: 'work', date: '2024-10-25' },
        { id: 5, name: 'Event 5', description: 'A cultural experience', status: 'upcoming', category: 'personal', date: '2024-11-10' },
      ]);
    }, 1000);
  });
};

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const initialEvents = await fetchEvents();
        setEvents(initialEvents);
      } catch (err) {
        setError('Error fetching events');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const addEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return { events, isLoading, error, addEvent, updateEvent, deleteEvent };
};
