import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Event } from '../types/eventTypes';

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

  const handleEditClick = (row: Event) => {
    setEditingRow(row.id);
    setEditedEvent(row);
  };

  const handleSave = () => {
    if (editedEvent) {
      updateEvent(editedEvent);
      setEditingRow(null);
      setEditedEvent(null);
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedEvent(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Event) => {
    if (editedEvent) {
      setEditedEvent({ ...editedEvent, [field]: e.target.value });
    }
  };
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || event.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' || event.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, searchQuery, selectedCategory, selectedStatus]);

  const columns = useMemo<ColumnDef<Event, string>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => {
          const isEditing = editingRow === row.original.id;
          return isEditing ? (
            <input
              value={editedEvent?.name || ''}
              onChange={(e) => handleChange(e, 'name')}
              className="border border-gray-300 rounded-md p-1"
            />
          ) : (
            row.original.name
          );
        },
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: ({ row }) => {
          const isEditing = editingRow === row.original.id;
          return isEditing ? (
            <input
              value={editedEvent?.description || ''}
              onChange={(e) => handleChange(e, 'description')}
              className="border border-gray-300 rounded-md p-1"
            />
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
            <select
              name="category"
              value={editedEvent?.category || ''}
              onChange={(e: any) => handleChange(e, 'category')}
              className="border border-gray-300 p-2 mb-2 rounded-md mr-2 w-52"
              style={{ height: '45px' }}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="leisure">Leisure</option>
            </select>
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
            <input
              type="date"
              value={editedEvent ? new Date(editedEvent.date).toISOString().substr(0, 10) : ''}
              onChange={(e) => handleChange(e, 'date')}
              className="border border-gray-300 rounded-md p-1"
            />
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
            <select
              name="category"
              value={editedEvent?.status || ''}
              onChange={(e: any) => handleChange(e, 'status')}
              className="border border-gray-300 p-2 mb-2 rounded-md mr-2 w-52"
              style={{ height: '45px' }}
            >
              <option value="upcoming">upcoming</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
            </select>
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
    [editingRow, editedEvent]
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
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mr-2 flex-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mr-2"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="leisure">Leisure</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="all">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
