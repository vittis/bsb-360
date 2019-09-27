import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from './auth/types';
import { signIn, signUp, signOut } from './auth/sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.AUTH_SIGN_IN_REQUEST, signIn),
        takeLatest(AuthTypes.AUTH_SIGN_UP_REQUEST, signUp),
        takeLatest(AuthTypes.SIGN_OUT, signOut),
    ]);
}
