import React, { useEffect } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useAuth } from '../../store/ducks/auth/hooks';

function AuthLoading(props: NavigationScreenProps) {
    const { auth } = useAuth();

    useEffect(() => {
        if (auth.isAuthenticated) {
            props.navigation.navigate('App');
        } else {
            props.navigation.navigate('Auth');
        }
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

export default AuthLoading;
