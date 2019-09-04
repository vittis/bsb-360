import axios from 'axios';
import { setError } from '../store/ducks/error/actions';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3030/api',
});

const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;

export const setupInterceptors = store => {
    const { dispatch } = store;

    api.interceptors.response.use(
        response => response,
        error => {
            console.log('errowww');
            const { status } = error.response;
            if (status === UNAUTHORIZED) {
                console.log('UNAUTHORIZED');
                //dispatch(userSignOut());
            } else if (status === BAD_REQUEST) {
                console.log('BAD_REQUEST');
                dispatch(setError());
            }
            return Promise.reject(error);
        }
    );
};

export default api;
