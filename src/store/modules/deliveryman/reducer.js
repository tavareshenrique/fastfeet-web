import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  data: [],
};

export default function deliveryman(state = INITIAL_STATE, action) {
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
      case '@deliveryman/DELIVERYMAN_UPDATE': {
        draft.loading = true;
        break;
      }
      case '@deliveryman/DELIVERYMAN_UPDATE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@deliveryman/DELIVERYMAN_UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@deliveryman/DELIVERYMAN_DELETE': {
        draft.loading = true;
        break;
      }
      case '@deliveryman/DELIVERYMAN_DELETE_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      }
      case '@deliveryman/DELIVERYMAN_DELETE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
