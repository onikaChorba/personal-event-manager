import React from 'react';
import { Event } from '../types/eventTypes';
import { useFormik } from 'formik';
import { Input } from './common/Input';
import { Textarea } from './common/Textarea';
import { Select } from './common/Select';
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
      <Input
        type='text'
        name="name"
        placeholder="Event Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name} />
      <Textarea
        name="description"
        placeholder="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <Select
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        options={[
          { value: 'work', label: 'Work' },
          { value: 'personal', label: 'Personal' },
          { value: 'leisure', label: 'Leisure' },
        ]}
      />
      <Input
        type='date'
        name="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        error={formik.errors.date} />
      <button type="submit" className="bg-teal-500 text-white p-2 pl-10 pr-10 rounded-md hover:bg-teal-600 transition duration-200 " style={{ height: '45px' }}>
        Add Event
      </button>
    </form >
  );
};

export default EventForm;
