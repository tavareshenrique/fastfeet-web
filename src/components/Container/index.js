import React from 'react';
import PropTypes from 'prop-types';

import { FaPlus } from 'react-icons/fa';

import SearchBar from '~/components/SearchBar';

import { Content, HeaderBar } from './styles';

export default function Container({ title, children, handleAdd }) {
  return (
    <Content>
      <h2>{title}</h2>

      <HeaderBar>
        <SearchBar />
        <button type="button" onClick={handleAdd}>
          <FaPlus color="#FFF" size={15} /> Cadastrar
        </button>
      </HeaderBar>
      {children}
    </Content>
  );
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  handleAdd: PropTypes.func.isRequired,
};
