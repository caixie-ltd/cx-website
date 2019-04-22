import axios from 'axios'
import * as types from './types'
import constants from '../constants'

export function setOpen(bool) {
  return {
    type: types.NAV_SET_OPEN,
    setOpen: bool,
  }
}
export function getMainMenu() {
  return (dispatch, getState) => {
    // window.console.log(dispatch({}))
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_MAIN_MENU)
        .then((response) => {
          dispatch({
            type: types.NAV_GET_MAIN,
            data: response.data,
          })
          const { loading } = getState()
          dispatch({
            type: types.LOADING_SET_INC_STATUS,
            setIncrementalStatus: loading.incremental + 1,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function getMobileMenu() {
  return (dispatch) => {
    // window.console.log(dispatch({}))
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_MOBILE_MENU)
        .then((response) => {
          dispatch({
            type: types.NAV_GET_MOBILE,
            data: response.data,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}



// WEBPACK FOOTER //
// src/actions/nav.js
