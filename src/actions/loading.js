import * as types from './types'

export function setStatus(bool) {
  return {
    type: types.LOADING_SET_STATUS,
    setStatus: bool,
  }
}

export function setIncrementalStatus(state) {
  return {
    type: types.LOADING_SET_INC_STATUS,
    setIncrementalStatus: state,
  }
}
export function setFirstLoad(bool) {
  return {
    type: types.LOADING_FIRST_LOAD,
    setStatus: bool,
  }
}



// WEBPACK FOOTER //
// src/actions/loading.js
