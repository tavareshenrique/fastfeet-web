import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
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

      default:
    }
  });
}
