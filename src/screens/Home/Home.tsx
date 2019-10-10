import React, { useEffect, useState, useRef } from 'react';
import { ScrollView } from 'react-navigation';
import styled from 'styled-components/native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ActivityIndicator, FAB } from 'react-native-paper';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { Foundation } from '@expo/vector-icons';
import { Flex } from '../../shared/Flex';
import { Button } from '../../shared/Button';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

Home.navigationOptions = {
    title: 'opora',
};

interface Place {
    id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    mark: Marker;
}

function Home() {
    const [location, setLocation] = useState(null);
    const [error, setErrorMessage] = useState(null);
    const [fabVisible, setFabVisible] = useState(true);

    const [places, setPlaces] = useState<Place[]>([
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
            title: 'Fonte da Torre de TV',
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

    async function _getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    }

    function onPlacesPanelDragEnd(value: number) {
        if (value < 70) {
            if (!fabVisible) setFabVisible(true);
            places.forEach(p => {
                p.mark.hideCallout();
            });
        } else {
            if (fabVisible) setFabVisible(false);
        }
    }

    function onMarkerPress(markerData: MapEvent, index: number) {
        if (fabVisible) setFabVisible(false);
        const { latitude, longitude } = markerData.nativeEvent.coordinate;
        mapView.current.animateCamera(
            {
                center: {
                    latitude: latitude - 0.02,
                    longitude,
                },
            },
            { duration: 500 }
        );
        slidingUpPanel.current.show();
        scrollView.current.scrollTo({
            x: windowWidth * index,
            y: 0,
            animated: true,
        });
    }

    function onPlacesMomentumScrollEnd(
        e: NativeSyntheticEvent<NativeScrollEvent>
    ) {
        const place =
            e.nativeEvent.contentOffset.x > 0
                ? e.nativeEvent.contentOffset.x / windowWidth
                : 0;

        const { latitude, longitude, mark } = places[Math.round(place)];

        mapView.current.animateCamera(
            {
                center: {
                    latitude: latitude - 0.015,
                    longitude,
                },
            },
            { duration: 500 }
        );

        setTimeout(() => {
            mark.showCallout();
        }, 500);
    }

    return (
        <Container>
            {!location && <ActivityIndicator size="large" />}
            {location && (
                <>
                    <MapView
                        ref={mapView}
                        showsUserLocation
                        moveOnMarkerPress={false}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={styles.mapView}
                        rotateEnabled={false}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        showsBuildings={false}
                        showsPointsOfInterest={false}
                    >
                        {places.map((place, index) => (
                            <Marker
                                ref={mark => (place.mark = mark)}
                                title={place.title}
                                onPress={markerData =>
                                    onMarkerPress(markerData, index)
                                }
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
                        draggableRange={{
                            top: windowHeight * 0.475,
                            bottom: 0,
                        }}
                        showBackdrop={false}
                        ref={slidingUpPanel}
                        allowMomentum={true}
                        onMomentumDragEnd={onPlacesPanelDragEnd}
                        onDragEnd={onPlacesPanelDragEnd}
                    >
                        <PlacesContainer
                            ref={scrollView}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={onPlacesMomentumScrollEnd}
                        >
                            {places.map(place => (
                                <Place key={place.id}>
                                    <PlaceImage
                                        source={require('../../assets/torredetv.png')}
                                    />
                                    <Flex p={3}>
                                        <Text style={styles.title}>
                                            {place.title}
                                        </Text>
                                        <Text style={styles.description}>
                                            {place.description}
                                        </Text>
                                    </Flex>
                                    <Flex
                                        display="flex"
                                        position="absolute"
                                        bottom={0}
                                        alignItems="center"
                                        justifyContent="center"
                                        width={1}
                                    >
                                        <Button mb={1} onPress={() => {}}>
                                            Fazer check-in
                                        </Button>
                                    </Flex>
                                </Place>
                            ))}
                        </PlacesContainer>
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
                            scrollView.current.scrollTo({ x: 0, y: 0 });
                            setFabVisible(false);
                            const { latitude, longitude, mark } = places[0];

                            mapView.current.animateCamera(
                                {
                                    center: {
                                        latitude: latitude - 0.015,
                                        longitude,
                                    },
                                },
                                { duration: 500 }
                            );

                            setTimeout(() => {
                                mark.showCallout();
                            }, 500);
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

const PlacesContainer = styled.ScrollView`
    width: 100%;
`;
const Place = styled.View`
    width: ${windowWidth};
    max-height: ${windowHeight * 0.475};
    background-color: #fff;
    position: relative;
`;

const PlaceImage = styled.Image`
    width: 100%;
    max-height: 150;
    /* border-top-left-radius: 8;
    border-top-right-radius: 8; */
`;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee',
    },

    mapView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
