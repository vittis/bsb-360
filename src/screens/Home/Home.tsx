import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';
import { Button } from '../../shared/Button';

function Home(props: NavigationScreenProps) {
    return (
        <Container>
            <Text>Home Screen</Text>
            <Button
                mode="contained"
                onPress={() => {
                    console.log('Logout');
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
