import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './routes';
import store from './store';

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
