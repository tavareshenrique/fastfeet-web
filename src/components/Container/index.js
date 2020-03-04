import React from 'react';
import PropTypes from 'prop-types';

import { FaPlus } from 'react-icons/fa';

import SearchBar from '~/components/SearchBar';

import { Content, Title, HeaderBar } from './styles';

export default function Container({ title, children }) {
  return (
    <Content>
      <Title>{title}</Title>

      <HeaderBar>
        <SearchBar />
        <button type="button">
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
};
