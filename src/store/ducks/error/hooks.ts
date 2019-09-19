import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../..';
import { setError as _setError, clearErrors as _clearErrors } from './actions';

export const useError = () => {
    const dispatch = useDispatch();
    const error = useSelector((state: ApplicationState) => state.error);
    const setError = () => dispatch(_setError());
    const clearErrors = () => dispatch(_clearErrors());

    return { error, setError, clearErrors };
};
