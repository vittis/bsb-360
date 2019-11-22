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
import AuthLoading from '../screens/AuthLoading';
import styled from 'styled-components/native';
import {
    Octicons,
    Ionicons,
    Foundation,
    FontAwesome,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import withAuthRoute from './withAuthRoute';
import Profile from '../screens/Profile';
import { Flex } from '../shared/Flex';
import { Badge, ProgressBar } from 'react-native-paper';
import { Button } from '../shared/Button';
import { StyleSheet } from 'react-native';

const LogoText = styled.Text`
    margin-left: 10px;
    font-size: 18px;
    font-style: italic;
    font-weight: bold;
`;

const Text = styled.Text`
    font-weight: bold;
    margin-left: 2px;
    margin-right: 2px;
`;

const styles = StyleSheet.create({
    bar: {
        margin: 0,
        padding: 0,
    },
});

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
const HomeStack = createStackNavigator(
    {
        ...createAuthRoutes([Home]),
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    <Flex flexDirection="row" pl={3}>
                        <Octicons name="globe" size={25} color="#5b1ab8" />
                        <LogoText>BSB 360º</LogoText>
                    </Flex>
                ),
                headerRight: (
                    <Flex flexDirection="row" pr={2} alignItems="center">
                        <Flex mx={1} flex={1} flexDirection="row">
                            <MaterialCommunityIcons
                                size={18}
                                color="#6200ee"
                                name="star-circle"
                            />
                            <Text>Nível 1</Text>
                        </Flex>
                        <ProgressBar
                            style={styles.bar}
                            progress={0.5}
                            color="#5b1ab8"
                        />

                        <Button
                            ml={1}
                            compact
                            onPress={() => {
                                navigation.navigate('Perfil');
                            }}
                        >
                            <FontAwesome
                                name="user-circle"
                                size={25}
                                color="#4a119c"
                            />
                        </Button>
                    </Flex>
                ),
                headerStyle: {
                    backgroundColor: '#F5F5F5',
                },
            };
        },
    }
);
HomeStack.navigationOptions = {
    tabBarLabel: 'Início',
};

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
        Perfil: Profile,
        HomeStack,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;

                if (routeName === 'HomeStack') {
                    iconName = 'md-map';
                } else if (routeName === 'Perfil') {
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
