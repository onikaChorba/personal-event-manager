import React, { useMemo } from 'react';
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
  const columns = useMemo<ColumnDef<Event, any>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Category',
        accessorKey: 'category',
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div>
            <button
              onClick={() => updateEvent(row.original)}
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
          </div>
        ),
      },
    ],
    [updateEvent, deleteEvent]
  );

  const table = useReactTable({
    data: events,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="flex flex-col h-full">
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
