import styled from 'styled-components/native';
import { space, SpaceProps, flexbox, FlexboxProps } from 'styled-system';

export const Flex = styled.View<FlexboxProps & SpaceProps>`
    ${flexbox}
    ${space}
`;
