import React from 'react';
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
  const totalTierWeight = packages.reduce((acc, item) => item.weight + acc, 0);

  // const test = () => {
  //   if (packagesWeight !== 0)
  // };
  return (
    <button
      type="button"
      disabled={
        packages.length >= capacity ||
        selectedPackages > capacity ||
        selectedPackages === 0 ||
        packagesWeight > weight ||
        // packagesWeight !== 0 ? totalTierWeight >= weight : false ||
        available < packagesWeight
      }
      className={clsx(
        'bg-[#F9F9FB] w-full h-[70px] rounded-[4px] transition-colors duration-150 ease-out active:bg-[#7B57DF] disabled:pointer-events-none',
        packages.length >= capacity ||
        selectedPackages > capacity ||
          packagesWeight > weight ||
          // packagesWeight !== 0 ? totalTierWeight >= weight : false ||
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
    >
    </button>
  );
};

export default TierButton;
