import React, { useEffect } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

function AuthLoading(props: NavigationScreenProps) {
    useEffect(() => {
        const checkAuth = async () => {
            try {
                //@todo: DEV TESTING ONLY, REMOVE IN PROD
                await AsyncStorage.clear();
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    props.navigation.navigate('App');
                } else {
                    props.navigation.navigate('Auth');
                }
            } catch (error) {
                props.navigation.navigate('Auth');
            }
        };

        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <ActivityIndicator size="large" />
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text`
    font-size: 24px;
`;

export default AuthLoading;
