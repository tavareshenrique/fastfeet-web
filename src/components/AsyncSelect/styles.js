import styled from 'styled-components';

import AsyncReact from 'react-select/async';

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

export const AsyncSelectStyle = styled(AsyncReact)`
  .css-yk16xz-control {
    height: 44px !important;
  }

  .css-1pahdxg-control {
    height: 44px !important;

    input {
      top: 33% !important;
    }
  }

  .css-1okebmr-indicatorSeparator {
    margin-bottom: 30px !important;
    margin-top: 8px !important;
  }

  .css-1uccc91-singleValue {
    top: 33% !important;
  }

  .css-1wa3eu0-placeholder {
    top: 34% !important;
  }

  input {
    width: 100%;
  }

  svg {
    margin-bottom: 20px !important;
  }
`;
