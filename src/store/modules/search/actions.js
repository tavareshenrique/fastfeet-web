export function searchWord(searchField) {
  return {
    type: '@search/SEARCH_WORD',
    payload: { searchField },
  };
}
