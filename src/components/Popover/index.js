import React from 'react';
import PropTypes from 'prop-types';

import { Popover as PopoverAntd } from 'antd';

import view from '~/assets/view.png';
import edit from '~/assets/edit.png';
import remove from '~/assets/remove.png';

import { Container, Option } from './styles';

export default function Popover({
  visible,
  handleVisibleChange,
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  showView,
  showEdit,
  labelDelete,
}) {
  return (
    <PopoverAntd
      placement="bottom"
      content={
        <Container>
          {showView && (
            <div>
              <Option type="button" onClick={handleViewClick}>
                <img src={view} alt="View" />
                Visualizar
              </Option>
            </div>
          )}
          {showEdit && (
            <div>
              <Option type="button" onClick={handleEditClick}>
                <img src={edit} alt="Edit" />
                Editar
              </Option>
            </div>
          )}
          <div>
            <Option type="button" onClick={handleDeleteClick}>
              <img src={remove} alt="Remove" />
              {labelDelete}
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

Popover.defaultProps = {
  handleViewClick: () => {},
  handleEditClick: () => {},
  handleDeleteClick: () => {},
  showView: true,
  showEdit: true,
  labelDelete: 'Excluir',
};

Popover.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleVisibleChange: PropTypes.func.isRequired,
  handleViewClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  labelDelete: PropTypes.string,
};
