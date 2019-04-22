import axios from 'axios'
import * as types from './types'
import constants from '../constants'


export function getRouting() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_ROUTING)
        .then((response) => {
          dispatch({
            type: types.ROUTING_ADD,
            content: response.data,
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
// src/actions/routing.js
