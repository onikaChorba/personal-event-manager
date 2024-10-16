import React from 'react';
import EventTable from '../components/EventTable';
import EventForm from '../components/EventForm';
import { useEvents } from '../hooks/useEvents';

const EventManager = () => {
  const { events, isLoading, error, addEvent, updateEvent, deleteEvent } = useEvents();

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold my-6 text-center">Personal Event Manager</h1>
      <EventForm addEvent={addEvent} />
      <EventTable
        isLoading={isLoading}
        events={events}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
      />
    </div>
  );
};

export default EventManager;
