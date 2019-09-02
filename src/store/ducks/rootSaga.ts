import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from './auth/types';
import { signIn } from './auth/sagas';

export default function* rootSaga() {
    return yield all([takeLatest(AuthTypes.AUTH_REQUEST, signIn)]);
}
