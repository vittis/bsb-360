import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';
import { Button } from '../../shared/Button';
import { useAuth } from '../../store/ducks/auth/hooks';
import api from '../../services/api';

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
            <Button
                mode="contained"
                onPress={async () => {
                    try {
                        const resp = await api.get('/me');
                        console.log(resp.headers);
                    } catch (err) {
                        console.log(err);
                    }
                }}
            >
                Me
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
