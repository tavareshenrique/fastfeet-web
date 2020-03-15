export function deliverymanPost(data) {
  return {
    type: '@deliveryman/DELIVERYMAN_POST',
    payload: { data },
  };
}

export function deliverymanPostSuccess() {
  return {
    type: '@deliveryman/DELIVERYMAN_POST_SUCCESS',
  };
}

export function deliverymanPostFailure() {
  return {
    type: '@deliveryman/DELIVERYMAN_POST_FAILURE',
  };
}
