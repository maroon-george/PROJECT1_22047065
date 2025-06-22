import React from 'react'

type InputProps = {
    label: string,
    name: string,
    type?: string,
    placeholder?: string,
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({label, name, type = 'text', placeholder = '',value, onChange}: InputProps) => {
  return (
    <div className='mb-4'>
        <label htmlFor={name} className="font-medium- mb-1">{label}</label>
        <input
            required
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="w-full focus:outline-none focus:border-teal-500 px-4 py-2 bg-white border-4 border-teal-800 rounded-4xl mb-2"
        ></input>
    </div>
  )
}

export default Input