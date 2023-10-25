import React from 'react'

type FieldProps = {
    value: string, 
    action: (value: any) => void,
    placeholder: string,
    type: React.HTMLInputTypeAttribute,
}

const Field: React.FC<FieldProps> = ({ value, action, placeholder, type }) => {
  return (
    <input 
        className='pl-2 text-[#1D1A2B] border outline-[#7B57DF] border-gray rounded-md h-8 w-full appearance-none' 
        placeholder={placeholder}
        type={type} 
        value={value} 
        onChange={(e) => {
            action(e.target.value);
        }}
    />
  )
}

export default Field