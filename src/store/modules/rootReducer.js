import { combineReducers } from 'redux';

import auth from './auth/reducer';
import search from './search/reducer';
import order from './order/reducer';

export default combineReducers({
  auth,
  search,
  order,
});
