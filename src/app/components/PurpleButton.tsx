import clsx from 'clsx';
import React from 'react';

const PurpleButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <button className="flex items-center text-[13px] tablet:text-sm transition-colors duration-200 hover:bg-[#845eef] bg-[#7B57DF] text-white font-medium rounded-md pt-3 pb-4 px-3 tablet:px-10 items-center w-full justify-center">
      {children}
    </button>
  );
};

export default PurpleButton;
