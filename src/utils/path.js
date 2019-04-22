import constants from '../constants'

export function cleanOrigin(path) {
  let origin = window.location.cleanOrigin
  if (constants.urls.SITE !== '') {
    origin = constants.urls.SITE
  }
  const clean = path.replace(origin, '')
  if (clean.startsWith('/')) {
    return clean
  }
  return `/${clean}`
}
export function checkEmpty (el) {
  return el !== undefined
}



// WEBPACK FOOTER //
// src/utils/path.js
