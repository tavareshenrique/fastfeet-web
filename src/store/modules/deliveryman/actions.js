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

export function deliverymanDelete(id) {
  return {
    type: '@deliveryman/DELIVERYMAN_DELETE',
    payload: { id },
  };
}

export function deliverymanDeleteSuccess(data) {
  return {
    type: '@deliveryman/DELIVERYMAN_DELETE_SUCCESS',
    payload: { data },
  };
}

export function deliverymanDeleteFailure() {
  return {
    type: '@deliveryman/DELIVERYMAN_DELETE_FAILURE',
  };
}
