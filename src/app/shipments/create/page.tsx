'use client';
import Checkbox from '@/app/components/Checkbox';
import Field from '@/app/components/Field';
import GrayButton from '@/app/components/GrayButton';
import Packages from '@/app/components/Packages';
import ShipmentCard from '@/app/components/ShipmentCard';
import { useTypedSelector } from '@/app/hooks/useSelector';
import { onCheck, pushItem, setRenderItems, setTruckId } from '@/app/redux/slices/shipmentsSlice';
import { TypeRootState } from '@/app/redux/store';
import { IPackage, IShipment, TierType } from '@/app/types';
import { useTransition, animated } from '@react-spring/web';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { BsBox } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

type LayersTierType = {
  upper: TierType[];
  middle: TierType[];
  lower: TierType[];
};

const Create = () => {
  const dispatch = useDispatch();
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'R'];
  const date =
    new Date().getDate() +
    ' ' +
    new Date().toLocaleString('en', { month: 'short' }) +
    ', ' +
    new Date().toLocaleTimeString('en', { hour12: true, hour: 'numeric', minute: '2-digit' });

  const getRandomInt = (max: number, min: number) => {
    max = Math.ceil(max);
    min = Math.ceil(min);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const shipmentGenerateId = letters[getRandomInt(0, 13)] + Math.random().toString().slice(2, 8);

  const [shipmentId] = useState(shipmentGenerateId);
  const [shipmentKg, setShipmentKg] = useState('');
  const [shipmentAvailable, setShipmentAvailable] = useState('0');
  const [shipmentCapacity, setShipmentCapacity] = useState(0);
  const [shipmentDate, setShipmentDate] = useState(date);

  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [shipmentPath, setShipmentPath] = useState('');

  const [shipmentTruck, setShipmentTruck] = useState('Iveco 80E18');
  const [shipmentPackages, setShipmentPackages] = useState<IPackage[]>([]);
  const [shipmentTiers, setShipmentTiers] = useState<LayersTierType>({
    upper: [
      {
        id: 1,
        maxCapacity: 3,
        maxWeight: 20,
        packages: [],
      },
      {
        id: 2,
        maxCapacity: 3,
        maxWeight: 20,
        packages: [],
      },
      {
        id: 3,
        maxCapacity: 3,
        maxWeight: 20,
        packages: [],
      },
      {
        id: 4,
        maxCapacity: 3,
        maxWeight: 20,
        packages: [],
      },
    ],
    middle: [
      {
        id: 5,
        maxCapacity: 5,
        maxWeight: 50,
        packages: [],
      },
      {
        id: 6,
        maxCapacity: 5,
        maxWeight: 50,
        packages: [],
      },
      {
        id: 7,
        maxCapacity: 5,
        maxWeight: 50,
        packages: [],
      },
      {
        id: 8,
        maxCapacity: 5,
        maxWeight: 50,
        packages: [],
      },
    ],
    lower: [
      {
        id: 9,
        maxCapacity: 8,
        maxWeight: 150,
        packages: [],
      },
      {
        id: 10,
        maxCapacity: 8,
        maxWeight: 150,
        packages: [],
      },
      {
        id: 11,
        maxCapacity: 8,
        maxWeight: 150,
        packages: [],
      },
      {
        id: 12,
        maxCapacity: 8,
        maxWeight: 150,
        packages: [],
      },
    ],
  });
  const [packagesActive, setPackagesActive] = useState(false);
  const [finishError, setFinishError] = useState(false);

  const router = useRouter();

  const packages = useTypedSelector((state: TypeRootState) => state.shipments.packages.items);
  const renderItem: IShipment[] = useTypedSelector(
    (state: TypeRootState) => state.shipments.renderItems,
  );

  let newShipment = {
    path: shipmentPath,
    date: shipmentDate,
    capacity: shipmentCapacity,
    available: Number(shipmentAvailable),
    kg: Number(shipmentKg),
    id: shipmentId,
    truck: shipmentTruck,
    loadedPackages: shipmentPackages,
    tiers: shipmentTiers,
  };

  const options = [
    { value: 'Iveco 80E18', label: 'Iveco 80E18' },
    { value: 'Iveco 90E14', label: 'Iveco 90E14' },
    { value: 'Iveco 90E21', label: 'Iveco 90E21' },
  ];

  useEffect(() => {
    setShipmentTruck(options[0].label);
  }, []);

  useEffect(() => {
    if (renderItem.length === 1) {
      setShipmentCapacity(renderItem[0].capacity);
      setShipmentAvailable(renderItem[0].available.toString());
      setShipmentPackages(renderItem[0].loadedPackages);
      setShipmentTiers(renderItem[0].tiers);
    }
  }, [renderItem]);

  useEffect(() => {
    setShipmentAvailable(shipmentKg);
  }, [shipmentKg]);

  useEffect(() => {
    if (departureCity === '' && destinationCity === '') {
      setShipmentPath('From — To');
    } else {
      setShipmentPath(departureCity + ' — ' + destinationCity);
    }
  }, [departureCity, destinationCity]);

  useEffect(() => {
    if (packagesActive) {
      dispatch(setRenderItems([newShipment]));
    }
  }, [packagesActive]);

  const departureShipmentPath = (value: string) => {
    setDepartureCity(value);
  };

  const destinationShipmentPath = (value: string) => {
    setDestinationCity(value);
  };

  const inputCapacity = (value: number) => {
    setShipmentKg(value.toString());
  };

  const onOpenPackages = () => {
    setPackagesActive(!packagesActive);
  };

  const onClosePackages = () => {
    setPackagesActive(false);
  };

  const onUpdate = (name: string, state: boolean) => {
    dispatch(onCheck({ name, state }));
  };

  const onFinish = () => {
    if (departureCity === '' || destinationCity === '' || shipmentKg === '') {
      setFinishError(true);
    } else {
      setFinishError(false);
      dispatch(pushItem(newShipment));
      dispatch(setTruckId(''));
      router.push('/shipments');
    }
  };

  const packagesTransition = useTransition(packagesActive, {
    delay: packagesActive ? 580 : 0,
    from: { transform: 'translateX(120%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(120%)', opacity: 0 },
  });

  const settingsTransition = useTransition(packagesActive, {
    from: { transform: 'translateX(120%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(120%)', opacity: 0 },
  });

  const option = options.map(option => option.label === shipmentTruck).indexOf(true);

  return (
    <div className="mb-4 mt-[65px] tablet:mt-0">
      <div className="flex items-center max-w-7xl">
        <h1 className="font-bold flex-auto text-xl text-[#232137] my-7">Create Shipment</h1>
      </div>
      {/* flex flex-col mobile-md:flex-row */}
      <div className="shipments relative mobile-sm:flex mobile-sm:flex-col mobile-md:grid mobile-md:grid-cols-cards mb-3 mobile-sm:gap-4 mobile-md:gap-[10px]">
        <div className={!packagesActive ? 'pointer-events-none' : ''}>
          <ShipmentCard
            key={shipmentId}
            available={Number(shipmentAvailable)}
            capacity={shipmentCapacity}
            date={shipmentDate.toString()}
            id={shipmentId.toString()}
            kg={shipmentKg === '' ? 0 : Number(shipmentKg)}
            path={shipmentPath}
            truck={shipmentTruck}
            loadedPackages={shipmentPackages}
            tiers={shipmentTiers}
            activePackages={packagesActive}
          />
        </div>
        {settingsTransition(
          (style, item) =>
            !item && (
              <animated.div
                style={style}
                className="bg-white mobile-md:h-[244px] flex flex-col rounded-[4px] pt-3 pl-[15px] pr-[12px] mobile-md:pt-5 pb-5 mobile-md:pl-[27px] mobile-md:pr-[24px]"
              >
                <div className='flex items-end flex-wrap mb-2'>
                  <h2 className="text-[#1D1A2B] font-bold text-base mr-3">Shipment Settings</h2>
                  <span className={clsx("text-red-500 transition-all duration-150 ease-in mb-[1.3px] text-[13px]", finishError ? "opacity-100" : "opacity-0")}>Все поля должны быть заполнены</span>
                </div>
                <div className="flex w-full flex-wrap items-center gap-2 mb-2">
                  <div className="mobile-sm:flex-[0_0_100%] mobile-md:flex-auto">
                    <h3 className="text-gray font-medium text-sm mb-1 mr-3">From</h3>
                    <Field
                      placeholder="Enter departure city..."
                      value={departureCity}
                      action={departureShipmentPath}
                      type="text"
                      style={finishError ? {borderColor: 'red'} : ""}
                    />
                  </div>
                  <span className="mobile-sm:hidden mobile-md:inline-flex mt-6 font-medium text-[15px] mx-1">—</span>
                  <div className="mobile-sm:flex-[0_0_100%] mobile-md:flex-auto">
                    <h3 className="text-gray font-medium text-sm mb-1 mr-3">To</h3>
                    <Field
                      placeholder="Enter destination city..."
                      value={destinationCity}
                      action={destinationShipmentPath}
                      type="text"
                      style={finishError ? {borderColor: 'red'} : ""}
                    />
                  </div>
                </div>
                <div className='flex w-full flex-wrap items-center mobile-sm:gap-2 mobile-md:gap-8'>
                  <div className="mobile-sm:flex-[0_0_100%] mobile-md:flex-[1_1_27%]">
                    <h3 className="text-gray font-medium text-sm mb-1 mr-3">Max capasity</h3>
                    <Field
                      placeholder="Enter max capacity..."
                      value={shipmentKg}
                      action={inputCapacity}
                      type="number"
                      style={finishError ? {borderColor: 'red'} : ""}
                    />
                  </div>
                  <div className="flex flex-col mobile-sm:flex-[0_0_100%] mobile-md:flex-[1_1_27%]">
                    <h3 className="text-gray font-medium text-sm mb-1 mr-3">Shipment truck</h3>
                    <Select
                      options={options}
                      defaultValue={options[option]}
                      isSearchable={false}
                      classNamePrefix="shipment-select"
                      onChange={(e: any) => setShipmentTruck(e.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mobile-sm:flex-col mobile-md:flex-row mobile-sm:mt-5 mobile-md:mt-3">
                  <div className='flex flex-[1_1_50%]'>
                    <GrayButton disabled={shipmentKg === '' ? true : false} action={onOpenPackages}>
                      <BsBox className="min-w-[12px] h-[12px] mr-2" /> Packages list
                    </GrayButton>
                  </div>
                  <div className='flex flex-[1_1_50%]'>
                    <GrayButton action={onFinish}>
                      <TbTruckDelivery className="min-w-[15px] h-[15px] mr-2" /> Create shipment
                    </GrayButton>
                  </div>
                </div>
              </animated.div>
            ),
        )}
        {packagesTransition(
          (style, item) =>
            item && (
              <animated.div className="h-[665px] packages-wrapper" style={style}>
                <Packages>
                  {packages.map((item) => {
                    return (
                      <div
                        key={item.name}
                        className="grid grid-cols-packages text-[13px] py-3 px-4 text-[#1D1A2B] font-medium text-[12px] border-b border-[#e4e3e3]">
                        <Checkbox obj={item} onUpdate={onUpdate} />
                        <div className="text-right mr-[50px]">{item.weight}</div>
                        <div>{item.date}</div>
                      </div>
                    );
                  })}
                  <div className="flex mt-4">
                    <GrayButton action={onClosePackages}>
                      <BsBox className="min-w-[15px] h-[15px] mr-2" /> Close packages
                    </GrayButton>
                  </div>
                </Packages>
              </animated.div>
            ),
        )}
      </div>
    </div>
  );
};

export default Create;
