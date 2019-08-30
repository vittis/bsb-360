import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';

function App() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <Routes />
            </PaperProvider>
        </Provider>
    );
}

export default registerRootComponent(App);
