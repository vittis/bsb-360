import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthTypes.AUTH_SIGN_IN_REQUEST:
            return { ...state, error: false, loading: true };
        case AuthTypes.AUTH_SIGN_UP_REQUEST:
            return { ...state, error: false, loading: true };
        case AuthTypes.AUTH_SUCCCESS:
            return {
                user: action.payload.user,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
                loading: false,
                error: false,
            };
        case AuthTypes.AUTH_FAILURE:
            return {
                user: null,
                token: null,
                refreshToken: null,
                isAuthenticated: false,
                loading: false,
                error: true,
            };
        case AuthTypes.SIGN_OUT:
            return {
                user: null,
                token: null,
                refreshToken: null,
                isAuthenticated: false,
                loading: false,
                error: false,
            };
        default:
            return state;
    }
};

export default reducer;
