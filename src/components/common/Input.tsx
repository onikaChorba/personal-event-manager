import React from "react"

interface IInput {
  type: string,
  name: string,
  value: string,
  placeholder?: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  error?: string,
  className?: string
}

export const Input: React.FC<IInput> = ({ type, name, value, placeholder, onChange, error, className }) => {
  return (
    <div className={error ? 'relative mr-2 w-52' : `${className} mr-2 w-52`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 p-2 rounded-md w-full`}
      />
      {error && <div className="text-red-500 mb-2 absolute top-11">{error}</div>
      }
    </div>
  )
}