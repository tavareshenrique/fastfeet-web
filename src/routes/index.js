import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Orders from '~/pages/Orders';
import Deliverymen from '~/pages/Deliverymen';
import Recipients from '~/pages/Recipients';
import Problems from '~/pages/Problems';

import OrdersAdd from '~/pages/Orders/ordersAdd';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/orders/add" component={OrdersAdd} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
