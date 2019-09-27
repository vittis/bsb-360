import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider, Snackbar } from 'react-native-paper';
import Routes from './routes';
import { store, persistor } from './store';
import { useError } from './store/ducks/error/hooks';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <Routes />
                    <Error />
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
}

const Error = () => {
    const { error, clearErrors } = useError();
    return (
        <Snackbar
            visible={error.requestError}
            onDismiss={() => {
                clearErrors();
            }}
            action={{
                label: 'hide',
                onPress: () => {
                    clearErrors();
                },
            }}
        >
            {error.message ? error.message : 'Something went wrong...'}
        </Snackbar>
    );
};

export default registerRootComponent(App);
