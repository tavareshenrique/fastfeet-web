import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  data: [],
};

export default function deliveryCancel(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryproblem/DELIVERY_PROBLEM_CANCEL': {
        draft.loading = true;
        break;
      }
      case '@deliveryproblem/DELIVERY_PROBLEM_CANCEL_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      }
      case '@deliveryproblem/DELIVERY_PROBLEM_CANCEL_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
