import React, { useMemo, useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Event } from '../types/eventTypes';
import EventDetailsModal from './EventDetailsModal';
import { Input } from './common/Input';
import { Textarea } from './common/Textarea';
import { Select } from './common/Select';

interface EventTableProps {
  events: Event[];
  updateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
}

const EventTable = ({ events, updateEvent, deleteEvent }: EventTableProps) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);


  const handleEditClick = (row: Event) => {
    setEditingRow(row.id);
    setEditedEvent(row);
  };

  const handleSave = useCallback(() => {
    if (editedEvent) {
      updateEvent(editedEvent);
      setEditingRow(null);
      setEditedEvent(null);
    }
  }, [editedEvent, updateEvent]);

  const handleCancel = useCallback(() => {
    setEditingRow(null);
    setEditedEvent(null);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: keyof Event) => {
      if (editedEvent) {
        setEditedEvent({ ...editedEvent, [field]: e.target.value });
      }
    },
    [editedEvent]
  );

  const filteredEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || event.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' || event.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [events, searchQuery, selectedCategory, selectedStatus, sortOrder]);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const columns = useMemo<ColumnDef<Event, string>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => {
          const isEditing = editingRow === row.original.id;
          return isEditing ? (
            <Input
              name='name'
              type="name"
              value={editedEvent?.name || ''}
              onChange={(e) => handleChange(e, 'name')} />
          ) : (
            <span className="cursor-pointer text-teal-600" onClick={() => openModal(row.original)}>
              {row.original.name}
            </span>
          );
        },
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: ({ row }) => {
          const isEditing = editingRow === row.original.id;
          return isEditing ? (
            <Textarea
              name='description'
              value={editedEvent?.description || ''}
              onChange={(e) => handleChange(e, 'description')} />
          ) : (
            row.original.description
          );
        },
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: ({ row }) => {
          const isEditing = editingRow === row.original.id;
          return isEditing ? (
            <Select
              name="category"
              value={editedEvent?.category || ''}
              onChange={(e: any) => handleChange(e, 'category')}
              options={[
                { value: 'work', label: 'Work' },
                { value: 'personal', label: 'Personal' },
                { value: 'leisure', label: 'Leisure' },
              ]}
            />
          ) : (
            row.original.category
          );
        },
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: ({ row }) => {
          const isEditing = editingRow === row.original.id;
          return isEditing ? (
            <Input
              name='data'
              type="date"
              value={editedEvent ? new Date(editedEvent.date).toISOString().substr(0, 10) : ''}
              onChange={(e) => handleChange(e, 'date')} />
          ) : (
            new Date(row.original.date).toLocaleDateString()
          );
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const isEditing = editingRow === row.original.id;
          return isEditing ? (
            <Select
              name="status"
              value={editedEvent?.status || ''}
              onChange={(e: any) => handleChange(e, 'status')}
              options={[
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
            />
          ) : (
            row.original.status
          );
        },
      },
      {
        header: 'Actions',
        cell: ({ row }) => {
          const isEditing = editingRow === row.original.id;
          return (
            <div>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="text-teal-600 hover:text-teal-800 font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700 font-semibold ml-2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(row.original)}
                    className="text-teal-600 hover:text-teal-800 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(row.original.id)}
                    className="text-red-500 hover:text-red-700 font-semibold ml-2"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [editingRow, editedEvent, deleteEvent, handleChange, handleSave, handleCancel]
  );

  const table = useReactTable({
    data: filteredEvents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="flex flex-col h-full">
      {isModalOpen && selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={closeModal} />
      )}
      <div className="flex mb-4">
        <Input
          name='data'
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='flex-1' />
        <Select
          name="create data event"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          options={[
            { value: 'newest', label: 'New' },
            { value: 'oldest', label: 'Old' },
          ]}
        />
        <Select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'work', label: 'Work' },
            { value: 'personal', label: 'Personal' },
            { value: 'leisure', label: 'Leisure' },
          ]}
        />
        <Select
          name="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
      </div>
      <div className="flex-grow min-h-[460px] max-h-[460px] overflow-y-auto relative">
        <table className="w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-teal-600 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-semibold uppercase"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-teal-50`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination mt-4 flex justify-between items-center py-2">
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 ml-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        <span className="text-gray-600">
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>{' '}
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border border-gray-300 rounded-md p-2"
          style={{ height: '45px' }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EventTable;
