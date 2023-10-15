import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useSelector';
import { TypeRootState } from '../redux/store';
import ParcelTable from './ParcelTable';
import { useDispatch } from 'react-redux';
import { setPackagesWeight, setSelectedPackages } from '../redux/slices/shipmentsSlice';
import { IShipment } from '../types';
import Image from 'next/image';

const Packages: React.FC<{children: React.ReactNode}> = ({children}) => {
  const dispatch = useDispatch();
  const packages = useTypedSelector((state: TypeRootState) => state.shipments.packages.items);
  const shipment = useTypedSelector((state: TypeRootState) => state.shipments.items);
  const { activeTruckId } = useTypedSelector((state: TypeRootState) => state.shipments);
  const { packagesWeight, selectedPackages } = useTypedSelector((state: TypeRootState) => state.shipments.packages);
  const [packageError, setPackageError] = useState(false);

  useEffect(() => {
    dispatch(setSelectedPackages(packages.filter(item => item.checked).length));
    dispatch(setPackagesWeight(packages.filter(item => item.checked).map(item => Number(item.weight))));
    
  }, [packages]);

  useEffect(() => {
    const currentShipment = shipment.filter((item: IShipment) => item.id === activeTruckId)[0];
    
    if (currentShipment.available < packagesWeight) {
      setPackageError(true);
    } else {
      setPackageError(false);
    }
  }, [packagesWeight])

  return (
    <div className='bg-white h-full w-full rounded-[4px] pt-3 pl-[15px] pr-[12px] mobile-md:pt-6 pb-1 mobile-md:pl-[27px] mobile-md:pr-[24px] inline-block overflow-hidden'>
      <div className="flex items-end mb-3">
        <h3 className="text-[#1D1A2B] font-bold text-base mr-3">Available packages</h3>
        <p className="text-gray font-medium text-[12px] leading-5 mr-2">
          Selected: <span>{selectedPackages}</span>
        </p>
        <p className="text-gray font-medium text-[12px] leading-5">
          Weight, kg: <span className={packageError ? "text-red-600" : ""}>{packagesWeight}</span>
        </p>
      </div>
      <div className='overflow-y-auto h-full mb-3 mobile-sm:pb-6 mobile-md:pb-0'>
        <ParcelTable>
          {children}
        </ParcelTable>
      </div>

      {/* <div className='absolute top-[-50px] left-0 bg-white px- py-4 rounded-md'>
          <div className='flex'>
            <div className='bg-[#f3efeb5a] rounded-full w-[39px] h-[39px] p-2 flex items-center justify-center'>
              <Image src="/img/shipments/parcel.png" alt="Parcel" width={17} height={17}/>
            </div>
            <div className='ml-4'>
              <h3 className='font-bold text-[#1D1A2B]'>4 parcels</h3>
              <p className='text-gray text-[12px]'>Total weight: 200 kg</p>
            </div>
          </div>
      </div> */}
    </div>
  );
};

export default Packages;
