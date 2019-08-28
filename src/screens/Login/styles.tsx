import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { space, SpaceProps, flexbox, FlexboxProps } from 'styled-system';

export const Flex = styled.View<FlexboxProps & SpaceProps>`
    ${flexbox}
    ${space}
`;

export const Logo = styled(Entypo)<SpaceProps>`
    ${space}
`;

export const StyledButton = styled(Button)<SpaceProps>`
    width: 100%;
    ${space}
`;

export const StyledInput = styled(TextInput)<SpaceProps>`
    width: 100%;
    ${space}
`;

export const SocialButton = styled(Button)<SpaceProps>`
    ${space}
`;
