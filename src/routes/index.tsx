import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
} from 'react-navigation';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { Platform } from 'react-native';
import AuthLoading from '../screens/AuthLoading';
import styled from 'styled-components/native';
import { Octicons, Ionicons, Foundation } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import withAuthRoute from './withAuthRoute';
import Profile from '../screens/Profile';

const LogoText = styled.Text`
    margin-left: 10px;
    font-size: 18px;
    font-style: italic;
`;

/**
 * Wrap screens with withAuthRoute HOC
 * and serialize it to navigator format
 *
 * @param screens
 */
const createAuthRoutes = (screens: any[]) => {
    const obj = {};
    screens.forEach(screen => {
        obj[screen.name] = withAuthRoute(screen);
        obj[screen.name].navigationOptions = screen.navigationOptions;
    });
    return obj;
};

/**
 * Main App Stack
 */
const AppStack = createStackNavigator(
    {
        ...createAuthRoutes([Home]),
    },
    {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitle: (
                <>
                    <Octicons name="globe" size={25} color="#5b1ab8" />
                    <LogoText>BSB 360º</LogoText>
                </>
            ),
            headerStyle: {
                backgroundColor: '#F5F5F5',
            },
        },
    }
);
/* AppStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
}; */

/**
 * Auth Stack
 */
const AuthStack = createStackNavigator(
    {
        SignIn,
        SignUp,
    },
    {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#F5F5F5',
            },
        },
    }
);

function TabBarIcon(props) {
    return (
        <Ionicons
            name={props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={props.focused ? '#fff' : '#ccc'}
        />
    );
}

const tabNavigator = createMaterialBottomTabNavigator(
    {
        Home: AppStack,
        Profile,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'md-map';
                } else if (routeName === 'Profile') {
                    iconName = `ios-person`;
                }

                return (
                    <TabBarIcon
                        focused={focused}
                        name={iconName}
                        size={25}
                        color={tintColor}
                    />
                );
            },
        }),
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoading,
            App: tabNavigator,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);
