import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './screens/Home';
import logo from './assets/instagram.png';
import styled from 'styled-components/native';

const Logo = styled.Image`
    margin-top: 10px;
`;

const Routes = createAppContainer(
    createStackNavigator(
        {
            Home,
        },
        {
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
                headerTitle: <Logo source={logo} />,
                headerStyle: {
                    backgroundColor: '#F5F5F5',
                },
            },
        }
    )
);

export default Routes;
