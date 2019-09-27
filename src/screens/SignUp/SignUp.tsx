import React, { useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import { NavigationScreenProps, StackActions } from 'react-navigation';
import { Formik } from 'formik';
import { Ionicons, Entypo, Octicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import api from '../../services/api';
import { Button } from '../../shared/Button';
import { TextInput } from '../../shared/TextInput';
import { HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { Flex } from '../../shared/Flex';
import { useAuth } from '../../store/ducks/auth/hooks';
import { useError } from '../../store/ducks/error/hooks';

SignUp.navigationOptions = {
    title: 'Sign Up',
};

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Invalid password, minimum length: 6')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirm is required'),
});

function SignUp(props: NavigationScreenProps) {
    const { auth, authSignUpRequest } = useAuth();
    const { error } = useError();

    useEffect(() => {
        if (auth.user) {
            onSignUpSuccess();
        }
    }, [auth]);

    /**
     * Called after successful register
     *
     */
    async function onSignUpSuccess() {
        props.navigation.navigate('App');
    }

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
        props.navigation.navigate('SignIn');
    }

    return (
        <Formik
            validationSchema={SignUpSchema}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={values => {
                authSignUpRequest({
                    email: values.email,
                    password: values.password,
                });
            }}
        >
            {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
                <Flex flex={1} alignItems="center" padding={3} mt={2}>
                    <Octicons name="globe" size={85} color="#6200ee" />

                    {/* Email Input */}
                    <TextInput
                        label="email"
                        error={
                            errors.email || error.requestError ? true : false
                        }
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        autoCompleteType="off"
                        autoCorrect={false}
                        autoFocus
                        fullWidth
                        mt={4}
                    />
                    {errors.email && (
                        <HelperText
                            type="error"
                            visible={errors.email ? true : false}
                        >
                            {errors.email}
                        </HelperText>
                    )}

                    {/* Passwrod Input */}
                    <TextInput
                        label="password"
                        error={
                            errors.password || error.requestError ? true : false
                        }
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                        fullWidth
                        mt={3}
                        mb={1}
                    />
                    {errors.password && (
                        <HelperText
                            type="error"
                            visible={errors.password ? true : false}
                        >
                            {errors.password}
                        </HelperText>
                    )}

                    {/* Confirm Passwrod Input */}
                    <TextInput
                        label="confirm password"
                        error={
                            errors.confirmPassword || error.requestError
                                ? true
                                : false
                        }
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry
                        fullWidth
                        mt={3}
                        mb={1}
                    />
                    {errors.confirmPassword && (
                        <HelperText
                            type="error"
                            visible={errors.confirmPassword ? true : false}
                        >
                            {errors.confirmPassword}
                        </HelperText>
                    )}

                    {/* Create Account Button */}
                    <Button
                        mode="contained"
                        onPress={handleSubmit as any}
                        disabled={auth.loading}
                        loading={auth.loading}
                        mt={4}
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
                                onPress={() => {}}
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
