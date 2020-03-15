import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import order from './order/sagas';
import deliveryman from './deliveryman/sagas';

export default function* rootSaga() {
  return yield all([auth, order, deliveryman]);
}
