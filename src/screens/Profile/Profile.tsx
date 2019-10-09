import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';
import { Button } from '../../shared/Button';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Profile(props: NavigationScreenProps) {
    return (
        <Container>
            <Text>Profile Screen</Text>
            <Button mode="contained" onPress={() => {}}>
                Logout
            </Button>
            <Button mode="contained" onPress={() => {}}>
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

export default Profile;
