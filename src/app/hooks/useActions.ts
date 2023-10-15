import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useMemo } from 'react';
import { shipmentsSlice } from '../redux/slices/shipmentsSlice'
import sidebarSlice from '../redux/slices/sidebarSlice';

const AllActions = {
    ...shipmentsSlice.actions,
    ...sidebarSlice.actions
}

const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(AllActions, dispatch), [dispatch])
}

export default useActions;