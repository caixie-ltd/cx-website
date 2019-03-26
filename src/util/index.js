import _ from 'lodash'
// import * as transitions from './transitions'
// import * as template from './template'

export const isView = views => {
  let currentViews = Array.from(document.body.classList)
  currentViews.unshift('*')
  return views.some(view => _.includes(currentViews, view))
}

export const getRandomIntFromMinMax = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getRandomFromArray = (arr) => _.sample(_.shuffle(arr))

export const hexToRGBA = (hex, alpha = 1) => {
  const trimHex = hex => {
    return hex.replace('#', '')
  }

  let red = parseInt(trimHex(hex).substring(0, 2), 16)
  let green = parseInt(trimHex(hex).substring(2, 4), 16)
  let blue = parseInt(trimHex(hex).substring(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export default {
  // transitions,
  // template,
  getRandomFromArray,
  getRandomIntFromMinMax,
  hexToRGBA
}
