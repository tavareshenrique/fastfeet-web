import React from 'react';
import PropTypes from 'prop-types';

import { FaPlus } from 'react-icons/fa';

import SearchBar from '~/components/SearchBar';

import { Content, HeaderBar } from './styles';

export default function Container({ title, children, showButton, handleAdd }) {
  return (
    <Content>
      <h2>{title}</h2>

      {showButton && (
        <HeaderBar>
          <SearchBar />
          <button type="button" onClick={handleAdd}>
            <FaPlus color="#FFF" size={15} /> Cadastrar
          </button>
        </HeaderBar>
      )}
      {children}
    </Content>
  );
}

Container.defaultProps = {
  showButton: true,
  handleAdd: () => {},
};

Container.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
  handleAdd: PropTypes.func,
};
