import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  data: [],
};

export default function recipient(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipient/RECIPIENT_POST': {
        draft.loading = true;
        break;
      }
      case '@recipient/RECIPIENT_POST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@recipient/RECIPIENT_POST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@recipient/RECIPIENT_UPDATE': {
        draft.loading = true;
        break;
      }
      case '@recipient/RECIPIENT_UPDATE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@recipient/RECIPIENT_UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@recipient/RECIPIENT_DELETE': {
        draft.loading = true;
        break;
      }
      case '@recipient/RECIPIENT_DELETE_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      }
      case '@recipient/RECIPIENT_DELETE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
