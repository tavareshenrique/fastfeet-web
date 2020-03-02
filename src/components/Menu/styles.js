import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const StyledMenu = styled(Link)`
  color: ${props =>
    props.activepage === 'true' ? '#444444' : '#999999'} !important;
`;
