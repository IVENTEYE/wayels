import clsx from 'clsx'
import React from 'react'

const GrayButton: React.FC<{children: React.ReactNode, action?: () => void, disabled?: boolean}> = ({ children, action, disabled = false }) => {
  return (
    <button 
      className={clsx('px-9 py-3 flex flex-auto justify-center items-center rounded-[4px] bg-[#f9f9fb] text-[#6940DA] font-medium', disabled ? 'opacity-50' : '')} 
      type="button"
      onClick={action}
      disabled={disabled}
    >
        {children}
    </button>
  )
}

export default GrayButton