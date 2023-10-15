import React from 'react'

const GrayButton: React.FC<{children: React.ReactNode, action?: () => void}> = ({ children, action }) => {
  return (
    <button 
      className='px-9 py-3 flex flex-auto justify-center items-center rounded-[4px] bg-[#f9f9fb] text-[#6940DA] font-medium' 
      type="button"
      onClick={action}
    >
        {children}
    </button>
  )
}

export default GrayButton