import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { translateErrorMessages } from 'fastfeet-translation-errors';
import { removeChar } from '~/utils/removeChar';

import history from '~/services/history';
import api from '~/services/api';

import {
  recipientPostSuccess,
  recipientPostFailure,
  recipientUpdateSuccess,
  recipientUpdateFailure,
  recipientDeleteSuccess,
  recipientDeleteFailure,
} from './actions';

export function* recipientPost({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'recipients', data);

    toast.success('Destinatário(a) incluido com sucesso!');

    yield put(recipientPostSuccess());

    history.push('/recipients');
  } catch (err) {
    toast.error(translateErrorMessages(err.response.data.error));
    yield put(recipientPostFailure());
  }
}

export function* recipientUpdate({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `recipients/${id}`, data);

    toast.success('Destinatário(a) alterado(a) com sucesso!');

    yield put(recipientUpdateSuccess());

    history.push('/recipients');
  } catch (err) {
    toast.error(translateErrorMessages(err.response.data.error));
    yield put(recipientUpdateFailure());
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
    toast.error(translateErrorMessages(err.response.data.error));
    yield put(recipientDeleteFailure());
  }
}

export default all([
  takeLatest('@recipient/RECIPIENT_POST', recipientPost),
  takeLatest('@recipient/RECIPIENT_UPDATE', recipientUpdate),
  takeLatest('@recipient/RECIPIENT_DELETE', recipientDelete),
]);
