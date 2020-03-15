import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { deliverymanPostSuccess, deliverymanPostFailure } from './actions';

export function* deliverymanAdd({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'deliverymen', data);

    toast.success('Entregador incluido com sucesso!');

    yield put(deliverymanPostSuccess());

    history.push('/deliverymen');
  } catch (err) {
    toast.error('Falha ao incluir uma entregador!');
    yield put(deliverymanPostFailure());
  }
}

export default all([
  takeLatest('@deliveryman/DELIVERYMAN_POST', deliverymanAdd),
]);
