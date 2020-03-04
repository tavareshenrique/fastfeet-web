import React from 'react';

import { FaSearch } from 'react-icons/fa';

import { Container } from './styles';

export default function SearchBar() {
  return (
    <Container>
      <div>
        <FaSearch size={20} color="#999" />
      </div>

      <input
        className="searchBox"
        type="search"
        name="search"
        placeholder="Buscar por encomendas"
      />
    </Container>
  );
}
