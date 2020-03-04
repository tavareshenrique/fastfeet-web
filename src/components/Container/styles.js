import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  padding: 30px 120px 30px 120px;

  button {
    width: 150px;
    margin: 5px 0 0;
    height: 44px;
    background: #816fe7;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.3, '#816fe7')};
    }
  }
`;

export const Title = styled.h2`
  font-weight: bold;
`;

export const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-bottom: 15px;
`;
