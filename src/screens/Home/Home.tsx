import React, { useEffect, useState, useRef } from 'react';
import { ScrollView } from 'react-navigation';
import styled from 'styled-components/native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ActivityIndicator, FAB, Badge } from 'react-native-paper';
import {
    StyleSheet,
    Dimensions,
    Text,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

import {
    Foundation,
    MaterialCommunityIcons,
    Ionicons,
} from '@expo/vector-icons';
import { Flex } from '../../shared/Flex';
import { Button } from '../../shared/Button';
import {
    space,
    SpaceProps,
    color,
    ColorProps,
    typography,
    TypographyProps,
} from 'styled-system';

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
    image: string;
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
                'Parque de diversões colorido com montanhas-russas, carrossel e roda gigante, além de vendedores de alimentos.',
            latitude: -15.7961574,
            longitude: -47.9014396,
            mark: null,
            image:
                'https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000sOFt1MAG/59f87532e4b070f33289d54a.jpg&w=710&h=462',
        },
        {
            id: 2,
            title: 'Fonte da Torre',
            description:
                'Um show de águas coloridas e sincronizadas pode ser visto na Fonte Luminosa da Torre de TV.',
            latitude: -15.7918274,
            longitude: -47.8916544,
            mark: null,
            image:
                'https://i2.wp.com/fogocruzadodf.com.br/wp-content/uploads/2018/06/torre-de-tv.jpg?fit=900%2C600&ssl=1',
        },
        {
            id: 3,
            title: 'Esplanada',
            description: 'Um dos maiores pontos turísticos de Brasília.',
            latitude: -15.7953534,
            longitude: -47.8906947,
            mark: null,
            image:
                'https://i1.wp.com/brasiliadefato.com.br/wp-content/uploads/2018/10/esplanadadosministerios.jpg?resize=990%2C556&ssl=1',
        },
        {
            id: 4,
            title: 'Palácio do Planalto',
            description:
                'Edifício com o gabinete presidencial em design moderno de Oscar Niemeyer da década de 60, com passeios.',
            latitude: -15.7927375,
            longitude: -47.8821088,
            mark: null,
            image:
                'https://upload.wikimedia.org/wikipedia/commons/7/78/Pal%C3%A1cio_do_Planalto_GGFD8938.jpg',
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
                    latitude: latitude,
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
                    latitude: latitude,
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
                        mapPadding={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: windowHeight * 0.2,
                        }}
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
                        allowDragging={false}
                        friction={0.5}
                    >
                        <PlacesContainer
                            ref={scrollView}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={onPlacesMomentumScrollEnd}
                        >
                            {places.map((place, index) => (
                                <Place key={place.id}>
                                    <Flex position="relative">
                                        <PlaceImage
                                            style={{
                                                width: '100%',
                                                height: windowHeight * 0.2375,
                                            }}
                                            source={{
                                                uri: place.image,
                                            }}
                                        />
                                        <Flex
                                            position="absolute"
                                            top={10}
                                            right={10}
                                        >
                                            <Badge
                                                style={{
                                                    fontWeight: 'bold',
                                                }}
                                                size={25}
                                            >
                                                {index + 1}/{places.length}
                                            </Badge>
                                        </Flex>
                                    </Flex>
                                    <Flex px={3} py={2} width={1}>
                                        <Flex
                                            flexDirection="row"
                                            justifyContent="space-between"
                                            width={1}
                                        >
                                            <Flex
                                                flexDirection="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                width={1}
                                            >
                                                <Flex
                                                    flexDirection="row"
                                                    alignItems="center"
                                                >
                                                    <MaterialCommunityIcons
                                                        size={18}
                                                        color="#6200ee"
                                                        name="map-marker-radius"
                                                    />
                                                    <PlaceLabel
                                                        fontSize={16}
                                                        fontWeight="bold"
                                                        //ml={1}
                                                    >
                                                        {place.title}
                                                    </PlaceLabel>
                                                </Flex>
                                                <Flex
                                                    flexDirection="row"
                                                    alignItems="center"
                                                >
                                                    <MaterialCommunityIcons
                                                        size={18}
                                                        //color="#6200ee"
                                                        color="#6200ee"
                                                        name="star-circle"
                                                    />
                                                    <PlaceLabel
                                                        fontSize={14}
                                                        fontWeight="bold"
                                                        // ml={1}
                                                        color="#000"
                                                    >
                                                        10 pts
                                                    </PlaceLabel>
                                                </Flex>
                                                <Flex
                                                    flexDirection="row"
                                                    alignItems="center"
                                                >
                                                    <MaterialCommunityIcons
                                                        size={18}
                                                        //color="#6200ee"
                                                        color="#6200ee"
                                                        name="run"
                                                    />
                                                    <PlaceLabel
                                                        fontSize={14}
                                                        fontWeight="bold"
                                                        // ml={1}
                                                        color="#000"
                                                    >
                                                        {(
                                                            Math.random() + 5
                                                        ).toFixed(1)}{' '}
                                                        km
                                                    </PlaceLabel>
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                        <Text style={styles.description}>
                                            {place.description}
                                        </Text>
                                    </Flex>
                                    <Flex
                                        display="flex"
                                        position="absolute"
                                        bottom={0}
                                        //alignItems="center"
                                        px={3}
                                        justifyContent="center"
                                        width={1}
                                        alignItems="center"
                                    >
                                        <Button
                                            width={1}
                                            mode="contained"
                                            icon={({
                                                size,
                                                color: iconColor,
                                            }) => (
                                                <MaterialCommunityIcons
                                                    size={size}
                                                    color={iconColor}
                                                    name="map-marker-plus"
                                                />
                                            )}
                                            mb={2}
                                            onPress={() => {}}
                                        >
                                            check-in
                                        </Button>
                                    </Flex>
                                </Place>
                            ))}
                        </PlacesContainer>
                    </SlidingUpPanel>
                    <FAB
                        style={styles.fab}
                        visible={fabVisible}
                        icon={({ color: iconColor, size }) => (
                            <Container>
                                <Foundation
                                    size={size + 5}
                                    name="marker"
                                    color={iconColor}
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
                                        latitude: latitude,
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
                    <FAB
                        style={styles.closeFab}
                        visible={!fabVisible}
                        small
                        icon={({ color: iconColor, size }) => (
                            <Container>
                                <Ionicons
                                    size={size + 5}
                                    name="ios-arrow-down"
                                    color={iconColor}
                                />
                            </Container>
                        )}
                        onPress={() => {
                            slidingUpPanel.current.hide();
                            setFabVisible(true);
                            places.forEach(p => {
                                p.mark.hideCallout();
                            });
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

const PlaceLabel = styled.Text<SpaceProps & ColorProps & TypographyProps>`
    ${space}
    ${color}
    ${typography}
    /* font-weight: bold;
    font-size: 18; */
    background-color: transparent;
`;

const PlaceImage = styled.Image`
    width: 100%;
    max-height: ${windowHeight * 0.2375};
    /* border-top-left-radius: 8;
    border-top-right-radius: 8; */
`;

const styles = StyleSheet.create({
    sefode: {
        marginRight: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee',
    },
    closeFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
        backgroundColor: '#6200ee',
    },

    mapView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    description: {
        color: '#999',
        fontSize: 13,
        marginTop: 5,
        textAlign: 'justify',
    },
});

export default Home;
