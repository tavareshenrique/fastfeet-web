import produce from 'immer';

const INITIAL_STATE = {
  searchWord: '',
};

export default function search(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@search/SEARCH_WORD': {
        draft.searchWord = action.payload.searchField;
        break;
      }

      default:
    }
  });
}
