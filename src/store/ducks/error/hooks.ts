import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../..';
import { setError as _setError, clearError as _clearError } from './actions';

export const useError = () => {
    const dispatch = useDispatch();
    const error = useSelector((state: ApplicationState) => state.error);
    const setError = () => dispatch(_setError());
    const clearError = () => dispatch(_clearError());

    return { error, setError, clearError };
};
