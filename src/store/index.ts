import { createStore, applyMiddleware, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

import { AuthState } from './ducks/auth/types';
import { ErrorState } from './ducks/error/types';
import { setupInterceptors } from '../services/api';

export interface ApplicationState {
    auth: AuthState;
    error: ErrorState;
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['error'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

let persistor = persistStore(store);

setupInterceptors(store);

export { store, persistor };
