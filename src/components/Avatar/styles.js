import styled, { css } from 'styled-components';

const primaryColor1 = 'rgba(191, 63, 63, 1)';
const secondaryColor1 = 'rgba(191, 63, 63, 0.1)';

const primaryColor2 = 'rgba(182, 167, 219, 1)';
const secondaryColor2 = 'rgba(182, 167, 219, 0.1)';

const primaryColor3 = 'rgba(210, 161, 126, 1)';
const secondaryColor3 = 'rgba(210, 161, 126, 0.1)';

const primaryColor4 = 'rgba(143, 143, 206, 1)';
const secondaryColor4 = 'rgba(143, 143, 206, 0.1)';

const primaryColor5 = 'rgba(187, 218, 50, 1)';
const secondaryColor5 = 'rgba(187, 218, 50, 0.1)';

const primaryColorNophoto = color => {
  if (color === 1) {
    return primaryColor1;
  }

  if (color === 2) {
    return primaryColor2;
  }

  if (color === 3) {
    return primaryColor3;
  }

  if (color === 4) {
    return primaryColor4;
  }

  return primaryColor5;
};

const secondaryColorNophoto = color => {
  if (color === 1) {
    return secondaryColor1;
  }

  if (color === 2) {
    return secondaryColor2;
  }

  if (color === 3) {
    return secondaryColor3;
  }

  if (color === 4) {
    return secondaryColor4;
  }

  return secondaryColor5;
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props => (props.big ? '150px' : '35px')};
  height: ${props => (props.big ? '150px' : '35px')};

  ${({ big }) =>
    big &&
    css`
      border: 2px dashed #ccc;
    `}

  border-radius: 50px;
  background: ${props => secondaryColorNophoto(props.color)};

  span {
    margin-top: 2px;
    color: ${props => primaryColorNophoto(props.color)};
    font-weight: bold;
    font-size: ${props => (props.big ? '45px' : '14px')};
  }
`;
