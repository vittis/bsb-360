import React, { useState, useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import { NavigationScreenProps, StackActions } from 'react-navigation';
import { Formik } from 'formik';
import { Ionicons, Entypo, Octicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { Snackbar, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Button } from '../../shared/Button';
import { TextInput } from '../../shared/TextInput';
import { Flex } from '../../shared/Flex';
import { authRequest } from '../../store/ducks/auth/actions';
import { ApplicationState } from '../../store';
import { AuthState } from '../../store/ducks/auth/types';

SignIn.navigationOptions = {
    title: 'Sign In',
};

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Invalid password, minimum length: 6')
        .required('Password is required'),
});

interface StateProps {
    auth: AuthState;
}

interface DispatchProps {
    authRequest: typeof authRequest;
}

type Props = StateProps & DispatchProps & NavigationScreenProps;

function SignIn(props: Props) {
    const [showPlaneIcon, setShowPlaneIcon] = useState(false);

    useEffect(() => {
        if (props.auth.user) {
            onSignInSuccess();
        }
    }, [props.auth]);

    /**
     * Called after successful login
     *
     */
    async function onSignInSuccess() {
        props.navigation.navigate('App');
    }

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
            initialValues={{ email: '', password: '' }}
            onSubmit={async values => {
                props.authRequest(values);
            }}
        >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                status,
                setStatus,
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
                        label="email"
                        error={errors.email || props.auth.error ? true : false}
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
                            errors.password || props.auth.error ? true : false
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

                    {/* Sigin in Button */}
                    <Button
                        mode="contained"
                        onPress={handleSubmit as any}
                        disabled={props.auth.loading}
                        loading={props.auth.loading}
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

                    {/* TODO: move to global error logic */}
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

const mapStateToProps = (state: ApplicationState) => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { authRequest }
)(SignIn);
