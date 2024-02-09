import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const DayPlanner = ({ day }) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      activities: [{ time: '', name: '' }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "activities",
  });

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="font-bold text-lg mb-4">Day {day}</div>
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-2 gap-4 mb-3">
          <input
            {...register(`activities.${index}.time`)}
            type="text"
            placeholder="Time"
            className="border p-2 rounded-md"
          />
          <input
            {...register(`activities.${index}.name`)}
            type="text"
            placeholder="Activity name"
            className="border p-2 rounded-md"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ time: '', name: '' })}
        className="border p-2 rounded-md bg-blue-500 text-white"
      >
        Add Activity
      </button>
      <input
        type="submit"
        className="border p-2 rounded-md bg-green-500 text-white mt-4"
      />
    </form>
  );
};

export default DayPlanner;
