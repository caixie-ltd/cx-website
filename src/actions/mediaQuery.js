import * as types from './types'

export function setQuery(state) {
  return {
    type: types.MEDIA_QUERIES_SET,
    setQuery: state,
  }
}

export function setQueryKey(state) {
  return {
    type: types.MEDIA_QUERIES_SET_KEY,
    setQueryKey: state,
  }
}



// WEBPACK FOOTER //
// src/actions/mediaQuery.js
