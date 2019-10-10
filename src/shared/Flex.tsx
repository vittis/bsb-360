import styled from 'styled-components/native';
import {
    space,
    SpaceProps,
    flexbox,
    FlexboxProps,
    border,
    BorderProps,
    layout,
    LayoutProps,
    position,
    PositionProps,
} from 'styled-system';

export const Flex = styled.View<
    FlexboxProps & SpaceProps & BorderProps & LayoutProps & PositionProps
>`
    ${position}
    ${layout}
    ${flexbox}
    ${space}
    ${border}
`;
