export function recipientPost(data) {
  return {
    type: '@recipient/RECIPIENT_POST',
    payload: { data },
  };
}

export function recipientPostSuccess() {
  return {
    type: '@recipient/RECIPIENT_POST_SUCCESS',
  };
}

export function recipientPostFailure() {
  return {
    type: '@recipient/RECIPIENT_POST_FAILURE',
  };
}
