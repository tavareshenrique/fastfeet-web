import React from 'react';

import { Row, Col } from 'antd';
import { Form } from '@unform/web';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';

import Input from '~/components/Input';

import { Container, Content, HeaderBar, ButtonContainer } from './styles';

export default function ordersAdd() {
  return (
    <Container>
      <HeaderBar>
        <h1>Cadastro de Encomendas</h1>

        <ButtonContainer>
          <button type="button">
            <FaChevronLeft color="#FFF" size={15} /> Voltar
          </button>

          <button type="button">
            <FaCheck color="#FFF" size={15} /> Salvar
          </button>
        </ButtonContainer>
      </HeaderBar>

      <Content>
        <Form onSubmit={() => {}}>
          <Row>
            <Col span={12}>
              <Input
                label="Destinatário"
                name="recipient"
                type="text"
                // placeholder="example@email.com"
              />
            </Col>
            <Col span={12}>
              <Input
                label="Entregador"
                name="deliveryman"
                type="text"
                // placeholder="********"
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Input
                label="Destinatário"
                name="recipient"
                type="text"
                // placeholder="example@email.com"
              />
            </Col>
          </Row>
        </Form>
      </Content>
    </Container>
  );
}
