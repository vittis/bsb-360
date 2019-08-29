import styled from 'styled-components/native';
import { TextInput as OriginalInput } from 'react-native-paper';
import { space, SpaceProps } from 'styled-system';

interface fullWidth {
    fullWidth?: boolean;
}

export const TextInput = styled(OriginalInput)<SpaceProps & fullWidth>`
    ${space}
    width: ${props => (props.fullWidth ? '100%' : 'auto')}
`;
