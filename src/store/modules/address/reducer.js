import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  data: [],
};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@address/ADDRESS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@address/ADDRESS_REQUEST_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      }
      case '@address/ADDRESS_REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@address/RESET_ADDRESS': {
        draft.data = [];
        break;
      }
      default:
    }
  });
}
