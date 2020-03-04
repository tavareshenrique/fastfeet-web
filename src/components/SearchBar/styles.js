import styled from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }

  .searchBox {
    border: 0;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    flex: 1;
  }
`;
