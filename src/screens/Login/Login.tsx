import React from 'react';
import * as Google from 'expo-google-app-auth';
import { NavigationScreenProps } from 'react-navigation';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { Flex, StyledInput, StyledButton, SocialButton, Logo } from './styles';

function Login(props: NavigationScreenProps) {
    /**
     * Handler Google Sign In button
     */
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
                <Flex flex={1} alignItems="center" padding={3}>
                    <Logo
                        name="paper-plane"
                        size={80}
                        color="#6200ee"
                        mb={4}
                        mt={2}
                    />
                    <StyledInput
                        label="email"
                        onChangeText={formikProps.handleChange('email')}
                        onBlur={formikProps.handleBlur('email')}
                        value={formikProps.values.email}
                        mb={3}
                    />
                    <StyledInput
                        label="password"
                        onChangeText={formikProps.handleChange('password')}
                        onBlur={formikProps.handleBlur('password')}
                        value={formikProps.values.password}
                        mb={4}
                    />

                    <StyledButton
                        mode="contained"
                        onPress={formikProps.handleSubmit as any}
                        mb={3}
                    >
                        Sign In
                    </StyledButton>
                    <StyledButton mode="outlined" onPress={() => {}} mb={3}>
                        Create Account
                    </StyledButton>
                    <StyledButton onPress={() => {}} uppercase={false}>
                        Forgot your password?
                    </StyledButton>
                    <Flex flex={1} justifyContent="flex-end">
                        <Flex flexDirection="row">
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
                                mr={2}
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
                                ml={2}
                            >
                                Facebook
                            </SocialButton>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Formik>
    );
}
/*  */
export default Login;
