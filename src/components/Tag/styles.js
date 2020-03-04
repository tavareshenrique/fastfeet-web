import styled from 'styled-components';

import { Tag } from 'antd';

export const TagStyle = styled(Tag)`
  &::before {
    content: '';
    height: 10px;
    width: 10px;
    background-color: ${props => props.color};
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
  }
`;
