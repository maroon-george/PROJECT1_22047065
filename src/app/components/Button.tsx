'use client'
import React from 'react'

interface ButtonProps {
  value: string;
  disabled?: boolean;
  onClick?: (e: React.FormEvent) => void;
}

const Button = ({ value, disabled = false, onClick }: ButtonProps) => {
  return (
    <button 
      type="submit" 
      onClick={onClick}
      disabled={disabled}
      className={`border-none bg-blue-500 text-white w-full py-2 rounded-2xl text-bold hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed ${disabled ? 'opacity-50' : ''}`}
    >
      {value}
    </button>
  )
}

export default Button 