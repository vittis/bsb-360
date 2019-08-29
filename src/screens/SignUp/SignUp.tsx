import React from 'react';
import * as Google from 'expo-google-app-auth';
import { NavigationScreenProps, StackActions } from 'react-navigation';
import { Formik } from 'formik';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import api from '../../api/api';
import { Button } from '../../shared/Button';
import { TextInput } from '../../shared/TextInput';
import { Flex } from '../../shared/Flex';

SignUp.navigationOptions = {
    title: 'Sign Up',
};

function SignUp(props: NavigationScreenProps) {
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

    function handleSignIn() {
        const replaceAction = StackActions.replace({
            routeName: 'SignIn',
        });
        props.navigation.dispatch(replaceAction);
    }

    return (
        <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            onSubmit={values => console.log(values)}
        >
            {formikProps => (
                <Flex flex={1} alignItems="center" padding={3} mt={2}>
                    <Entypo name="paper-plane" size={80} color="#6200ee" />

                    {/* Username Input */}
                    <TextInput
                        label="username"
                        onChangeText={formikProps.handleChange('username')}
                        onBlur={formikProps.handleBlur('username')}
                        value={formikProps.values.username}
                        autoCompleteType="username"
                        fullWidth
                        mb={3}
                    />

                    {/* Password Input */}
                    <TextInput
                        label="password"
                        onChangeText={formikProps.handleChange('password')}
                        onBlur={formikProps.handleBlur('password')}
                        value={formikProps.values.password}
                        secureTextEntry
                        fullWidth
                        mb={3}
                    />

                    {/* Confirm Password Input */}
                    <TextInput
                        label="confirm password"
                        onChangeText={formikProps.handleChange(
                            'confirmPassword'
                        )}
                        onBlur={formikProps.handleBlur('confirmPassword')}
                        value={formikProps.values.confirmPassword}
                        secureTextEntry
                        fullWidth
                        mb={4}
                    />

                    {/* Create Account Button */}
                    <Button
                        mode="contained"
                        onPress={formikProps.handleSubmit as any}
                        mb={3}
                        width={1}
                    >
                        Create Account
                    </Button>

                    {/* Sigin in Button */}
                    <Button
                        mode="outlined"
                        onPress={handleSignIn}
                        mb={3}
                        width={1}
                    >
                        Sign In
                    </Button>

                    {/* Social Buttons */}
                    <Flex flex={1} justifyContent="flex-end">
                        <Flex flexDirection="row">
                            <Button
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
                            </Button>
                            <Flex mx={2} />
                            <Button
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
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Formik>
    );
}

export default SignUp;
