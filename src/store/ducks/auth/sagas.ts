import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import api from '../../../services/api';
import { AxiosResponse } from 'axios';
import { AuthRO } from './types';
import {
    authSuccess,
    authFailure,
    authSignInRequest,
    authSignOut,
    authSignUpRequest,
} from './actions';

// @todo: for dev testing purposes
const delay = ms => new Promise(res => setTimeout(res, ms));

export function* signIn(action: ReturnType<typeof authSignInRequest>) {
    try {
        /* const response: AxiosResponse<AuthRO> = yield call(
            api.post,
            '/login',
            action.payload
        );
        yield call(AsyncStorage.setItem, 'token', response.data.token);
        yield call(AsyncStorage.setItem, 'refreshToken', response.data.token); 
        yield put(authSuccess(response.data)); */
        const response: { data: AuthRO } = {
            data: {
                refreshToken: 'aaa',
                token: 'aaa',
                user: {
                    email: 'vitu@email.com',
                },
            },
        };
        // @todo: for dev testing purposes
        yield delay(3000);
        yield call(AsyncStorage.setItem, 'token', response.data.token);
        yield call(AsyncStorage.setItem, 'refreshToken', response.data.token);
        yield put(authSuccess(response.data));
    } catch (err) {
        console.log(err);
        yield put(authFailure());
    }
}

export function* signUp(action: ReturnType<typeof authSignUpRequest>) {
    try {
        const response: AxiosResponse<AuthRO> = yield call(
            api.post,
            '/register',
            action.payload
        );
        yield call(AsyncStorage.setItem, 'token', response.data.token);
        yield call(AsyncStorage.setItem, 'refreshToken', response.data.token);

        yield put(authSuccess(response.data));
        // @todo: for dev testing purposes
        /* yield delay(3000);
        yield call(AsyncStorage.setItem, 'token', 'sampletoken');
        yield put(
            authSuccess({
                user: { email: action.payload.email },
                token: 'sampletoken',
            })
        ); */
    } catch (err) {
        console.log(err);
        yield put(authFailure());
    }
}

export function* signOut(_action: ReturnType<typeof authSignOut>) {
    yield call(AsyncStorage.removeItem, 'token');
    yield call(AsyncStorage.removeItem, 'refreshToken');
}
