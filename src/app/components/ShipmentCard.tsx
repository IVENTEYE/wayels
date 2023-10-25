import Image from 'next/image';
import React, { useState, useEffect, ReactNode } from 'react';
import { IShipment } from '../types';
import clsx from 'clsx';
import { BsBox } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import GrayButton from './GrayButton';
import ParcelTable from './ParcelTable';
import { animated, useSpring, useTransition } from '@react-spring/web';
import { useTypedSelector } from '../hooks/useSelector';
import { TypeRootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setItems, setRenderItems, setTruckId } from '../redux/slices/shipmentsSlice';
import TierButton from './TierButton';
import { usePathname } from 'next/navigation';

const ShipmentCard: React.FC<IShipment> = ({
  available,
  capacity,
  date,
  id,
  kg,
  path,
  truck,
  loadedPackages,
  tiers,
  activePackages
}) => {
  let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
  const [parcelsListTab, setParcelsListTab] = useState(false);
  const { activeTruckId } = useTypedSelector(
    (state: TypeRootState) => state.shipments,
  );
  const renderItems: IShipment[] = useTypedSelector((state: TypeRootState) => state.shipments.renderItems);
  const shipments = useTypedSelector((state: TypeRootState) => state.shipments.items);
  const expanded = useTypedSelector((state: TypeRootState) => state.sidebar.expanded);
  const dispatch = useDispatch();

  const [shipmentCard, shipmentCardApi] = useSpring(() => ({
    from: { x: 0, y: 0 },
  }));

  const [shipmentHeightIn, shipmentHeightInApi] = useSpring(() => ({
    from: { height: window.innerWidth <= 480 ? 270 : 244 },
  }));

  const [shipmentIn, shipmentInApi] = useSpring(() => ({
    from: { opacity: 0 },
  }));

  const [shipmentOut, shipmentOutApi] = useSpring(() => ({
    from: { opacity: 1 },
  }));

  const [shipmentBody, shipmentBodyApi] = useSpring(() => ({
    from: { height: '0' },
  }));

  const [liAnimate, liAnimateApi] = useSpring(() => ({
    from: window.innerWidth <= 480 ? { left: '0', textAlign: 'left' } : { transform: 'translateY(0%)' },
    config: { duration: 500 },
  }));

  const [weightTextAnim, weightTextAnimApi] = useSpring(() => ({
    from: { fontSize: 12 },
  }));

  const [weightValueAnim, weightValueAnimApi] = useSpring(() => ({
    from: { fontSize: 14 },
  }));

  const onTab = () => {
    setParcelsListTab(!parcelsListTab);
  };

  const onFinish = () => {
    dispatch(setTruckId(''));

    const updateShipment: IShipment[] = shipments.map((item: IShipment) => {
      if (item.id === renderItems[0].id) {
        return {
          ...item,
          capacity: renderItems[0].capacity,
          available: renderItems[0].available,
          loadedPackages: renderItems[0].loadedPackages,
          tiers: renderItems[0].tiers,
        };
      }
      return item;
    });
    
    dispatch(setItems(updateShipment));

    shipmentHeightInApi.set({
      height: window.innerWidth <= 480 ? 270 : 244
    });

    shipmentOutApi.start({
      reverse: true,
      to: {opacity: 1}
    });

    shipmentInApi.start({
      reverse: true,
      to: {opacity: 0}
    });

    liAnimateApi.start({
      reverse: true,
      to: window.innerWidth <= 480 ? {left: '0', textAlign: 'left'} : {transform: 'translateY(0%)'}
    });

    weightTextAnimApi.start({
      reverse: true,
      to: {fontSize: 12}
    });

    weightValueAnimApi.start({
      reverse: true,
      to: { fontSize: 14 }
    });
  };

  const shipmentCardAnimate = () => {
    shipmentHeightInApi.start({
      delay: 350,
      to: {
        height: window.innerWidth <= 480 ? 737 : 665,
      },
    });

    shipmentBodyApi.start({
      delay: 360,
      to: {
        height: 'auto',
      },
    });

    shipmentInApi.start({
      to: {
        opacity: 1,
      },
    });

    shipmentOutApi.start({
      to: {
        opacity: 0,
      },
    });

    weightTextAnimApi.start({
      to: {
        fontSize: 14,
      },
    });

    weightValueAnimApi.start({
      to: {
        fontSize: 25,
      },
    });

    if (window.innerWidth <= 480) {
      liAnimateApi.start({
        to: {
          left: '38%',
          textAlign: 'center'
        },
      });
    } else {
      liAnimateApi.start({
        to: {
          transform: 'translateY(50%)',
        },
      });
    }
  }

  useEffect(() => {
    dispatch(setRenderItems(shipments));
  }, [shipments]);

  useEffect(() => {
    if (activePackages) {
      shipmentCardAnimate();
    } else {
      shipmentHeightInApi.start({
        reverse: true,
      });
  
      shipmentBodyApi.start({
        reverse: true,
        to: {height: 'auto'}
      });
  
      shipmentInApi.start({
        reverse: true,
      });
  
      shipmentOutApi.start({
        reverse: true,
      });
  
      weightTextAnimApi.start({
        reverse: true,
      });
  
      weightValueAnimApi.start({
        reverse: true,
      });
  
      if (window.innerWidth <= 480) {
        liAnimateApi.start({
          reverse: true,
        });
      } else {
        liAnimateApi.start({
          reverse: true,
        });
      }
    }
  }, [activePackages]);

  const handleClick = (e: any) => {
    if (activeTruckId === '') {
      const elementClientX = e.target.closest('.shipment').getBoundingClientRect().left;
      const elementClientY = e.target.closest('.shipment').getBoundingClientRect().top;
      
      dispatch(setTruckId(id));

      let startPointX = expanded ? 127 : 301;
      let startPointY = 77;

      if (window.innerWidth <= 840 || isMobile.any()) {
        startPointX = 13.5;
        startPointY = 149;
      }
      
      let moveX = startPointX - Math.floor(elementClientX);
      let moveY = startPointY - elementClientY - window.scrollY;
  
      if (Math.floor(elementClientX) !== 307 && Math.floor(elementClientY) !== 33) {
        shipmentCardApi.start({
          to: {
            x: moveX,
            y: moveY,
          },
          onRest: (ctrl) => {
            setTimeout(() => {
              shipmentCardApi.set({
                x: 0,
                y: 0,
              });
            }, 3);
          },
        });
      }
  
      shipmentCardAnimate();
    }
  };

  const tiersTransition = useTransition(parcelsListTab, {
    config: { duration: 300 },
    from: { transform: 'translateX(-100%)', opacity: 1 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(-100%)', opacity: 0 },
  });

  const parcelsTransition = useTransition(parcelsListTab, {
    config: { duration: 330 },
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(100%)', opacity: 0 },
  });

  return (
    // h-[244px]
    <animated.div
      onClick={(e) => handleClick(e)}
      style={{ ...shipmentCard, ...shipmentHeightIn }}
      className={clsx('overflow-hidden', activeTruckId !== '' ? 'cursor-none' : '')}>
      <div
        className={clsx(
          'shipment bg-white w-full rounded-md mobile-sm:px-4 mobile-md:px-6 mobile-sm:py-4 mobile-md:pt-[24px] mobile-md:pb-[22px] cursor-pointer transition-all duration-200 ease-in will-change-[scale] hover:scale-[1.02] hover:shadow-lg',
          activeTruckId !== '' ? '!cursor-default hover:scale-[1]' : '',
        )}>
        <div className="flex items-center mb-5">
          <div className="flex flex-auto items-end relative flex-wrap">
            <animated.h2 style={shipmentOut} className="text-[#222131] font-bold text-base mr-3">
              {path}
            </animated.h2>
            <animated.h2
              style={shipmentIn}
              className="text-[#222131] font-bold text-[18px] absolute top-[5px] left-0">
              Truck load
            </animated.h2>
            <animated.p style={shipmentOut} className="text-gray text-[11px] leading-[20.3px] mr-3">
              {date}
            </animated.p>
          </div>
          <div
            className={clsx(
              'font-medium text-2xl self-baseline',
              capacity < 50
                ? 'text-normal'
                : capacity >= 50 && capacity < 90
                ? 'text-medium'
                : null,
              capacity >= 90 ? 'text-full' : '',
            )}>
            {capacity}%
          </div>
        </div>
        <div className="flex items-center mobile-sm:flex-col-reverse mobile-md:flex-row">
          <ul className="flex flex-wrap mobile-sm:justify-between mobile-sm:w-full mobile-sm:flex-row mobile-md:flex-col mobile-md:flex-auto mobile-md:mr-1 mobile-sm:gap-1 mobile-md:gap-3">
            <animated.li style={liAnimate} className="mobile-sm:relative mobile-md:static">
              <animated.p
                style={weightTextAnim}
                className="text-[#A7ABB4] text-[12px] font-medium mb-[3px]">
                Available, kg
              </animated.p>
              <animated.p style={weightValueAnim} className="text-[14px] text-gray font-medium">
                <span className="text-[#222131]">{available}</span>/{kg}
              </animated.p>
            </animated.li>
            <animated.li style={shipmentOut}>
              <p className="text-[#A7ABB4] text-[12px] font-medium mb-[3px]">Shipment number</p>
              <p className="text-[14px] text-gray font-medium">
                <span className="text-[#222131]">{id}</span>
              </p>
            </animated.li>
            <animated.li style={shipmentOut}>
              <p className="text-[#A7ABB4] text-[12px] font-medium mb-[3px]">Truck</p>
              <p className="text-[14px] text-gray font-medium">
                <span className="text-[#222131]">{truck}</span>
              </p>
            </animated.li>
          </ul>
          <div className="relative mobile-sm:mb-5 mobile-md:mb-0">
            <div className="w-[240px] h-[119px] relative opacity-[0.5]">
              <Image
                className="absolute w-full h-full"
                src="/img/shipments/car.png"
                alt="Iveco 80E18"
                width={240}
                height={119}
              />
            </div>
            <div className="h-[83px] w-[177px] absolute right-0 top-0">
              <div
                style={{ width: capacity + '%' }}
                className={clsx(
                  "absolute top-0 left-0 h-full w-auto bg-[url('images/loadline.png')] bg-cover bg-no-repeat transition-all duration-300 ease-in",
                  capacity < 50
                    ? 'bg-normal'
                    : capacity >= 50 && capacity < 90
                    ? 'bg-medium'
                    : null,
                  capacity >= 90 ? 'bg-full' : '',
                )}></div>
            </div>
          </div>
        </div>
        {/* Tiers */}
        <div>
          <animated.div style={shipmentIn} className="flex h-[353px]">
            {tiersTransition(
              (style, item) =>
                !item && (
                  <animated.div
                    className="overflow-hidden w-full flex-[0_0_100%] pt-[70px] mt-[-70px]"
                    style={{ ...shipmentBody, ...shipmentIn, ...style }}>
                    <div className="mb-3">
                      <p className="mb-2 font-medium">Upper tier <span aria-label='You can load no more than 3 packages weighing up to 20kg' className='relative before:content-[attr(aria-label)] before:pointer-events-none before:absolute before:top-[-64px] before:w-[157px] before:shadow-md before:text-center before:bg-white before:p-2 before:rounded-md before:text-xs before:translate-x-[-50%] before:left-[100%] before:opacity-0 before:transition-all before:duration-150 before:ease-out hover:before:top-[-70px] hover:before:opacity-100'><AiOutlineInfoCircle className="w-[15px] h-[15px] inline-block cursor-pointer mb-[2px]"/></span></p>
                      <div className="grid gap-2 grid-cols-tiers">
                        {tiers.upper.map((tier) => {
                          return (
                            <TierButton
                              key={tier.id}
                              layer="upper"
                              id={tier.id}
                              available={available}
                              capacity={tier.maxCapacity}
                              weight={tier.maxWeight}
                              packages={tier.packages}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="mb-2 font-medium">Middel tier <span aria-label='You can load no more than 5 packages weighing up to 50kg' className='relative before:content-[attr(aria-label)] before:pointer-events-none before:absolute before:top-[-64px] before:w-[157px] before:shadow-md before:text-center before:bg-white before:p-2 before:rounded-md before:text-xs before:translate-x-[-50%] before:left-[100%] before:opacity-0 before:transition-all before:duration-150 before:ease-out hover:before:top-[-70px] hover:before:opacity-100'><AiOutlineInfoCircle className="w-[15px] h-[15px] inline-block cursor-pointer mb-[2px]"/></span></p>
                      <div className="grid gap-2 grid-cols-tiers">
                        {tiers.middle.map((tier) => {
                          return (
                            <TierButton
                              key={tier.id}
                              layer="middle"
                              id={tier.id}
                              available={available}
                              capacity={tier.maxCapacity}
                              weight={tier.maxWeight}
                              packages={tier.packages}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="mb-2 font-medium">Lower tier <span aria-label='You can load no more than 8 packages weighing up to 150kg' className='relative before:content-[attr(aria-label)] before:pointer-events-none before:absolute before:top-[-64px] before:w-[157px] before:shadow-md before:text-center before:bg-white before:p-2 before:rounded-md before:text-xs before:translate-x-[-50%] before:left-[100%] before:opacity-0 before:transition-all before:duration-150 before:ease-out hover:before:top-[-70px] hover:before:opacity-100'><AiOutlineInfoCircle className="w-[15px] h-[15px] inline-block cursor-pointer mb-[2px]"/></span></p>
                      <div className="grid gap-2 grid-cols-tiers">
                        {tiers.lower.map((tier) => {
                          return (
                            <TierButton
                              key={tier.id}
                              layer="lower"
                              id={tier.id}
                              available={available}
                              capacity={tier.maxCapacity}
                              weight={tier.maxWeight}
                              packages={tier.packages}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </animated.div>
                ),
            )}
            {parcelsTransition(
              (style, item) =>
                item && (
                  <animated.div style={style} className="mb-3 w-full flex-[0_0_100%]">
                    <h3 className="text-[#1D1A2B] font-bold text-base mr-3 mb-3">
                      Loaded packages
                    </h3>
                    <div className="max-h-[307px] overflow-x-auto">
                      <ParcelTable>
                        {loadedPackages.map((item) => {
                          return (
                            <div
                              key={item.name}
                              className="grid grid-cols-packages text-[13px] py-3 px-4 text-[#1D1A2B] font-medium text-[12px] border-b border-[#e4e3e3]">
                              <p>{item.name}</p>
                              <div className="text-right mr-[50px]">{item.weight}</div>
                              <div>{item.date}</div>
                            </div>
                          );
                        })}
                      </ParcelTable>
                    </div>
                  </animated.div>
                ),
            )}
          </animated.div>
          {/* Actions */}
          <animated.div className="flex gap-2 mobile-sm:flex-col mobile-md:flex-row" style={shipmentIn}>
            <GrayButton action={onTab}>
              <BsBox className="w-[12px] h-[12px] mr-2" /> {parcelsListTab ? 'Close' : 'View'}{' '}
              parcels list
            </GrayButton>
            {!activePackages && (
              <GrayButton action={onFinish}>
                <TbTruckDelivery className="w-[15px] h-[15px] mr-2" /> Finish loading
              </GrayButton>
            )
            }
          </animated.div>
        </div>
      </div>
    </animated.div>
  );
};

export default ShipmentCard;
