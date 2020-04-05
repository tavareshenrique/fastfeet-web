import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Container, LabelContainer, Error, AsyncSelectStyle } from './styles';

export default function AsyncSelect({
  data,
  label,
  error,
  fieldName,
  defaultId,
  setValue,
}) {
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

      <AsyncSelectStyle
        cacheOptions
        defaultOptions={data}
        value={data.find(o => o.value === defaultId)}
        loadOptions={promiseOptions}
        onChange={inputValue => setValue(inputValue.value)}
      />
    </Container>
  );
}

AsyncSelect.defaultProps = {
  defaultId: '-1',
};

AsyncSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  defaultId: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};
