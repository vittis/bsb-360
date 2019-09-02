import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';
import { useAuth } from '../store/ducks/auth/hooks';
import { ActivityIndicator } from 'react-native-paper';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const withAuthRoute = WrappedScreen => (props: NavigationScreenProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        setIsMounted(true);
        if (!auth.isAuthenticated && isMounted) {
            props.navigation.navigate('Auth');
        }
    }, [auth, isMounted]);

    if (!isMounted && !auth.isAuthenticated) {
        return (
            <Container>
                <ActivityIndicator size="large" />
            </Container>
        );
    }

    return (
        <>
            <Text>opa</Text>
            <WrappedScreen {...props} />
        </>
    );
};

export default withAuthRoute;
