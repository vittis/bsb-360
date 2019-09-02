import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../..';
import { authRequest as _authRequest } from './actions';
import { AuthDTO } from './types';

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: ApplicationState) => state.auth);
    const authRequest = (payload: AuthDTO) => dispatch(_authRequest(payload));

    return { auth, authRequest };
};
