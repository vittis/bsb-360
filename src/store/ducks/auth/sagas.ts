import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import api from '../../../services/api';
import { AxiosResponse } from 'axios';
import { AuthRO } from './types';
import { authSuccess, authFailure, authRequest } from './actions';

export function* signIn(action: ReturnType<typeof authRequest>) {
    try {
        const response: AxiosResponse<AuthRO> = yield call(
            api.post,
            '/login',
            action.payload
        );
        yield call(AsyncStorage.setItem, 'token', response.data.token);

        yield put(authSuccess(response.data));
    } catch (err) {
        console.log(err);
        yield put(authFailure());
    }
}
