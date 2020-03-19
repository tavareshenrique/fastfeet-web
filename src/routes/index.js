import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Orders from '~/pages/Orders';
import Deliverymen from '~/pages/Deliverymen';
import Recipients from '~/pages/Recipients';
import Problems from '~/pages/Problems';

import OrdersAdd from '~/pages/Orders/OrdersAdd';
import DeliverymenAdd from '~/pages/Deliverymen/DeliverymenAdd';
import RecipientsAdd from '~/pages/Recipients/RecipientsAdd';

import OrdersEdit from '~/pages/Orders/OrdersEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/orders/add" exact component={OrdersAdd} isPrivate />
      <Route path="/orders/edit/:id" exact component={OrdersEdit} isPrivate />
      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route path="/deliverymen/add" component={DeliverymenAdd} isPrivate />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/add" component={RecipientsAdd} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
