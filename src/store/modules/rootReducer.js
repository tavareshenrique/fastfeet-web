import { combineReducers } from 'redux';

import auth from './auth/reducer';
import search from './search/reducer';
import order from './order/reducer';
import deliveryman from './deliveryman/reducer';
import recipient from './recipient/reducer';
import deliveryproblem from './deliveryproblem/reducer';
import address from './address/reducer';

export default combineReducers({
  auth,
  search,
  order,
  deliveryman,
  recipient,
  deliveryproblem,
  address,
});
