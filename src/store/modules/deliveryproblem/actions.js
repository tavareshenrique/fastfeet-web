export function deliveryCancel(id) {
  return {
    type: '@deliveryproblem/DELIVERY_PROBLEM_CANCEL',
    payload: { id },
  };
}

export function deliveryCancelSuccess(data) {
  return {
    type: '@deliveryproblem/DELIVERY_PROBLEM_CANCEL_SUCCESS',
    payload: { data },
  };
}

export function deliveryCancelFailure() {
  return {
    type: '@deliveryproblem/DELIVERY_PROBLEM_CANCEL_FAILURE',
  };
}
