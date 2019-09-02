import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './routes';

function App() {
    return (
        <PaperProvider>
            <Routes />
        </PaperProvider>
    );
}

export default registerRootComponent(App);
