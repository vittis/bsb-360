import React, { useState } from 'react';
import { NavigationScreenProps, ScrollView } from 'react-navigation';
import styled from 'styled-components/native';
import { Button } from '../../shared/Button';
import { useAuth } from '../../store/ducks/auth/hooks';
import { Flex } from '../../shared/Flex';
import {
    FontAwesome,
    MaterialCommunityIcons,
    Ionicons,
    Foundation,
    AntDesign,
} from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import {
    space,
    color,
    typography,
    SpaceProps,
    ColorProps,
    TypographyProps,
} from 'styled-system';
import { TextInput } from '../../shared/TextInput';
import { ProgressBar, FAB } from 'react-native-paper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Profile(props: NavigationScreenProps) {
    const { authSignOut } = useAuth();
    const [editing, setEditing] = useState(false);

    return (
        <Flex width={1} flex={1} pt={4} alignItems="center">
            <FAB
                style={styles.closeFab}
                visible={true}
                small
                color="#5514b3"
                icon={({ color: iconColor, size }) => (
                    <Container>
                        <FontAwesome
                            size={size}
                            name="gear"
                            color={iconColor}
                        />
                    </Container>
                )}
                onPress={() => {}}
            />
            <FAB
                style={styles.fab}
                visible={true}
                icon={({ color: iconColor, size }) => (
                    <AntDesign
                        size={size}
                        name={!editing ? 'edit' : 'check'}
                        color={iconColor}
                    />
                )}
                onPress={() => {
                    setEditing(true);
                }}
            />
            <FontAwesome name="user-circle" size={80} color="#5514b3" />
            <Flex mt={2} />
            <Label textAlign="center" fontSize={20} fontWeight="bold">
                Vitor Bichara
            </Label>
            <Flex mt={1} flexDirection="row" alignItems="center">
                <MaterialCommunityIcons
                    size={18}
                    color="#6200ee"
                    name="star-circle"
                />
                <Label ml={1} fontSize={16} fontWeight="bold">
                    Nível 1
                </Label>
            </Flex>
            <Flex
                style={styles.elevated}
                mt={3}
                backgroundColor="#eee"
                width={1}
                height={8}
            />
            <ScrollView style={{ width: '100%' }}>
                <Flex width={1} flex={1} alignItems="center" px={3}>
                    <Label
                        textAlign="left"
                        fontSize={22}
                        my={3}
                        fontWeight="bold"
                    >
                        Dados
                    </Label>
                    <TextInput
                        label="email"
                        autoCompleteType="off"
                        autoCorrect={false}
                        fullWidth
                        mode="outlined"
                        value="vitor.bichara@gmail.com"
                        disabled={!editing}
                    />
                    <TextInput
                        mt={2}
                        label="nome"
                        autoCompleteType="off"
                        autoCorrect={false}
                        fullWidth
                        mode="outlined"
                        value="Vitor Bichara"
                        disabled={!editing}
                    />
                    <TextInput
                        mt={2}
                        label="CPF"
                        autoCompleteType="off"
                        autoCorrect={false}
                        fullWidth
                        mode="outlined"
                        value="524.089.720-43"
                        disabled={!editing}
                    />
                    <TextInput
                        mt={2}
                        label="endereço"
                        autoCompleteType="off"
                        autoCorrect={false}
                        fullWidth
                        mode="outlined"
                        value="SQSW 304 Bloco A apt 504"
                        disabled={!editing}
                    />
                    <TextInput
                        mt={2}
                        label="data de nascimento"
                        autoCompleteType="off"
                        autoCorrect={false}
                        fullWidth
                        mode="outlined"
                        value="20/10/1994"
                        disabled={!editing}
                    />
                    <TextInput
                        my={2}
                        label="celular"
                        autoCompleteType="off"
                        autoCorrect={false}
                        fullWidth
                        mode="outlined"
                        value="(61) 98227-4407"
                        disabled={!editing}
                    />
                </Flex>
            </ScrollView>
        </Flex>
    );
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Label = styled.Text<SpaceProps & ColorProps & TypographyProps>`
    ${space}
    ${color}
    ${typography}
`;

const styles = StyleSheet.create({
    elevated: {
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowColor: '#000000',
        elevation: 2,
        shadowOpacity: 0.5,
    },
    closeFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowColor: '#fff',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee',
    },
});

export default Profile;
