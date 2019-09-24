import axios from 'axios';
import set from 'lodash/set';
import get from 'lodash/get';
import { Store } from 'redux';
import { setError } from '../store/ducks/error/actions';
import { authSignOut, authSuccess } from '../store/ducks/auth/actions';
import { ApplicationState } from '../store';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3030/api',
    headers: { Pragma: 'no-cache', 'cache-control': 'no-cache' },
});

const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;

export const setupInterceptors = (store: Store<ApplicationState>) => {
    const { dispatch, getState } = store;

    /* Refresh auth logic */
    api.interceptors.response.use(
        response => {
            const newToken = get(response, 'headers.x-token', null);
            const newRefreshToken = get(
                response,
                'headers.x-refresh-token',
                null
            );
            if (newToken && newRefreshToken) {
                const { auth } = getState();
                dispatch(
                    authSuccess({
                        user: auth.user,
                        token: newToken,
                        refreshToken: newRefreshToken,
                    })
                );
            }
            return response;
        },
        error => {
            const { status } = error.response;
            if (status === UNAUTHORIZED) {
                console.log('UNAUTHORIZED');
                dispatch(authSignOut());
            } else if (status === BAD_REQUEST) {
                console.log('BAD_REQUEST');
                dispatch(setError());
            }
            return Promise.reject(error);
        }
    );

    /* Add Bearer token to every request, if available */
    api.interceptors.request.use(config => {
        const { auth } = getState();
        if (!auth.token || !auth.refreshToken) {
            return config;
        }
        set(config, 'headers.Authorization', `Bearer ${auth.token}`);
        set(config, 'headers.x-refresh-token', auth.refreshToken);

        return config;
    });
};

export default api;
