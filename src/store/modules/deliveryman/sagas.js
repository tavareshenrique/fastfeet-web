import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { removeChar } from '~/utils/removeChar';

import history from '~/services/history';
import api from '~/services/api';

import {
  deliverymanPostSuccess,
  deliverymanPostFailure,
  deliverymanDeleteSuccess,
  deliverymanDeleteFailure,
} from './actions';

export function* deliverymanAdd({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'deliverymen', data);

    toast.success('Entregador(a) incluido com sucesso!');

    yield put(deliverymanPostSuccess());

    history.push('/deliverymen');
  } catch (err) {
    toast.error('Falha ao incluir uma entregador(a)!');
    yield put(deliverymanPostFailure());
  }
}

export function* deliverymanDelete({ payload }) {
  try {
    const { id } = payload;

    const idFormatted = yield removeChar(id);

    yield call(api.delete, `deliverymen/${idFormatted}`);

    const data = yield call(api.get, 'deliverymen');

    toast.success('Entregador(a) excluido(a) com sucesso!');

    yield put(deliverymanDeleteSuccess(data));

    history.push('/deliverymen');
  } catch (err) {
    toast.error('Falha ao excluir uma Entregador(a)!');
    yield put(deliverymanDeleteFailure());
  }
}

export default all([
  takeLatest('@deliveryman/DELIVERYMAN_POST', deliverymanAdd),
  takeLatest('@deliveryman/DELIVERYMAN_DELETE', deliverymanDelete),
]);
