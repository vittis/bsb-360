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
    color,
    ColorProps,
    shadow,
    ShadowProps,
} from 'styled-system';

export const Flex = styled.View<
    FlexboxProps &
        SpaceProps &
        BorderProps &
        LayoutProps &
        PositionProps &
        ColorProps
>`
    ${position}
    ${layout}
    ${flexbox}
    ${space}
    ${border}
    ${color}
`;
