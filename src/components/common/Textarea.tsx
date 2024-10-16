import React from "react"

interface ITextarea {
  name: string,
  value: string,
  placeholder?: string,
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
}

export const Textarea: React.FC<ITextarea> = ({ name, value, placeholder, onChange }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 rounded-md mr-2 resize-none flex-1"
      rows={1}
    />
  )
}