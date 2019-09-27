import { action } from 'typesafe-actions';
import { AuthTypes, AuthRO, AuthSignInDTO, AuthSignUpDTO } from './types';

export const authSignInRequest = (payload: AuthSignInDTO) =>
    action(AuthTypes.AUTH_SIGN_IN_REQUEST, payload);

export const authSignUpRequest = (payload: AuthSignUpDTO) =>
    action(AuthTypes.AUTH_SIGN_UP_REQUEST, payload);

export const authSuccess = (response: AuthRO) =>
    action(AuthTypes.AUTH_SUCCCESS, {
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
    });

export const authFailure = () => action(AuthTypes.AUTH_FAILURE);

export const authSignOut = () => action(AuthTypes.SIGN_OUT);
