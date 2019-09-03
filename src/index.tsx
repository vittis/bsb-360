import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './routes';
import { store, persistor } from './store';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <Routes />
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
}

export default registerRootComponent(App);
