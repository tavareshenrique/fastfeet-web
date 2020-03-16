import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Row, Col } from 'antd';
import { Form } from '@unform/web';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { BounceLoader } from 'react-spinners';

import { recipientPost } from '~/store/modules/recipient/actions';

import Input from '~/components/Input';

import {
  Container,
  Content,
  HeaderBar,
  ButtonContainer,
  ButtonText,
} from './styles';

export default function RecipientsAdd() {
  const dispatch = useDispatch();

  const history = useHistory();

  const loading = useSelector(state => state.order.loading);

  function handleSubmit(data) {
    dispatch(recipientPost(data));
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <HeaderBar>
            <h1>Cadastro de Destinatário</h1>

            <ButtonContainer>
              <button type="button" onClick={() => history.push('/recipients')}>
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
              <Input
                label="Nome"
                name="name"
                type="text"
                placeholder="Ex.: Henrique Tavares"
              />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Input
                label="Rua"
                name="street"
                type="text"
                placeholder="Ex.: Rua Joaquim José da Silva Xavier"
              />
            </Col>

            <Col span={6}>
              <Input
                label="Número"
                name="number"
                type="text"
                placeholder="Ex.: 100"
              />
            </Col>

            <Col span={6}>
              <Input
                label="Complemento"
                name="complement"
                type="text"
                placeholder="Ex.: Casa 1"
              />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Input
                label="CEP"
                name="zipcode"
                type="text"
                placeholder="Ex.: 00000-000"
              />
            </Col>

            <Col span={12}>
              <Input
                label="Cidade"
                name="city"
                type="text"
                placeholder="Ex.: Rio de Janeiro"
              />
            </Col>

            <Col span={4}>
              <Input
                label="UF"
                name="state"
                type="text"
                placeholder="Ex.: RJ"
              />
            </Col>
          </Row>
        </Form>
      </Content>
    </Container>
  );
}
