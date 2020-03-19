import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, LabelContainer, Error } from './styles';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <LabelContainer>
        {label && <label htmlFor={fieldName}>{label}</label>}
        {error && <Error>* {error}</Error>}
      </LabelContainer>
      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
}

Input.defaultProps = {
  label: null,
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
