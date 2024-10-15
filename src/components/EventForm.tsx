import React from 'react';
import { Event } from '../types/eventTypes';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Event name is required'),
  date: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
});

const EventForm = ({ addEvent }: { addEvent: (event: Event) => void }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: 'work',
      date: '',
      status: 'upcoming',
    },
    validationSchema,
    onSubmit: (values) => {
      addEvent({
        ...values,
        id: Date.now(),
        category: values.category as 'work' | 'personal' | 'leisure',
        status: 'upcoming',
      });
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-4 p-6 bg-white rounded-lg shadow-lg max-w-full mx-auto flex items-center flex-wrap">
      <div className='relative'>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="border border-gray-300 p-2 mb-2 rounded-md mr-2"
        />
        {formik.errors.name && <div className="text-red-500 mb-2 absolute top-11">{formik.errors.name}</div>
        }
      </div>
      <textarea
        name="description"
        placeholder="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        className="border border-gray-300 p-2 mb-2 rounded-md mr-2 resize-none flex-1"
        rows={1}
      />

      <select
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        className="border border-gray-300 p-2 mb-2 rounded-md mr-2 w-52"
        style={{ height: '45px' }}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="leisure">Leisure</option>
      </select>

      <div className='relative'>
        <input
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          className="border border-gray-300 p-2 mb-2 rounded-md mr-2"
        />
        {
          formik.errors.date && <div className="text-red-500 mb-2 absolute top-11">{formik.errors.date}</div>
        }
        <button type="submit" className="bg-teal-500 text-white p-2 pl-10 pr-10 rounded-md hover:bg-teal-600 transition duration-200 " style={{ height: '45px' }}>
          Add Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
