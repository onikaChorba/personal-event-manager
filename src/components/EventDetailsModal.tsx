import React from 'react';
import { Event } from '../types/eventTypes';

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsModal = ({ event, onClose }: EventDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-1000">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <p><strong>Name:</strong> {event.name}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {event.status}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetailsModal;
