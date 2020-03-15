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
