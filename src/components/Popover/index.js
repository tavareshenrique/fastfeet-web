import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Popover as PopoverAntd } from 'antd';

import { confirmAlert } from 'react-confirm-alert';
import { removeChar } from '~/utils/removeChar';

import { orderDelete } from '~/store/modules/order/actions';
import { recipientDelete } from '~/store/modules/recipient/actions';
import { deliverymanDelete } from '~/store/modules/deliveryman/actions';
import { deliveryCancel } from '~/store/modules/deliveryproblem/actions';

import view from '~/assets/view.png';
import edit from '~/assets/edit.png';
import remove from '~/assets/remove.png';

import { Container, Option } from './styles';

export default function Popover({
  visible,
  id,
  urlParam,
  handleVisibleChange,
  handleViewClick,
  showView,
  showEdit,
  labelDelete,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  function setDispatch() {
    switch (urlParam) {
      case 'orders': {
        dispatch(orderDelete(id));
        break;
      }
      case 'recipients': {
        dispatch(recipientDelete(id));
        break;
      }
      case 'deliverymen': {
        dispatch(deliverymanDelete(id));
        break;
      }
      case 'problems': {
        dispatch(deliveryCancel(id));
        break;
      }

      default:
    }
  }

  function handleDelete() {
    confirmAlert({
      title: 'Deseja Excluir?',
      message: 'Você realmente deseja excluir o registro?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => setDispatch(),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handleEdit() {
    history.push(`${urlParam}/edit/${removeChar(id)}`);
  }

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
              <Option type="button" onClick={handleEdit}>
                <img src={edit} alt="Edit" />
                Editar
              </Option>
            </div>
          )}
          <div>
            <Option type="button" onClick={handleDelete}>
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
  id: '0',
  handleViewClick: () => {},
  handleDeleteClick: () => {},
  showView: true,
  showEdit: true,
  labelDelete: 'Excluir',
};

Popover.propTypes = {
  visible: PropTypes.bool.isRequired,
  id: PropTypes.string,
  urlParam: PropTypes.string.isRequired,
  handleVisibleChange: PropTypes.func.isRequired,
  handleViewClick: PropTypes.func,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  labelDelete: PropTypes.string,
};
