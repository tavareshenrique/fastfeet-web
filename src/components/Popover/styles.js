import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  div {
    &:hover {
      background: #eaeaea;
    }
  }

  div + div {
    margin-top: 10px;
  }

  padding: 10px;
`;

export const Option = styled.button`
  background: none !important;
  border: none;
  padding: 0 !important;

  display: flex;
  align-items: center;

  color: #4c4c4c;

  img {
    margin-right: 5px;
  }
`;
