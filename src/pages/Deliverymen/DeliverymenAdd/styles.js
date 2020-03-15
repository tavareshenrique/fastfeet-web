import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px 283px 30px 283px;

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

export const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 15px;

  h1 {
    color: #444444;
    font-weight: bold;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  button + button {
    margin-left: 10px;
  }
`;

export const ButtonText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 10px;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  height: auto;
  width: auto;

  padding: 25px;

  background: #fff;

  border-radius: 10px;

  form {
    display: flex;
    flex-direction: column;

    input {
      border: 1px solid #ccc;
      border-radius: 10px;
      height: 44px;
      padding: 0 15px;
      color: #5b5b5b;
      margin: 0 0 10px;
      &::placeholder {
        color: #5b5b5b;
      }
    }
  }
`;
