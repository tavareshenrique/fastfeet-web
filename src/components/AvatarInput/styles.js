import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 150px !important;
      width: 150px !important;
      border-radius: 50%;
      border: 2px dashed #ccc;
      background: #eee;
    }
    input {
      display: none;
    }
  }
`;
