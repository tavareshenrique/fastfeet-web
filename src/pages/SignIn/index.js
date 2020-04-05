import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { BounceLoader } from 'react-spinners';

import { signInRequest } from '~/store/modules/auth/actions';

import Input from '~/components/Input';

import { Container, Button } from './styles';

import logo from '~/assets/fastfeet-logo.png';

export default function SignIn() {
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit(data) {
    const { email, password } = data;

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      dispatch(signInRequest(email, password));

      formRef.current.clearField('password');
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
      <img src={logo} alt="FastFeet" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="SEU E-MAIL"
          name="email"
          type="email"
          placeholder="example@email.com"
        />

        <Input
          label="SUA SENHA"
          name="password"
          type="password"
          placeholder="********"
        />

        <Button type="submit">
          {loading ? (
            <BounceLoader size={25} color="#FFF" loading={loading} />
          ) : (
            'Entrar no sistema'
          )}
        </Button>
      </Form>
    </Container>
  );
}
