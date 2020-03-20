import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import order from './order/sagas';
import deliveryman from './deliveryman/sagas';
import recipient from './recipient/sagas';
import deliveryproblem from './deliveryproblem/sagas';
import address from './address/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    order,
    deliveryman,
    recipient,
    deliveryproblem,
    address,
  ]);
}
