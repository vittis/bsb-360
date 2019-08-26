import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';

function Login(props: NavigationScreenProps) {
    console.log(props);
    return (
        <Container>
            <Text>Login Screen</Text>
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

export default Login;
