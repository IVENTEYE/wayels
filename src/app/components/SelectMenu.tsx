import React from 'react'
import Select from 'react-select'
import { useTypedSelector } from '../hooks/useSelector'
import { TypeRootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { setSort } from '../redux/slices/shipmentsSlice'

const SelectMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { sortBy } = useTypedSelector((state: TypeRootState) => state.shipments);
  const options = [
    { value: 'capacity', label: 'Capacity' },
    { value: 'date', label: 'Date' },
  ]

  return (
    <div className='bg-white rounded-lg relative px-4 px-2'>
      <div className='flex items-center'>
        <p className='text-gray font-medium'>Sort by:</p>
        <Select 
          onChange={(value) => dispatch(setSort(value))}
          styles={{
            placeholder: () => ({
              display: 'none'
            }),
            indicatorSeparator: () => ({
              display: 'none'
            }),
            indicatorsContainer: (base, props) => ({
              "div": {
                padding: 0,
              }
            }),
            valueContainer: (base) => ({
              ...base,
              paddingRight: 3,
            }),
            menu: (base) => ({
              ...base,
              position: 'absolute',
              top: 30,
              left: 0,
              width: '100%',
            }),
            singleValue: (base) => ({
              ...base,
              color: "#232137",
              fontWeight: 500,
            }),
            container: (base) => ({
              ...base,
              position: 'static'
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
              minHeight: 30,
              borderRadius: '8px',
              outline: 'none'
            })
          }} 
          options={options}
          defaultValue={options.filter(item => item.value === sortBy)}
          isSearchable={false}
          
        />
      </div>
    </div>
  )
}

export default SelectMenu