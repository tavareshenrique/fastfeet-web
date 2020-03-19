import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  data: [],
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@order/ORDER_POST': {
        draft.loading = true;
        break;
      }
      case '@order/ORDER_POST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@order/ORDER_POST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@order/ORDER_UPDATE': {
        draft.loading = true;
        break;
      }
      case '@order/ORDER_UPDATE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@order/ORDER_UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@order/ORDER_DELETE': {
        draft.loading = true;
        break;
      }
      case '@order/ORDER_DELETE_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      }
      case '@order/ORDER_DELETE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
