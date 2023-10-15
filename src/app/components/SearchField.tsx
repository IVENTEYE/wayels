import React, { useEffect, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { FiSearch } from 'react-icons/fi';
import { useTypedSelector } from '../hooks/useSelector';
import { TypeRootState } from '../redux/store';

const SearchField: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  const { renderItems, activeTruckId } = useTypedSelector(
    (state: TypeRootState) => state.shipments,
  );
  const [searchVisible, setSearchVisible] = useState(true);

  const searchTransitions = useTransition(searchVisible, {
    config: { duration: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    if (activeTruckId !== '') {
      setSearchVisible(false);
    }
  }, [activeTruckId]);
  return (
    <>
      {/* {searchTransitions(
        (style) =>
          searchVisible && (
            <animated.div style={style} className="relative text-[#A5A5AD] z-10 w-full">
              <FiSearch className="absolute top-[50%] translate-y-[-50%] left-5 w-[19px] h-[19px]" />
              <input
                placeholder={placeholder}
                className="bg-white py-4 pr-5 pl-12 font-medium outline-none w-full max-w-7xl rounded-lg"
                type="text"
              />
            </animated.div>
          ),
      )} */}
      <div className="relative text-[#A5A5AD] z-10 w-full">
        <FiSearch className="absolute top-[50%] translate-y-[-50%] left-5 w-[19px] h-[19px]" />
        <input
          placeholder={placeholder}
          className="bg-white py-4 pr-5 pl-12 font-medium outline-none w-full max-w-7xl rounded-lg"
          type="text"
        />
      </div>
    </>
  );
};

export default SearchField;
