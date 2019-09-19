import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';
import { Button } from '../../shared/Button';
import { useAuth } from '../../store/ducks/auth/hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Home(props: NavigationScreenProps) {
    const { authSignOut } = useAuth();
    return (
        <Container>
            <Text>Home Screen</Text>
            <Button
                mode="contained"
                onPress={() => {
                    authSignOut();
                }}
            >
                Logout
            </Button>
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

export default Home;
