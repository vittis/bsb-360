import React, { useEffect } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { useAuth } from '../store/ducks/auth/hooks';

const withAuthRoute = WrappedScreen => (props: NavigationScreenProps) => {
    const { auth } = useAuth();

    useEffect(() => {
        if (auth.isAuthenticated) {
            props.navigation.navigate('Auth');
        }
    }, [auth.isAuthenticated]);

    return <WrappedScreen {...props} />;
};

export default withAuthRoute;
