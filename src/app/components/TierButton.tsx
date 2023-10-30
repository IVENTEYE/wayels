import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useSelector';
import { TypeRootState } from '../redux/store';
import clsx from 'clsx';
import { IPackage } from '../types';
import { useDispatch } from 'react-redux';
import { onLoadPackages, onRemovePackage,  } from '../redux/slices/shipmentsSlice';

type TierButtonType = {
  id: number,
  layer: string,
  capacity: number,
  weight: number,
  available: number,
  packages: IPackage[]
}

const TierButton: React.FC<TierButtonType> = ({ capacity, weight, available, layer, id, packages }) => {
  const dispatch = useDispatch();
  const { selectedPackages, packagesWeight, items } = useTypedSelector((state: TypeRootState) => state.shipments.packages);
  const [totalTierWeight, setTotalTierWeight] = useState(0);

  const [teirInfo, setTeirInfo] = useState(false);
  const [quantityTierPackages, setQuantityTierPackages] = useState(0);
  const [weightTierPackages, setWeightTierPackages] = useState(0);

  useEffect(() => {
    const totalPackagesWeight = packages.reduce((acc, item) => item.weight + acc, 0);
    setTotalTierWeight(totalPackagesWeight + packagesWeight);
  }, [packagesWeight]);
  
  return (
    <button
      type="button"
      disabled={
        packages.length >= capacity ||
        selectedPackages > capacity ||
        selectedPackages === 0 ||
        packagesWeight > weight ||
        totalTierWeight > weight ||
        packages.reduce((acc, item) => item.weight + acc, 0) >= weight ||
        available < packagesWeight
      }
      className={clsx(
        'tier bg-[#F9F9FB] w-full flex justify-center items-center h-[70px] rounded-[4px] transition-colors duration-150 ease-out active:bg-[#7B57DF] disabled:pointer-events-none',
        packages.length >= capacity ||
        selectedPackages > capacity ||
        packagesWeight > weight ||
        totalTierWeight > weight ||
        packages.reduce((acc, item) => item.weight + acc, 0) >= weight ||
        available < packagesWeight
        ? ''
        : 'tier--active',
      )}
      onClick={() => {
        const checkedPackages = items.filter((item: IPackage) => item.checked === true);
        
        dispatch(onLoadPackages({
          items: checkedPackages,
          weight: packagesWeight,
          layer,
          id
        }));
        dispatch(onRemovePackage(checkedPackages))
      }}
      onMouseOver={() => {
        setTeirInfo(true);
        setQuantityTierPackages(packages.length);
        setWeightTierPackages(packages.reduce((acc, item) => item.weight + acc, 0));       
      }}
      onMouseLeave={() => setTeirInfo(false)}
    >
      <span className={clsx("text-3xl text-[#ffffffeb] font-semibold", teirInfo ? "opacity-100" : "opacity-0 duration-150 ease-in")}>
        {quantityTierPackages}/{weightTierPackages}<small>kg</small> 
      </span>
    </button>
  );
};

export default TierButton;
