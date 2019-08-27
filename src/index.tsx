import { registerRootComponent } from 'expo';
import React from 'react';
import Routes from './routes';
import { Provider as PaperProvider } from 'react-native-paper';

function App() {
    return (
        <PaperProvider>
            <Routes />
        </PaperProvider>
    );
}

export default registerRootComponent(App);
