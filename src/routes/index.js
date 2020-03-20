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
import DeliverymenEdit from '~/pages/Deliverymen/DeliverymenEdit';
import RecipientsEdit from '~/pages/Recipients/RecipientsEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/orders/add" component={OrdersAdd} isPrivate />
      <Route path="/orders/edit/:id" component={OrdersEdit} isPrivate />
      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route path="/deliverymen/add" component={DeliverymenAdd} isPrivate />
      <Route
        path="/deliverymen/edit/:id"
        component={DeliverymenEdit}
        isPrivate
      />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/add" component={RecipientsAdd} isPrivate />
      <Route path="/recipients/edit/:id" component={RecipientsEdit} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
