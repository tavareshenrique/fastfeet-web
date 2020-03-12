import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 5px;
`;

export const LabelContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-start;
  padding: 5px;

  span {
    margin-left: 5px !important;
  }
`;

export const Error = styled.span`
  margin: 0 !important;
  font-size: 12px !important;
  color: #ec5151 !important;
`;
