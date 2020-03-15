import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { orderPostSuccess, orderPostFailure } from './actions';

export function* ordersAdd({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'orders', data);

    yield put(orderPostSuccess());

    history.push('/orders');
  } catch (err) {
    toast.error('Falha ao incluir uma encomenda!');
    yield put(orderPostFailure());
  }
}

export default all([takeLatest('@order/ORDER_POST', ordersAdd)]);
