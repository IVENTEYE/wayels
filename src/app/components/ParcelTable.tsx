import React from 'react'

const ParcelTable: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <>
    <div className="grid grid-cols-packages bg-[#FAFAFD] py-3 px-4 rounded-lg text-gray font-medium text-[12px]">
        <div>Parcel number</div>
        <div>Volume weight</div>
        <div>Admission date</div>
      </div>
      <div>
        {children}
      </div>
    </>
  )
}

export default ParcelTable