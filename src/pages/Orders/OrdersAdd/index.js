import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Row, Col } from 'antd';
import { Form } from '@unform/web';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { BounceLoader } from 'react-spinners';

import { orderPost } from '~/store/modules/order/actions';

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

export default function OrdersAdd() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(state => state.order.loading);

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

  function handleSubmit({ product }) {
    dispatch(
      orderPost({
        product,
        recipient_id: deliverymanId,
        deliveryman_id: recipientId,
      })
    );
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <HeaderBar>
            <h1>Cadastro de Encomendas</h1>

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
                fieldName="deliveryman"
                data={dataRecipient}
                setValue={id => setRecipientId(id)}
              />
            </Col>
            <Col span={12}>
              <AsyncSelect
                label="Entregador"
                error
                fieldName="recipient"
                data={dataDeliverymen}
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
