import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { loadToken } from '../../actions/authActions';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

function AuthLoading(props: NavigationScreenProps) {
    const [calledLoadToken, setCalledLoadToken] = useState(false);

    useEffect(() => {
        console.log(props.auth);
        if (!calledLoadToken) {
            console.log('chama vai');
            props.loadToken();
            setCalledLoadToken(true);
        }
        if (!props.auth.isLoading && calledLoadToken) {
            console.log('check for token', props.auth.token);
            if (props.auth.token !== null) {
                props.navigation.navigate('App');
            } else {
                props.navigation.navigate('Auth');
            }
        }

        const checkAuth = async () => {
            try {
                //@todo: DEV TESTING ONLY, REMOVE IN PROD
                //await AsyncStorage.clear();
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
        //checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.auth.isLoading]);

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

const mapStateToProps = (state: { auth: any }) => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { loadToken }
)(AuthLoading);
