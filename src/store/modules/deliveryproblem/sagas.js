import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { removeChar } from '~/utils/removeChar';

import history from '~/services/history';
import api from '~/services/api';

import { deliveryCancelSuccess, deliveryCancelFailure } from './actions';

export function* deliveryCancel({ payload }) {
  try {
    const { id } = payload;

    const idFormatted = yield removeChar(id);

    yield call(api.delete, `delivery/${idFormatted}/cancel-delivery`);

    const data = yield call(api.get, 'delivery/problems');

    toast.success('Encomenda cancelada com sucesso!');

    yield put(deliveryCancelSuccess(data));

    history.push('/problems');
  } catch (err) {
    toast.error('Falha ao cancelar a encomenda!');
    yield put(deliveryCancelFailure());
  }
}

export default all([
  takeLatest('@deliveryproblem/DELIVERY_PROBLEM_CANCEL', deliveryCancel),
]);
