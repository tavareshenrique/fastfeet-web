import React from 'react';
import PropTypes from 'prop-types';

import { ActionStyle } from './styles';

export default function Action({ onClick }) {
  return (
    <ActionStyle type="button" onClick={() => onClick()}>
      ...
    </ActionStyle>
  );
}

Action.propTypes = {
  onClick: PropTypes.func.isRequired,
};
