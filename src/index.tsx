import { registerRootComponent } from 'expo';
import React from 'react';
import Routes from './routes';

function App() {
    return <Routes />;
}

export default registerRootComponent(App);
