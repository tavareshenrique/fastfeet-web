import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryman/DELIVERYMAN_POST': {
        draft.loading = true;
        break;
      }
      case '@deliveryman/DELIVERYMAN_POST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@deliveryman/DELIVERYMAN_POST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
