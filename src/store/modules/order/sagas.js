import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { removeChar } from '~/utils/removeChar';

import history from '~/services/history';
import api from '~/services/api';

import {
  orderPostSuccess,
  orderPostFailure,
  orderDeleteSuccess,
  orderDeleteFailure,
} from './actions';

export function* ordersAdd({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'orders', data);

    toast.success('Encomenda incluido com sucesso!');

    yield put(orderPostSuccess());

    history.push('/orders');
  } catch (err) {
    toast.error('Falha ao incluir uma encomenda!');
    yield put(orderPostFailure());
  }
}

export function* ordersDelete({ payload }) {
  try {
    const { id } = payload;

    const idFormatted = yield removeChar(id);

    yield call(api.delete, `orders/${idFormatted}`);

    const data = yield call(api.get, `orders`);

    toast.success('Encomenda excluida com sucesso!');

    yield put(orderDeleteSuccess(data));

    history.push('/orders');
  } catch (err) {
    toast.error('Falha ao excluir uma encomenda!');
    yield put(orderDeleteFailure());
  }
}

export default all([
  takeLatest('@order/ORDER_POST', ordersAdd),
  takeLatest('@order/ORDER_DELETE', ordersDelete),
]);
