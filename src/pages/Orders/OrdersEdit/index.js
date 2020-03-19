import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Row, Col } from 'antd';
import { Form } from '@unform/web';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { BounceLoader } from 'react-spinners';

import { orderUpdate } from '~/store/modules/order/actions';

import api from '~/services/api';

import Input from '~/components/Input';
import AsyncSelect from '~/components/AsyncSelect';

import {
  Container,
  Content,
  HeaderBar,
  ButtonContainer,
  ButtonText,
} from './styles';

export default function OrdersEdit({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(state => state.order.loading);

  const [data, setData] = useState([]);

  const [dataRecipient, setDataRecipient] = useState([]);
  const [dataDeliverymen, setDataDeliverymen] = useState([]);

  const [recipientId, setRecipientId] = useState('');
  const [deliverymanId, setDeliverymanId] = useState('');

  useEffect(() => {
    async function fetchRecipient() {
      const response = await api.get('/recipients');

      const arrRecipients = [];
      response.data.forEach(recipient => {
        arrRecipients.push({
          value: recipient.id,
          label: recipient.name,
        });
      });

      setDataRecipient(arrRecipients);
    }

    async function fetchDeliverymen() {
      const response = await api.get('/deliverymen');

      const arrDeliverymen = [];
      response.data.forEach(recipient => {
        arrDeliverymen.push({
          value: recipient.id,
          label: recipient.name,
        });
      });

      setDataDeliverymen(arrDeliverymen);
    }

    fetchRecipient();
    fetchDeliverymen();
  }, []);

  useEffect(() => {
    async function fetchOrder() {
      const { id } = match.params;

      const response = await api.get(`/orders/${id}`);

      setData(response.data);
      setRecipientId(response.data.recipient_id);
      setDeliverymanId(response.data.deliveryman_id);
    }

    fetchOrder();
  }, [match.params]);

  function handleSubmit({ product }) {
    const { id } = match.params;

    dispatch(
      orderUpdate(id, {
        product,
        recipient_id: deliverymanId,
        deliveryman_id: recipientId,
      })
    );
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} initialData={data}>
          <HeaderBar>
            <h1>Alteração de Encomendas</h1>

            <ButtonContainer>
              <button type="button" onClick={() => history.push('/orders')}>
                <FaChevronLeft color="#FFF" size={15} /> Voltar
              </button>

              <button type="submit">
                {loading ? (
                  <ButtonText>
                    <BounceLoader size={25} color="#FFF" loading={loading} />
                  </ButtonText>
                ) : (
                  <ButtonText>
                    <FaCheck color="#FFF" size={15} />
                    Salvar
                  </ButtonText>
                )}
              </button>
            </ButtonContainer>
          </HeaderBar>

          <Row>
            <Col span={12}>
              <AsyncSelect
                label="Destinatário"
                error
                fieldName="recipient"
                data={dataRecipient}
                defaultId={recipientId}
                setValue={id => setRecipientId(id)}
              />
            </Col>

            <Col span={12}>
              <AsyncSelect
                label="Entregador"
                error
                fieldName="deliveryman"
                data={dataDeliverymen}
                defaultId={deliverymanId}
                setValue={id => setDeliverymanId(id)}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Input
                label="Nome do produto"
                name="product"
                type="text"
                placeholder="Informe o nome do produto"
              />
            </Col>
          </Row>
        </Form>
      </Content>
    </Container>
  );
}

OrdersEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
