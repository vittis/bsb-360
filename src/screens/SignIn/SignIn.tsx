import React, { useState } from 'react';
import * as Google from 'expo-google-app-auth';
import { NavigationScreenProps, StackActions } from 'react-navigation';
import { Formik } from 'formik';
import { Ionicons, Entypo, Octicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import api from '../../services/api';
import { Snackbar, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { Button } from '../../shared/Button';
import { TextInput } from '../../shared/TextInput';
import { Flex } from '../../shared/Flex';

SignIn.navigationOptions = {
    title: 'Sign In',
};

const SignInSchema = Yup.object().shape({
    username: Yup.string().required('Username is required!'),
    password: Yup.string()
        .min(6, 'Invalid password, minimum length: 6')
        .required('Password is required!'),
});

function SignIn(props: NavigationScreenProps) {
    const [showPlaneIcon, setShowPlaneIcon] = useState(false);

    /**
     * Handler onPress Google Sign In button
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

    /**
     * Called after successful login
     *
     * @param token
     */
    async function onSignInSuccess(token: string) {
        try {
            await AsyncStorage.setItem('token', token);
            props.navigation.navigate('App');
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Handler onPress de Create Account Button
     *
     * @param token
     */
    function handleCreateAccount() {
        const replaceAction = StackActions.replace({
            routeName: 'SignUp',
        });
        props.navigation.dispatch(replaceAction);
    }

    return (
        <Formik
            validationSchema={SignInSchema}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ username: '', password: '' }}
            onSubmit={async (
                values,
                { setSubmitting, resetForm, setStatus }
            ) => {
                try {
                    setSubmitting(true);
                    //const response = await api.post('/login', values);
                    const delay = ms => new Promise(res => setTimeout(res, ms));
                    await delay(3500);
                    await onSignInSuccess('opa');
                    //await onSignInSuccess(response.data.token);
                } catch (err) {
                    resetForm();
                    setStatus({ error: true });
                    console.log('submit catch', err.response.status);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                status,
                setStatus,
                isSubmitting,
                errors,
            }) => (
                <Flex flex={1} alignItems="center" padding={3} mt={2}>
                    {showPlaneIcon && (
                        <Entypo name="paper-plane" size={83} color="#6200ee" />
                    )}
                    {!showPlaneIcon && (
                        <Octicons name="globe" size={85} color="#6200ee" />
                    )}

                    {/* Username Input */}
                    <TextInput
                        label="username"
                        error={errors.username ? true : false}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        autoCompleteType="username"
                        fullWidth
                        mt={4}
                    />
                    {errors.username && (
                        <HelperText
                            type="error"
                            visible={errors.username ? true : false}
                        >
                            {errors.username}
                        </HelperText>
                    )}

                    {/* Passwrod Input */}
                    <TextInput
                        label="password"
                        error={errors.password ? true : false}
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

                    {/* Sigin in Button */}
                    <Button
                        mode="contained"
                        onPress={handleSubmit as any}
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        mb={3}
                        mt={4}
                        width={1}
                    >
                        Sign In
                    </Button>

                    {/* Create Account Button */}
                    <Button
                        mode="outlined"
                        onPress={handleCreateAccount}
                        width={1}
                        mb={3}
                    >
                        Create Account
                    </Button>

                    {/* Forgot your password Button */}
                    <Button onPress={() => {}} uppercase={false}>
                        Forgot your password?
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
                                onPress={() => setShowPlaneIcon(!showPlaneIcon)}
                            >
                                Facebook
                            </Button>
                        </Flex>
                    </Flex>

                    <Snackbar
                        visible={status ? true : false}
                        onDismiss={() => {
                            setStatus(null);
                        }}
                        action={{
                            label: 'hide',
                            onPress: () => {
                                setStatus(null);
                            },
                        }}
                    >
                        An error has ocurred...
                    </Snackbar>
                </Flex>
            )}
        </Formik>
    );
}

export default SignIn;
