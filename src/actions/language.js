import axios from 'axios'
import * as types from './types'
import constants from '../constants'

export function getString() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_STRING)
        .then((response) => {
          dispatch({
            type: types.STRING_GET_ALL,
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
// src/actions/language.js
