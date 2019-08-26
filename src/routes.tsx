import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
} from 'react-navigation';
import Home from './screens/Home';
import Login from './screens/Login';
import AuthLoading from './screens/AuthLoading';
import logo from './assets/instagram.png';
import styled from 'styled-components/native';

const Logo = styled.Image`
    margin-top: 10px;
`;

const AppStack = createStackNavigator(
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
);

const AuthStack = createStackNavigator(
    {
        Login,
    },
    {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            title: 'Sign in',
            headerStyle: {
                backgroundColor: '#F5F5F5',
            },
        },
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoading,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);
