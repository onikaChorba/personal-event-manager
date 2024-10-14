import { useState } from 'react';
import { Event } from '../types/eventTypes';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return { events, addEvent, updateEvent, deleteEvent };
};
