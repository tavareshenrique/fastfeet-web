import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { Row, Col } from 'antd';
import { Form } from '@unform/web';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { BounceLoader } from 'react-spinners';
import LoadingOverlay from 'react-loading-overlay';
import { removeChar } from '~/utils/removeChar';

import { recipientPost } from '~/store/modules/recipient/actions';
import { requestAddress } from '~/store/modules/address/actions';

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
  const formRef = useRef(null);

  const loading = useSelector(state => state.order.loading);
  const loadingAddress = useSelector(state => state.address.loading);
  const dataAddress = useSelector(state => state.address.data);

  async function loadCep(zipcode) {
    const zipFormatted = removeChar(zipcode, '-');

    if (zipFormatted.length === 8) {
      dispatch(requestAddress(zipFormatted));
    }
  }

  async function handleSubmit(dataSubmit, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        zipcode: Yup.string().required('O CEP é obrigatório'),
        city: Yup.string().required('A cidade é obrigatória'),
        state: Yup.string().required('A UF é obrigatório'),
        street: Yup.string().required('A rua é obrigatória'),
        number: Yup.string().required('O Nº é obrigatório'),
      });

      await schema.validate(dataSubmit, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      dispatch(recipientPost(dataSubmit));

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
    <LoadingOverlay active={loadingAddress} spinner text="Buscando endereço...">
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={dataAddress}>
            <HeaderBar>
              <h1>Cadastro de Destinatário</h1>

              <ButtonContainer>
                <button
                  type="button"
                  onClick={() => history.push('/recipients')}
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
                <Input
                  label="Nome"
                  name="name"
                  type="text"
                  placeholder="Ex.: Henrique Tavares"
                />
              </Col>
            </Row>

            <Row>
              <Col span={7}>
                <Input
                  label="CEP"
                  name="zipcode"
                  type="text"
                  placeholder="Ex.: 00000000"
                  onChange={e => loadCep(e.target.value)}
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

              <Col span={5}>
                <Input
                  label="UF"
                  name="state"
                  type="text"
                  placeholder="Ex.: RJ"
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
          </Form>
        </Content>
      </Container>
    </LoadingOverlay>
  );
}
