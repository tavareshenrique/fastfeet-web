import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { recipientPostSuccess, recipientPostFailure } from './actions';

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

export default all([takeLatest('@recipient/RECIPIENT_POST', recipientAdd)]);
