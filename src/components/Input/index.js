import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container, LabelContainer, Error, AsyncSelect } from './styles';

export default function Input({ name, label, data, setValue, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const filter = useCallback(
    inputValue => {
      return data.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    },
    [data]
  );

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filter(inputValue));
      }, 1000);
    });

  return (
    <Container>
      <LabelContainer>
        {label && <label htmlFor={fieldName}>{label}</label>}
        {error && <Error>* {error}</Error>}
      </LabelContainer>

      {data.length <= 0 ? (
        <input
          ref={inputRef}
          id={fieldName}
          defaultValue={defaultValue}
          {...rest}
        />
      ) : (
        <AsyncSelect
          cacheOptions
          defaultOptions={data}
          loadOptions={promiseOptions}
          onChange={inputValue => setValue(inputValue.value)}
        />
      )}
    </Container>
  );
}

Input.defaultProps = {
  data: [],
  name: '',
  label: '',
  setValue: () => {},
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  setValue: PropTypes.func,
};
