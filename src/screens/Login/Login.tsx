import React from 'react';
import * as Google from 'expo-google-app-auth';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { View } from 'react-native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 16px;
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: 16px;
`;

const SocialButton = styled(Button)`
    margin-left: 8px;
    margin-right: 8px;
`;

const StyledInput = styled(TextInput)`
    width: 100%;
    margin-bottom: 24px;
`;

function Login(props: NavigationScreenProps) {
    async function handleSignInWithGoogle() {
        try {
            //@ts-ignore
            const result = await Google.logInAsync({
                androidClientId:
                    '141851029982-rosb315en7f9lir3svflbpoibndcd91s.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            //@ts-check

            console.log(result);

            if (result.type === 'success') {
                console.log('access token ', result.accessToken);
            } else {
                console.log('failed');
            }
        } catch (e) {
            console.log('error', e);
        }
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}
        >
            {formikProps => (
                <Container>
                    <Entypo
                        name="paper-plane"
                        size={80}
                        color="#6200ee"
                        style={{ marginBottom: 32, marginTop: 8 }}
                    />
                    <StyledInput
                        label="email"
                        onChangeText={formikProps.handleChange('email')}
                        onBlur={formikProps.handleBlur('email')}
                        value={formikProps.values.email}
                    />
                    <StyledInput
                        label="password"
                        onChangeText={formikProps.handleChange('password')}
                        onBlur={formikProps.handleBlur('password')}
                        value={formikProps.values.password}
                    />

                    <StyledButton
                        mode="contained"
                        onPress={formikProps.handleSubmit as any}
                    >
                        Sign In
                    </StyledButton>
                    <StyledButton mode="outlined" onPress={() => {}}>
                        Create Account
                    </StyledButton>
                    <StyledButton onPress={() => {}} uppercase={false}>
                        Forgot your password?
                    </StyledButton>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <SocialButton
                                uppercase={false}
                                icon={() => (
                                    <Ionicons
                                        size={20}
                                        name="logo-google"
                                        color="#6200ee"
                                    />
                                )}
                                mode="outlined"
                                onPress={handleSignInWithGoogle}
                            >
                                Google
                            </SocialButton>
                            <SocialButton
                                uppercase={false}
                                icon={() => (
                                    <Ionicons
                                        size={20}
                                        name="logo-facebook"
                                        color="#6200ee"
                                    />
                                )}
                                mode="outlined"
                                onPress={handleSignInWithGoogle}
                            >
                                Facebook
                            </SocialButton>
                        </View>
                    </View>
                </Container>
            )}
        </Formik>
    );
}
/*  */
export default Login;
