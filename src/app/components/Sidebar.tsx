'use client';

import React, { useEffect } from 'react';
import { TbSmartHome, TbTruckDelivery } from 'react-icons/tb';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoMdNotificationsOutline, IoIosArrowBack } from 'react-icons/io';
import { BsBox } from 'react-icons/bs';
import { FiFlag, FiPlus, FiMoreHorizontal } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useSpring, animated, useTransition } from '@react-spring/web';
import { useTypedSelector } from '../hooks/useSelector';
import { TypeRootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setExpand } from '../redux/slices/sidebarSlice';
import PurpleButton from './PurpleButton';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const expanded = useTypedSelector((state: TypeRootState) => state.sidebar.expanded);

  const [sidebarHide, sidebarHideApi] = useSpring(() => ({
    config: { duration: 200 },
    from: { opacity: 1 },
  }));

  const onChangeSidebar = () => {
    const wrapper = document.querySelector('.wrapper');

    if (expanded) {
      wrapper?.classList.add('wrapper--sm');
      sidebarHideApi.start({
        to: { opacity: 0 },
      });
    } else {
      wrapper?.classList.remove('wrapper--sm');
      sidebarHideApi.start({
        to: { opacity: 1 },
      });
    }
  };

  const hideTransition = useTransition(expanded, {
    config: { duration: 75 },
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    onChangeSidebar();
  }, [expanded]);

  return (
    <aside className="px-[10px] w-full py-6 bg-white h-[100dvh] flex-col sticky top-0 hidden tablet:flex">
      <button
        onClick={() => dispatch(setExpand())}
        className="absolute top-[31px] right-[-10px] p-[3px] bg-[#E6E1FF] rounded-[50%]">
        <IoIosArrowBack
          className={clsx(
            'w-[17px] h-[17px] text-[#6D6692] transition-all',
            expanded ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>
      <div className="flex flex-col h-full overflow-x-hidden">
        {/* logo */}
        <div className="flex items-center mb-8 ml-5">
          <img className="min-w-[40px] h-[40px] mr-3" src="img/logo.png" alt="Wayels" />
          <animated.div style={sidebarHide} className="mt-[3px]">
            <h1 className="text-accent font-bold text-lg leading-[21px]">Wayels</h1>
            <p className="text-gray text-[10px] ml-[2px]">Workspace</p>
          </animated.div>
        </div>
        {/* Navbar */}
        <nav className="flex flex-col flex-auto overflow-y-auto overflow-x-hidden">
          <ul>
            <li className="mb-1 last:mb-0 py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <AiOutlineInfoCircle
                  className={clsx(
                    'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
                    expanded ? 'w-[35px] h-[23px] delay-75 mr-0' : '',
                  )}
                />
                {hideTransition(
                  (style, item) =>
                    !item && (
                      <animated.div style={style} className="flex items-center w-full">
                        <p>Requests</p> <span className="label">10</span>
                      </animated.div>
                    ),
                )}
              </button>
            </li>
            <li className="mb-1 last:mb-0 py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full  items-center">
                <IoMdNotificationsOutline
                  className={clsx(
                    'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
                    expanded ? 'w-[35px] h-[23px] delay-75 mr-0' : '',
                  )}
                />
                {hideTransition(
                  (style, item) =>
                    !item && (
                      <animated.div style={style} className="flex items-center w-full">
                        <p>Notifications</p> <span className="label">1</span>
                      </animated.div>
                    ),
                )}
              </button>
            </li>
          </ul>
          <hr className="border-[#F1F1F1] my-6 mx-[-10px]" />
          <ul>
            <li className="mb-1 last:mb-0 py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <TbSmartHome
                  className={clsx(
                    'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
                    expanded ? 'w-[35px] h-[23px] delay-75 mr-0' : '',
                  )}
                />
                {hideTransition(
                  (style, item) =>
                    !item && (
                      <animated.div style={style} className="flex items-center w-full">
                        <p>Dashboard</p>
                      </animated.div>
                    ),
                )}
              </button>
            </li>
            <li
              className={clsx(
                'mb-1 last:mb-0 py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out',
                pathname === '/shipments' ? '!text-[#232137] after:opacity-[1] bg-[#FAFAFC]' : '',
              )}>
              <Link
                href="/shipments"
                className="px-5 text-inherit font-medium flex w-full items-center">
                <TbTruckDelivery
                  className={clsx(
                    'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
                    expanded ? 'w-[35px] h-[23px] delay-75 mr-0' : '',
                    pathname === '/shipments' ? '!text-[#846CCA]' : '',
                  )}
                />
                {hideTransition(
                  (style, item) =>
                    !item && (
                      <animated.div style={style} className="flex items-center w-full">
                        <p>Shipments</p>
                      </animated.div>
                    ),
                )}
              </Link>
            </li>
            <li className="mb-1 last:mb-0  py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <BsBox
                  className={clsx(
                    'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
                    expanded ? 'w-[35px] h-[23px] delay-75 mr-0' : '',
                  )}
                />
                {hideTransition(
                  (style, item) =>
                    !item && (
                      <animated.div style={style} className="flex items-center w-full">
                        <p>Parcels</p> <span className="label label--active">2</span>
                      </animated.div>
                    ),
                )}
              </button>
            </li>
            <li className="mb-1 last:mb-0  py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <FiFlag
                  className={clsx(
                    'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
                    expanded ? 'w-[35px] h-[23px] delay-75 mr-0' : '',
                  )}
                />
                {hideTransition(
                  (style, item) =>
                    !item && (
                      <animated.div style={style} className="flex items-center w-full">
                        <p>Branches</p>
                      </animated.div>
                    ),
                )}
              </button>
            </li>
            <li className="mb-1 last:mb-0  py-2 rounded-r-lg relative transition-colors duration-100 ease-in text-[#AEB1B9] hover:after:opacity-[1] hover:text-[#535260] hover:bg-[#FAFAFC] after:bg-[#846CCA] after:content-normal after:absolute after:top-0 after:left-0 after:w-[3px] after:h-full after:rounded-r-md  after:opacity-[0] after:transition-all after:duration-300 after:ease-in-out">
              <button className="px-5 text-inherit font-medium flex w-full items-center">
                <FaRegUser
                  className={clsx(
                    'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
                    expanded ? 'w-[35px] h-[23px] delay-75 mr-0' : '',
                  )}
                />
                {hideTransition(
                  (style, item) =>
                    !item && (
                      <animated.div style={style} className="flex items-center w-full">
                        <p>Clients</p>
                      </animated.div>
                    ),
                )}
              </button>
            </li>
          </ul>
        </nav>
        <PurpleButton>
          <FiPlus
            className={clsx(
              'min-w-[20px] h-5 mr-2 transition-all duration-150 ease-in-out',
              expanded ? 'w-[35px] h-[23px] delay-75 !m-0' : '',
            )}
          />
          {hideTransition(
            (style, item) =>
              !item && (
                <animated.p style={style} className="whitespace-nowrap">
                  Create shipment
                </animated.p>
              ),
          )}
        </PurpleButton>
        <hr className="border-[#F1F1F1] my-6 mx-[-10px]" />
        <div className="flex items-center">
          {hideTransition(
            (style, item) =>
              !item && (
                <animated.div className="flex-auto">
                  <p className="text-[#363442] text-[13px] font-bold leading-[10px]">
                    Darrell Steward
                  </p>
                  <span className="text-[11px] font-medium text-[#BDC4CC]">Manager</span>
                </animated.div>
              ),
          )}
          <button className={expanded ? 'm-auto' : ''}>
            <FiMoreHorizontal className="w-6 h-6 text-gray" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
