import React, { useEffect, useState, useRef } from 'react';
import { NavigationScreenProps, ScrollView } from 'react-navigation';
import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ActivityIndicator, Surface, FAB } from 'react-native-paper';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { Button } from '../../shared/Button';
import { Ionicons, Foundation } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

function Home() {
    const [location, setLocation] = useState(null);
    const [error, setErrorMessage] = useState(null);
    const [fabVisible, setFabVisible] = useState(true);

    const [places, setPlaces] = useState([
        {
            id: 1,
            title: 'Nova Nicolândia',
            description:
                'Parque de diversões asd asd asd sadasdas dishfpoiadshfpo uiashdfói hasd´0fh a´sdfh a´sdif hS colorido com montanhas-russas, carrossel e roda gigante, além de vendedores de alimentos.',
            latitude: -15.7961574,
            longitude: -47.9014396,
            mark: null,
        },
        {
            id: 2,
            title: 'Fonte da Torre',
            description: 'Fonte da torre de tv.',
            latitude: -15.7918274,
            longitude: -47.8916544,
            mark: null,
        },
        {
            id: 3,
            title: 'Esplanada dos Ministérios',
            description: 'Um dos maiores pontos turísticos de Brasília.',
            latitude: -15.7953534,
            longitude: -47.8906947,
            mark: null,
        },
        {
            id: 4,
            title: 'Palácio do Planalto',
            description:
                'Edifício com o gabinete presidencial em design moderno de Oscar Niemeyer da década de 60, com passeios.',
            latitude: -15.7927375,
            longitude: -47.8821088,
            mark: null,
        },
    ]);

    const mapView = useRef<MapView>(null);
    const slidingUpPanel = useRef<SlidingUpPanel>(null);
    const scrollView = useRef<ScrollView>(null);

    useEffect(() => {
        _getLocationAsync();
    }, []);

    const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    };
    /*  const _mapReady = () => {
        places[0].mark.showCallout();
    }; */
    return (
        <Container>
            {!location && <ActivityIndicator size="large" />}
            {location && (
                <>
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
                    >
                        {places.map((place, index) => (
                            <Marker
                                ref={mark => (place.mark = mark)}
                                title={place.title}
                                onPress={() => {
                                    slidingUpPanel.current.show();
                                    scrollView.current.scrollTo({
                                        x: width * index,
                                        y: 0,
                                        animated: true,
                                    });
                                }}
                                //description={place.description}
                                key={place.id}
                                coordinate={{
                                    latitude: place.latitude,
                                    longitude: place.longitude,
                                }}
                            />
                        ))}
                    </MapView>

                    <SlidingUpPanel
                        draggableRange={{ top: height / 2.6, bottom: 0 }}
                        //animatedValue={this._draggedValue}
                        showBackdrop={false}
                        ref={slidingUpPanel}
                        allowMomentum={true}
                        onMomentumDragEnd={value => {
                            if (value < 70) {
                                if (!fabVisible) setFabVisible(true);
                            } else {
                                if (fabVisible) setFabVisible(false);
                            }
                        }}
                        onDragEnd={value => {
                            if (value < 70) {
                                if (!fabVisible) setFabVisible(true);
                            } else {
                                if (fabVisible) setFabVisible(false);
                            }
                        }}
                    >
                        <ScrollView
                            ref={scrollView}
                            style={styles.placesContainer}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={e => {
                                const place =
                                    e.nativeEvent.contentOffset.x > 0
                                        ? e.nativeEvent.contentOffset.x /
                                          Dimensions.get('window').width
                                        : 0;
                                const { latitude, longitude, mark } = places[
                                    Math.round(place)
                                ];

                                mapView.current.animateCamera(
                                    {
                                        center: { latitude, longitude },
                                    },
                                    { duration: 500 }
                                );

                                setTimeout(() => {
                                    mark.showCallout();
                                }, 500);
                            }}
                        >
                            {places.map(place => (
                                <Surface key={place.id} style={styles.place}>
                                    <Text style={styles.title}>
                                        {place.title}
                                    </Text>
                                    <Text style={styles.description}>
                                        {place.description}
                                    </Text>
                                </Surface>
                            ))}
                        </ScrollView>
                    </SlidingUpPanel>
                    <FAB
                        style={styles.fab}
                        visible={fabVisible}
                        icon={({ color, size }) => (
                            <Container>
                                <Foundation
                                    size={size + 5}
                                    name="marker"
                                    color={color}
                                />
                            </Container>
                        )}
                        onPress={() => {
                            slidingUpPanel.current.show();
                            setFabVisible(false);
                        }}
                    />
                </>
            )}
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee',
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mapView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    placesContainer: {
        width: '100%',
        maxHeight: 150,
    },

    place: {
        width: width - 32,
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        borderRadius: 6,
        padding: 15,
        elevation: 3,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

    description: {
        color: '#999',
        fontSize: 12,
        marginTop: 5,
    },
});

export default Home;
