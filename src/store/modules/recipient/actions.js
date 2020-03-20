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

export function recipientUpdate(id, data) {
  return {
    type: '@recipient/RECIPIENT_UPDATE',
    payload: { id, data },
  };
}

export function recipientUpdateSuccess() {
  return {
    type: '@recipient/RECIPIENT_UPDATE_SUCCESS',
  };
}

export function recipientUpdateFailure() {
  return {
    type: '@recipient/RECIPIENT_UPDATE_FAILURE',
  };
}

export function recipientDelete(id) {
  return {
    type: '@recipient/RECIPIENT_DELETE',
    payload: { id },
  };
}

export function recipientDeleteSuccess(data) {
  return {
    type: '@recipient/RECIPIENT_DELETE_SUCCESS',
    payload: { data },
  };
}

export function recipientDeleteFailure() {
  return {
    type: '@recipient/RECIPIENT_DELETE_FAILURE',
  };
}
