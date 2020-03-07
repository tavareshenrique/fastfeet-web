import React from 'react';
import { useDispatch } from 'react-redux';

import { FaSearch } from 'react-icons/fa';

import { searchWord } from '~/store/modules/search/actions';

import { Container } from './styles';

export default function SearchBar() {
  const dispatch = useDispatch();

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
        onChange={e => dispatch(searchWord(e.target.value))}
      />
    </Container>
  );
}
