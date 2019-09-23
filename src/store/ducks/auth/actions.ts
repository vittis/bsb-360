import { action } from 'typesafe-actions';
import { AuthTypes, AuthRO, AuthDTO } from './types';

export const authRequest = (payload: AuthDTO) =>
    action(AuthTypes.AUTH_REQUEST, payload);

export const authSuccess = (response: AuthRO) =>
    action(AuthTypes.AUTH_SUCCCESS, {
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
    });

export const authFailure = () => action(AuthTypes.AUTH_FAILURE);

export const authSignOut = () => action(AuthTypes.SIGN_OUT);
