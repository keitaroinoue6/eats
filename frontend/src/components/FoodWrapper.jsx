import React from 'react';
import styled from 'styled-components';

//components
import { SubText } from './StyledText';

//constants
import { COLORS } from '..//style_constants';

const Wrapper = styled.div`
    display: flex;
    width: 450px;
    height: 180px;
    border-width: 1px;
    border-style: solid;
    border-color: ${COLORS.BORDER};
    border-image: initial;
    cursor: pointer;
`;

const FoodDetail = styled.div`
    padding: 24px 16px;
    width: 250px;
`;

