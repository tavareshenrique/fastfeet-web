import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import axios from 'axios';

import { requestAddressSuccess, requestAddressFailure } from './actions';

export function* fetchAddress({ payload }) {
  try {
    const { zipcode } = payload;

    const response = yield call(
      axios.get,
      `https://viacep.com.br/ws/${zipcode}/json/`
    );

    yield put(
      requestAddressSuccess({
        street: response.data.logradouro,
        zipcode: response.data.cep,
        city: response.data.localidade,
        state: response.data.uf,
      })
    );

    toast.success('Opa! Localizamos o seu CEP!');
  } catch (err) {
    toast.error('CEP inválido, tente novamente!');
    yield put(requestAddressFailure());
  }
}

export default all([takeLatest('@address/ADDRESS_REQUEST', fetchAddress)]);
