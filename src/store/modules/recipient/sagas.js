import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { removeChar } from '~/utils/removeChar';

import history from '~/services/history';
import api from '~/services/api';

import {
  recipientPostSuccess,
  recipientPostFailure,
  recipientDeleteSuccess,
  recipientDeleteFailure,
} from './actions';

export function* recipientAdd({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'recipients', data);

    toast.success('Destinatário(a) incluido com sucesso!');

    yield put(recipientPostSuccess());

    history.push('/recipients');
  } catch (err) {
    toast.error('Falha ao incluir uma destinatário(a)!');
    yield put(recipientPostFailure());
  }
}

export function* recipientDelete({ payload }) {
  try {
    const { id } = payload;

    const idFormatted = yield removeChar(id);

    yield call(api.delete, `recipients/${idFormatted}`);

    const data = yield call(api.get, 'recipients');

    toast.success('Destinatário(a) excluido(a) com sucesso!');

    yield put(recipientDeleteSuccess(data));

    history.push('/recipients');
  } catch (err) {
    toast.error(
      'Falha ao excluir um(a) destinatário(a), talvez exista encomendas atribuidas a esse destinatário, verifique!'
    );
    yield put(recipientDeleteFailure());
  }
}

export default all([
  takeLatest('@recipient/RECIPIENT_POST', recipientAdd),
  takeLatest('@recipient/RECIPIENT_DELETE', recipientDelete),
]);
