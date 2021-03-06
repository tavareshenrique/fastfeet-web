export function orderPost(data) {
  return {
    type: '@order/ORDER_POST',
    payload: { data },
  };
}

export function orderPostSuccess() {
  return {
    type: '@order/ORDER_POST_SUCCESS',
  };
}

export function orderPostFailure() {
  return {
    type: '@order/ORDER_POST_FAILURE',
  };
}

export function orderUpdate(id, data) {
  return {
    type: '@order/ORDER_UPDATE',
    payload: { id, data },
  };
}

export function orderUpdateSuccess() {
  return {
    type: '@order/ORDER_UPDATE_SUCCESS',
  };
}

export function orderUpdateFailure() {
  return {
    type: '@order/ORDER_UPDATE_FAILURE',
  };
}

export function orderDelete(id) {
  return {
    type: '@order/ORDER_DELETE',
    payload: { id },
  };
}

export function orderDeleteSuccess(data) {
  return {
    type: '@order/ORDER_DELETE_SUCCESS',
    payload: { data },
  };
}

export function orderDeleteFailure() {
  return {
    type: '@order/ORDER_DELETE_FAILURE',
  };
}
