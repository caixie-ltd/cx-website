import * as types from './types'

export function setPointerProgressTime(amount) {
  return {
    type: types.POINTER_PROGRESS_TIME,
    setPointerProgressTime: amount,
  }
}
export function setHover(bool) {
  return (dispatch, getState) => {
    const { pointer } = getState()
    if (bool) {
      dispatch({
        type: types.POINTER_HOVER,
        setHover: pointer.hover + 1,
      })
    } else if (pointer.hover > 0) {
      // if (pointer.hover === 1) {
      //   dispatch({
      //     type: types.POINTER_LABEL,
      //     setLabel: '',
      //   })
      // }
      dispatch({
        type: types.POINTER_HOVER,
        setHover: pointer.hover - 1,
      })
    }
  }
}
export function removeHover() {
  return {
    type: types.POINTER_HOVER,
    setHover: 0,
  }
}
export function setIcon(icon, label) {
  return (dispatch) => {
    if (label !== undefined) {
      dispatch({
        type: types.POINTER_LABEL,
        setLabel: label,
      })
    }
    dispatch({
      type: types.POINTER_ICON,
      setIcon: icon,
    })
  }
}
export function setLabel(string) {
  return {
    type: types.POINTER_LABEL,
    setLabel: string,
  }
}



// WEBPACK FOOTER //
// src/actions/pointer.js
