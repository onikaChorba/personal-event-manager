import React from 'react';
import { Event } from '../types/eventTypes';

interface EventTableProps {
  events: Event[];
  updateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
}

const EventTable = ({ events, updateEvent, deleteEvent }: EventTableProps) => {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className="border-t">
            <td>{event.name}</td>
            <td>{event.description}</td>
            <td>{event.category}</td>
            <td>{new Date(event.date).toLocaleDateString()}</td>
            <td>{event.status}</td>
            <td>
              <button onClick={() => updateEvent(event)} className="text-blue-500">Edit</button>
              <button onClick={() => deleteEvent(event.id)} className="text-red-500 ml-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
