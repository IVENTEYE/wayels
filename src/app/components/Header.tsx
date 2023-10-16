'use client'
import React, { useState, useEffect } from 'react';
import PurpleButton from './PurpleButton';
import { FiFlag, FiPlus } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { BsBox } from 'react-icons/bs';
import Link from 'next/link';
import { TbSmartHome, TbTruckDelivery } from 'react-icons/tb';
import clsx from 'clsx';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { useSpring, animated } from '@react-spring/web';

const Header = () => {
  const pathname = usePathname();

  const [menuVisible, setMenuVisible] = useState(false);
  const [menu, menuApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateX(100%)' }
  }));

  const menuHandleClick = () => {
    if (menuVisible) {
      menuApi.start({
        to: { opacity: 1, transform: 'translateX(0%)' }
      });
      document.body.style.overflowY = 'hidden';
    } else {
      menuApi.start({
        to: { opacity: 0, transform: 'translateX(100%)' }
      });
      document.body.style.removeProperty('overflow-y');
    }
  };

  useEffect(() => {
    menuHandleClick();
  }, [menuVisible]);

  return (
    <header className="fixed top-0 left-0 bg-white w-full px-[13.5px] py-4 z-20 tablet:hidden">
      <div className="flex items-center">
        <div className="flex items-center flex-auto">
          <img className="min-w-[40px] h-[40px] mr-3" src="img/logo.png" alt="Wayels" />
          <div className="mt-[3px]">
            <h1 className="text-accent font-bold text-lg leading-[21px]">Wayels</h1>
            <p className="text-gray text-[10px] ml-[2px]">Workspace</p>
          </div>
        </div>
        <div className="mobile-sm:max-w-[48px] mobile-md:max-w-[169px] w-full mr-3">
          <PurpleButton>
            <FiPlus className="min-w-[20px] h-5 mobile-md:mr-2 transition-all duration-150 ease-in-out" />
            <p className='mobile-sm:hidden mobile-md:block'>Create shipment</p>
          </PurpleButton>
        </div>
        <button type="button" onClick={() => setMenuVisible(!menuVisible)} className="bg-[#F7F7FD] w-12 h-12 rounded-md flex justify-center items-center z-[3]">
          <div className={clsx("menu__icon", menuVisible ? "_active" : "")}>
            <span></span>
          </div>
        </button>
      </div>
      <animated.div style={menu} className="fixed top-0 right-0 w-[275px] h-full bg-white shadow-2xl shadow-[0_0px_0px_1061px_rgb(0_0_0_/_0.3)]">
        <h2 className='pl-5 text-2xl font-bold mt-[21px]'>Menu</h2>
        <nav className="flex flex-col flex-auto overflow-y-auto overflow-x-hidden pt-7 pb-[30px] h-full">
          <ul>
            <li className="mb-1 last:mb-0 py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <AiOutlineInfoCircle className="min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out"/>
                <p>Requests</p> <span className="label">10</span>
              </button>
            </li>
            <li className="mb-1 last:mb-0 py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full  items-center">
                <IoMdNotificationsOutline className="min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out"/>
                <p>Notifications</p> <span className="label">1</span>
              </button>
            </li>
          </ul>
          <hr className="border-[#F1F1F1] my-6 mx-[-10px]" />
          <ul>
            <li className="mb-1 last:mb-0 py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <TbSmartHome className="min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out" />
                <p>Dashboard</p>
              </button>
            </li>
            <li
              className={clsx(
                'mb-1 last:mb-0 py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out',
                pathname === '/shipments' ? '!text-[#232137] after:opacity-[1] bg-[#FAFAFC]' : '',
              )}>
              <Link
                href="/shipments"
                onClick={() => setMenuVisible(false)}
                className="px-5 text-inherit font-medium flex w-full items-center">
                <TbTruckDelivery
                  className={clsx(
                    'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
                    pathname === '/shipments' ? '!text-[#846CCA]' : '',
                  )}
                />
                <p>Shipments</p>
              </Link>
            </li>
            <li className="mb-1 last:mb-0  py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <BsBox className="min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out"/>
                <p>Parcels</p> <span className="label label--active">2</span>
              </button>
            </li>
            <li className="mb-1 last:mb-0  py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <FiFlag className="min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out"/>
                <p>Branches</p>
              </button>
            </li>
            <li className="mb-1 last:mb-0  py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <FaRegUser className="min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out"/>
                <p>Clients</p>
              </button>
            </li>
          </ul>
        </nav>
      </animated.div>
    </header>
  );
};

export default Header;
