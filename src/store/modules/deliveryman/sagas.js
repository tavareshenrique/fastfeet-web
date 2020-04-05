import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { translateErrorMessages } from 'fastfeet-translation-errors';
import { removeChar } from '~/utils/removeChar';

import history from '~/services/history';
import api from '~/services/api';

import {
  deliverymanPostSuccess,
  deliverymanPostFailure,
  deliverymanUpdateSuccess,
  deliverymanUpdateFailure,
  deliverymanDeleteSuccess,
  deliverymanDeleteFailure,
} from './actions';

export function* deliverymanPost({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'deliverymen', data);

    toast.success('Entregador(a) incluido com sucesso!');

    yield put(deliverymanPostSuccess());

    history.push('/deliverymen');
  } catch (err) {
    toast.error(translateErrorMessages(err.response.data.error));
    yield put(deliverymanPostFailure());
  }
}

export function* deliverymanUpdate({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `deliverymen/${id}`, data);

    toast.success('Entregador(a) alterado(a) com sucesso!');

    yield put(deliverymanUpdateSuccess());

    history.push('/deliverymen');
  } catch (err) {
    toast.error(translateErrorMessages(err.response.data.error));
    yield put(deliverymanUpdateFailure());
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
    toast.error(translateErrorMessages(err.response.data.error));
    yield put(deliverymanDeleteFailure());
  }
}

export default all([
  takeLatest('@deliveryman/DELIVERYMAN_POST', deliverymanPost),
  takeLatest('@deliveryman/DELIVERYMAN_UPDATE', deliverymanUpdate),
  takeLatest('@deliveryman/DELIVERYMAN_DELETE', deliverymanDelete),
]);
