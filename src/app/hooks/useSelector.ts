import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { TypeRootState } from '../redux/store';

// Для типизации useSelector
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector;