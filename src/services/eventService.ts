import { Event } from '../types/eventTypes';

const events: Event[] = [];

export const fetchEvents = () => {
  return Promise.resolve(events);
};

export const addEvent = (event: Event) => {
  events.push(event);
  return Promise.resolve(event);
};
