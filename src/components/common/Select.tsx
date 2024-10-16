import React from "react"

interface ISelect {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  height?: string;
}

export const Select: React.FC<ISelect> = ({ name, value, onChange, options, height = '45px' }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 rounded-md mr-2 w-52"
      style={{ height: height }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}