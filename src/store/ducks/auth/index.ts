import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthTypes.AUTH_REQUEST:
            return { ...state, error: false, loading: true };
        case AuthTypes.AUTH_SUCCCES:
            return {
                ...state,
                loading: false,
                error: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case AuthTypes.AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export default reducer;
