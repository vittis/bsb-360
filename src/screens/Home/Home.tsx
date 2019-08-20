import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';

function Home(props: NavigationScreenProps) {
    console.log(props);
    return (
        <Container>
            <Text>Home Screen</Text>
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    background-color: papayawhip;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
`;

const Text = styled.Text`
    font-size: 24px;
`;

export default Home;
