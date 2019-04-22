import axios from 'axios'
import * as types from './types'
import constants from '../constants'
import * as loader from './loading'

export function getDataPage(slugPage) {
  const params = {
    params: {
      slug: slugPage,
    },
  }
  const content = []
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_PAGE, params)
        .then((response) => {
          const data = response.data[0]
          content[slugPage] = data
          loader.setStatus(false)
          if (data !== undefined && data.related_list_item !== undefined && data.related_list_item.length > 0) {
            const archive = data.related_list_item
            dispatch({
              type: types.PAGE_ADD_ARCHIVE_CATEGORY,
              list: archive,
            })
          }
          dispatch({
            type: types.PAGE_ADD_CONTENT,
            content,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}

export function getDataPost(slugPage) {
  const params = {
    params: {
      slug: slugPage,
    },
  }
  const content = []
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_POST, params)
        .then((response) => {
          const data = response.data[0]
          content[slugPage] = data
          loader.setStatus(false)
          dispatch({
            type: types.PAGE_ADD_POST,
            content,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function getListPost(numItem = 100, paged = 1) {
  const params = {
    params: {
      order: 'desc',
      orderby: 'date',
      per_page: numItem * paged,
    },
  }
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_POST, params)
        .then((response) => {
          // loader.setStatus(false)
          const listPost = []
          listPost.post = response.data.map((value) => {
            const content = []
            content[value.slug] = value
            dispatch({
              type: types.PAGE_ADD_POST,
              content,
            })
            return value.slug
          })
          listPost.postTotal = response.headers['x-wp-total']
          listPost.postPage = Math.ceil(response.headers['x-wp-total'] / numItem)
          dispatch({
            type: types.PAGE_LIST_CONTENT,
            list: listPost,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function getDataCPT(cpt, slugPage) {
  let params = {}
  if (slugPage !== '') {
    params = {
      params: {
        slug: slugPage,
      },
    }
  }
  const content = []
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${constants.urls.API_URL}/${cpt}`, params)
        .then((response) => {
          const data = response.data[0]
          content[slugPage] = data
          loader.setStatus(false)
          dispatch({
            type: types.PAGE_ADD_CONTENT,
            content,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function getListCPT(cpt, num_item = 100) {
  const params = {
    params: {
      order: 'asc',
      orderby: 'menu_order',
      per_page: num_item,
    },
  }
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${constants.urls.API_URL}/${cpt}`, params)
        .then((response) => {
          // loader.setStatus(false)
          const listPost = []
          listPost[`${cpt}`] = response.data.map((value) => {
            const content = []
            content[value.slug] = value
            dispatch({
              type: types.PAGE_ADD_CONTENT,
              content,
            })
            return value.slug
          })
          dispatch({
            type: types.PAGE_LIST_CONTENT,
            list: listPost,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function getThisPages(list = 0, num_item = 100) {
  const params = {
    params: {
      order: 'asc',
      orderby: 'menu_order',
      per_page: num_item,
      include: list,
    },
  }
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_PAGE, params)
        .then((response) => {
          // loader.setStatus(false)
          response.data.map((value) => {
            const content = []
            content[value.slug] = value
            dispatch({
              type: types.PAGE_ADD_CONTENT,
              content,
            })
            return false
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function getThisCPT(cpt, list = 0, num_item = 100) {
  const params = {
    params: {
      order: 'asc',
      orderby: 'menu_order',
      per_page: num_item,
      include: list,
    },
  }
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${constants.urls.API_URL}/${cpt}`, params)
        .then((response) => {
          // loader.setStatus(false)
          const listPost = []
          listPost[`${cpt}`] = response.data.map((value) => {
            const content = []
            content[value.slug] = value
            dispatch({
              type: types.PAGE_ADD_CONTENT,
              content,
            })
            return value.slug
          })
          dispatch({
            type: types.PAGE_LIST_CONTENT,
            list: listPost,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function getMedia(numItem = 100, paged = 1) {
  const params = {
    params: {
      per_page: numItem,
      page: paged,
    },
  }
  return (dispatch, getState) => {
    // return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(constants.urls.API_MEDIA, params)
        .then((response) => {
          const media = []
          response.data.forEach((value) => {
            media[value.id] = value
          })
          dispatch({
            type: types.PAGE_ADD_MEDIA,
            data: media,
          })
          const { loading } = getState()
          dispatch({
            type: types.LOADING_SET_INC_STATUS,
            setIncrementalStatus: loading.incremental + 1,
          })
          // window.console.log({
          //   'total::': response.headers['x-wp-total'],
          //   'numItem::': numItem,
          //   'paged::': paged,
          // })
          if (response.headers['x-wp-total'] > numItem * paged) {
            dispatch(getMedia(numItem, paged + 1))
          }
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}

export function getDataForm(idForm) {
  const content = []
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${constants.urls.API_FORM}/${idForm}`)
        .then((response) => {
          const { data } = response
          content[idForm] = data
          dispatch({
            type: types.PAGE_ADD_FORM,
            content,
          })
          const result = {
            status: '',
            message: '',
          }
          dispatch({
            type: types.PAGE_STATUS_FORM,
            result,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function sendForm(idForm, params) {
  const paramSafe = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&')
  const headers = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${constants.urls.API_CF7}/${idForm}/feedback`, paramSafe, headers)
        .then((response) => {
          const { data } = response
          const result = {
            status: 'error',
            message: data.message,
          }
          if (data.status === 'mail_sent') {
            result.status = 'success'
          }
          dispatch({
            type: types.PAGE_STATUS_FORM,
            result,
          })
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  }
}
export function resetForm() {
  return (dispatch) => {
    const result = {
      status: '',
      message: '',
    }
    dispatch({
      type: types.PAGE_STATUS_FORM,
      result,
    })
  }
}
// export function setTitleValue(val) {
//   return (dispatch) => {
//     const result = {
//       value: val,
//     }
//     dispatch({
//       type: types.PAGE_TITLE_VALUE,
//       value: result,
//     })
//   }
// }
export function setTitleValue(val) {
  const result = {
    value: val,
    animation: true,
  }
  return {
    type: types.PAGE_TITLE_VALUE,
    value: result,
  }
}
export function setTitleBlend(val) {
  const result = {
    blend: val,
  }
  return {
    type: types.PAGE_TITLE_BLEND,
    blend: result,
  }
}
export function setTitleLink(val, l = '') {
  const result = {
    link: val,
    label: l,
  }
  return {
    type: types.PAGE_TITLE_LINK,
    link: result,
  }
}
export function setTitleAnimation(val) {
  const result = {
    animation: val,
  }
  return {
    type: types.PAGE_TITLE_ANIMATION,
    animation: result,
  }
}
export function setPageTitleValue(string) {
  const result = {
    value: string,
  }
  return {
    type: types.PAGE_PAGETITLE_VALUE,
    value: result,
  }
}



// WEBPACK FOOTER //
// src/actions/page.js
