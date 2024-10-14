import React from 'react';
import EventTable from '../components/EventTable';
import EventForm from '../components/EventForm';
import { useEvents } from '../hooks/useEvents';

const EventManager = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

  return (
    <div>
      <h1 className="text-2xl font-bold my-6 text-center">Personal Event Manager</h1>
      <EventForm addEvent={addEvent} />
      <EventTable
        events={events}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
      />
    </div>
  );
};

export default EventManager;
