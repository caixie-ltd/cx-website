import { Power4, TweenLite } from "gsap"
import "gsap/ScrollToPlugin";
const _toConsumableArray = (arr) => {
  if (Array.isArray(arr)) {
    let arr2 = Array(arr.length)
    for (let i = 0; i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
  return Array.from(arr)
}

export const $ = function(t, context) {
  return t.querySelector(context)
}

export const $$ = function(context, query) {
  return [].concat(_toConsumableArray(context.querySelectorAll(query)))
}

export const delay = function(delay) {
  return new Promise((_nexEventFunc) => {
    return setTimeout(_nexEventFunc, delay)
  })
}

export const toArray = function(val) {
  return Array.isArray(val) ? val : [val]
}

export const $on = function(type, el, eventHandler) {
  return toArray(type).forEach((events) => {
    return events.addEventListener(el, eventHandler)
  })
}

export const $off = function(type, event, callback) {
  return toArray(type).forEach((session) => {
    return session.removeEventListener(event, callback)
  })
}

export const debounce = function(fn) {
  const _SERVICE_TAKING_TOO_LONG = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
  let _takingTooLongTimeout = void 0
  return function() {
    let intfName = this
    /** @type {number} */
    let _len = arguments.length
    /** @type {!Array} */
    let args = Array(_len)
    /** @type {number} */
    let _key = 0
    for (; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    clearTimeout(_takingTooLongTimeout)
    /** @type {number} */
    _takingTooLongTimeout = setTimeout(function() {
      fn.call.apply(fn, [intfName].concat(args))
    }, _SERVICE_TAKING_TOO_LONG)
  }
}

export const anchorScroll = function(fixedMapY) {
  // console.log(fixedMapY.getBoundingClientRect())
  // console.log(fixedMapY)
  // TweenLite.to(window, .8, {
  //   scrollTo: {
  //     y: fixedMapY,
  //     autoKill: false,
  //   },
  //   ease: Power4.easeOut,
  // })
}
