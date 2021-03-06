import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { Row, Col } from 'antd';
import { Form } from '@unform/web';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { BounceLoader } from 'react-spinners';

import { deliverymanPost } from '~/store/modules/deliveryman/actions';

import AvatarInput from '~/components/AvatarInput';
import Input from '~/components/Input';

import {
  Container,
  Content,
  HeaderBar,
  ButtonContainer,
  ButtonText,
  AvatarContainer,
} from './styles';

export default function DeliverymenAdd() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef(null);

  const loading = useSelector(state => state.order.loading);

  async function handleSubmit(dataSubmit, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Email inválido')
          .required('O email é obrigatório'),
      });

      await schema.validate(dataSubmit, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      dispatch(deliverymanPost(dataSubmit));

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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <HeaderBar>
            <h1>Cadastro de Entregadores</h1>

            <ButtonContainer>
              <button
                type="button"
                onClick={() => history.push('/deliverymen')}
              >
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
            <Col span={24}>
              <AvatarContainer>
                <AvatarInput name="avatar_id" />
              </AvatarContainer>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Input
                label="Nome"
                name="name"
                type="text"
                placeholder="Ex.: Henrique Tavares"
              />
            </Col>

            <Col span={24}>
              <Input
                label="Email"
                name="email"
                type="text"
                placeholder="Ex.: henrique@gmail.com"
              />
            </Col>
          </Row>
        </Form>
      </Content>
    </Container>
  );
}
