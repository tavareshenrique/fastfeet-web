export function requestAddress(zipcode) {
  return {
    type: '@address/ADDRESS_REQUEST',
    payload: { zipcode },
  };
}

export function requestAddressSuccess(data) {
  return {
    type: '@address/ADDRESS_REQUEST_SUCCESS',
    payload: { data },
  };
}

export function requestAddressFailure() {
  return {
    type: '@address/ADDRESS_REQUEST_FAILURE',
  };
}

export function resetAddress() {
  return {
    type: '@address/RESET_ADDRESS',
  };
}
