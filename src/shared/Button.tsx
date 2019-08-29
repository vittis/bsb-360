import styled from 'styled-components/native';
import { Button as OriginalButton } from 'react-native-paper';
import { space, SpaceProps, layout, LayoutProps } from 'styled-system';

export const Button = styled(OriginalButton)<SpaceProps & LayoutProps>`
    ${layout}
    ${space}
`;
