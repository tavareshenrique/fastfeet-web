import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { TagStyle } from './styles';

export default function Tag({ status }) {
  function getColor(statusColor) {
    if (statusColor === 'ENTREGUE') {
      return 'green';
    }

    if (statusColor === 'RETIRADA') {
      return 'blue';
    }

    if (statusColor === 'CANCELADA') {
      return 'red';
    }

    return 'gold';
  }

  const color = useMemo(() => getColor(status), [status]);

  return (
    <span>
      <TagStyle color={color} key={status}>
        {status}
      </TagStyle>
    </span>
  );
}

Tag.propTypes = {
  status: PropTypes.string.isRequired,
};
