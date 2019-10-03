import React, { useEffect, useState, useRef } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ActivityIndicator } from 'react-native-paper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Home() {
    const [location, setLocation] = useState(null);
    const [, setErrorMessage] = useState(null);

    useEffect(() => {
        _getLocationAsync();
    }, []);

    const mapView = useRef(null);

    const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    };
    console.log(location);
    return (
        <Container>
            {!location && <ActivityIndicator size="large" />}
            {location && (
                <MapView
                    ref={mapView}
                    showsUserLocation
                    region={{
                        /* latitude: this.props.location.coords.latitude,
                        longitude: this.props.location.coords.longitude, */
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ flex: 1, width: '100%' }}
                    rotateEnabled={false}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    showsBuildings={false}
                    showsPointsOfInterest={false}
                    /* onMapReady={() => {
                        mapView.current.animateCamera({
                            center: {
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            },
                        });
                    }} */
                />
            )}
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default Home;
