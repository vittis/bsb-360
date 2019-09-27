import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../..';
import {
    authSignInRequest as _authSignInRequest,
    authSignUpRequest as _authSignUpRequest,
    authSignOut as _authSignOut,
} from './actions';
import { AuthSignInDTO } from './types';

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: ApplicationState) => state.auth);

    const authSignInRequest = (payload: AuthSignInDTO) =>
        dispatch(_authSignInRequest(payload));

    const authSignUpRequest = (payload: AuthSignInDTO) =>
        dispatch(_authSignUpRequest(payload));

    const authSignOut = () => dispatch(_authSignOut());

    return { auth, authSignInRequest, authSignUpRequest, authSignOut };
};
