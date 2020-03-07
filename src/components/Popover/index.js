import React from 'react';
import PropTypes from 'prop-types';

import { Popover as PopoverAntd } from 'antd';

import view from '~/assets/view.png';
import edit from '~/assets/edit.png';
import remove from '~/assets/remove.png';

import { Container, Option } from './styles';

export default function Popover({ visible, handleVisibleChange }) {
  return (
    <PopoverAntd
      placement="bottom"
      content={
        <Container>
          <div>
            <Option type="button" onClick={() => {}}>
              <img src={view} alt="View" />
              Visualizar
            </Option>
          </div>
          <div>
            <Option type="button" onClick={() => {}}>
              <img src={edit} alt="Edit" />
              Editar
            </Option>
          </div>
          <div>
            <Option type="button" onClick={() => {}}>
              <img src={remove} alt="Remove" />
              Excluir
            </Option>
          </div>
        </Container>
      }
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    />
  );
}

Popover.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleVisibleChange: PropTypes.func.isRequired,
};
