'use client';
import React, { useEffect, useState, useRef } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useTypedSelector } from '../hooks/useSelector';
import { TypeRootState } from '../redux/store';
import ShipmentCard from '../components/ShipmentCard';
import Checkbox from '../components/Checkbox';
import Packages from '../components/Packages';
import { useDispatch } from 'react-redux';
import { onCheck, setRenderItems } from '../redux/slices/shipmentsSlice';
import { IShipment } from '../types';
import { useTransition, animated } from '@react-spring/web';
import SearchField from '../components/SearchField';
import Select from '../components/SelectMenu';
import SelectMenu from '../components/SelectMenu';
import clsx from 'clsx';

const Shipments = () => {
  const shipments = useTypedSelector((state: TypeRootState) => state.shipments.items);
  const renderItems: IShipment[] = useTypedSelector((state: TypeRootState) => state.shipments.renderItems);
  const sortBy = useTypedSelector((state: TypeRootState) => state.shipments.sortBy);
  const packages = useTypedSelector((state: TypeRootState) => state.shipments.packages.items);
  const [packagesVisible, setPackagesVisible] = useState(false);
  const dispatch = useDispatch();

  const { activeTruckId } = useTypedSelector((state: TypeRootState) => state.shipments);

  useEffect(() => {
    dispatch(setRenderItems(shipments));
  }, []);

  useEffect(() => {
    console.log(renderItems);
    
  }, [renderItems]);

  useEffect(() => {
    const handleElement: IShipment[] = renderItems.filter(
      (item: IShipment) => item.id === activeTruckId,
    );

    if (handleElement.length > 0) {
      dispatch(setRenderItems(handleElement));
    }

    if (activeTruckId === '') {
      setPackagesVisible(false);
    }
    
  }, [activeTruckId]);

  const onUpdate = (name: string, state: boolean) => {
    dispatch(onCheck({ name, state }));
  };

  const shipmentTransitions = useTransition(renderItems, {
    keys: (item: IShipment) => item.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onRest: () => {
      if (activeTruckId !== '') {
        setPackagesVisible(true);
      }
    },
  });

  const packagesTransition = useTransition(packagesVisible, {
    from: { transform: 'translateX(120%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(120%)', opacity: 0 },
  });

  return (
    <div className="mb-4 mt-[65px] tablet:mt-0">
      <div className="flex items-center max-w-7xl">
        <div className={clsx("font-bold flex-auto text-xl text-[#232137] my-7", activeTruckId !== '' ? "mb-3" : "")}>
          {renderItems.length > 1 ? (
            <h1>Shipments</h1>
          ) : (
            <>
              <h1 className="text-[#222131] font-bold text-lg mr-2 inline">
                {renderItems[0]?.path ? renderItems[0].path + ',' : 'Loading shipments...'} {renderItems[0]?.id}
              </h1>
              <p className="text-gray font-medium text-[11px] leading-[20.3px] mr-3 inline">{renderItems[0]?.date}</p>
            </>
          )}
        </div>
      </div>
      <div className="shipments relative flex flex-col mobile-md:grid mobile-md:grid-cols-cards gap-[10px]">
        {shipmentTransitions((style, shipment: IShipment) => (
          <animated.div key={shipment.id} style={style}>
            <ShipmentCard
              key={shipment.id}
              available={shipment.available}
              capacity={shipment.capacity}
              date={shipment.date}
              id={shipment.id}
              kg={shipment.kg}
              path={shipment.path}
              truck={shipment.truck}
              loadedPackages={shipment.loadedPackages}
              tiers={shipment.tiers}
            />
          </animated.div>
        ))}
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
                </Packages>
              </animated.div>
            ),
        )}
      </div>
    </div>
  );
};

export default Shipments;
