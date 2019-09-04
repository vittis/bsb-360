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
    const { error, clearError } = useError();
    return (
        <Snackbar
            visible={error.hasError}
            onDismiss={() => {
                clearError();
            }}
            action={{
                label: 'hide',
                onPress: () => {
                    clearError();
                },
            }}
        >
            Something went wrong...
        </Snackbar>
    );
};

export default registerRootComponent(App);
