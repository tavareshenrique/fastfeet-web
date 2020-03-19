import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Avatar({ name, big }) {
  const shortName = useCallback(() => {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || '') + (initials.pop() || '')
    ).toUpperCase();
    return initials;
  }, [name]);

  function randomNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }

  return (
    <Container color={randomNumber()} big={big}>
      <span>{shortName()}</span>
    </Container>
  );
}

Avatar.defaultProps = {
  big: false,
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  big: PropTypes.bool,
};
