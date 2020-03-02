import React from 'react';
import PropTypes from 'prop-types';

import { StyledMenu } from './styles';

export default function Menu({ page, pathname, label }) {
  return (
    <StyledMenu activepage={page === pathname ? 'true' : 'false'} to={page}>
      {label}
    </StyledMenu>
  );
}

Menu.propTypes = {
  page: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
