import * as types from './types'

export function setOpen(bool) {
  return {
    type: types.MODAL_SET_OPEN,
    setOpen: bool,
  }
}

export function setImage(image) {
  return {
    type: types.MODAL_SET_IMAGE,
    setImage: image,
  }
}



// WEBPACK FOOTER //
// src/actions/modal.js
