import React, { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import './index.css'
import { IPackage } from '@/app/types';

type CheckboxType = {
  obj: IPackage;
  onUpdate: (name: string, checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxType> = ({ obj, onUpdate }) => {
  const [checked, setChecked] = useState(obj.checked);
  
  useEffect(() => {
    onUpdate(obj.name, checked);
  }, [checked]);

  return (
    <label 
      onChange={() => {
        setChecked(!checked);
      }} 
      className="flex items-center checkbox translate-y-[2px] relative cursor-pointer"
    >
      <input defaultChecked={checked} type="checkbox" className="opacity-0 w-[18px] h-[18px] cursor-pointer" />
      <button className="w-4 h-4 rounded-[5px] border-[#e4e3e3] border-2 transition-colors duration-100 ease-in-out relative">
        <BiCheck className="checkbox__checked" />
      </button>
      {obj.name && <p className="ml-2">{obj.name}</p>}
    </label>
  );
};

export default Checkbox;
