import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

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

export default function OrdersEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef(null);
  const { id } = useParams();

  const loading = useSelector(state => state.order.loading);

  const [data, setData] = useState([]);

  const [dataRecipient, setDataRecipient] = useState([]);
  const [dataDeliverymen, setDataDeliverymen] = useState([]);

  const [recipientId, setRecipientId] = useState(-1);
  const [deliverymanId, setDeliverymanId] = useState(-1);

  const [recipientError, setRecipientError] = useState('');
  const [deliverymanError, setDeliverymanError] = useState('');

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
      const response = await api.get(`/orders/${id}`);

      setData(response.data);
      setRecipientId(response.data.recipient_id);
      setDeliverymanId(response.data.deliveryman_id);
    }

    fetchOrder();
  }, [id]);

  function validateAsynFields() {
    if (recipientId === '') {
      setRecipientError('Destinatário obrigatório');
    } else {
      setRecipientError('');
    }

    if (deliverymanId === '') {
      setDeliverymanError('Entregador obrigatório');
    } else {
      setDeliverymanError('');
    }

    if (recipientId === '' || deliverymanId === '') {
      return true;
    }

    return false;
  }

  async function handleSubmit(dataSubmit, { reset }) {
    const { product } = dataSubmit;

    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('O produto é obrigatório'),
      });

      if (validateAsynFields()) return;

      await schema.validate(dataSubmit, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      dispatch(
        orderUpdate(id, {
          product,
          recipient_id: recipientId,
          deliveryman_id: deliverymanId,
        })
      );

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={data}>
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
                error={recipientError}
                fieldName="recipient"
                data={dataRecipient}
                defaultId={recipientId}
                setValue={idRecipient => setRecipientId(idRecipient)}
              />
            </Col>

            <Col span={12}>
              <AsyncSelect
                label="Entregador"
                error={deliverymanError}
                fieldName="deliveryman"
                data={dataDeliverymen}
                defaultId={deliverymanId}
                setValue={idDeliveryman => setDeliverymanId(idDeliveryman)}
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
