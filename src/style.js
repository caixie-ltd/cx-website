import hexToRgba from 'hex-rgba'
import generateBreakPoints from 'react-jss-grid/utils/breakpoints'
import constants from './constants'

const logo = {
  width: 180,
  height: 40,
}
const aside = 220

export const sizes = {
  xs: 575,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
}
const media = {
  xs: `@media (max-width: ${sizes.sm - 1}px)`,
  sm: `@media (min-width: ${sizes.sm}px)`,
  md: `@media (min-width: ${sizes.md}px)`,
  lg: `@media (min-width: ${sizes.lg}px)`,
  xl: `@media (min-width: ${sizes.xl}px)`,
  xxl: `@media (min-width: ${sizes.xxl}px)`,
}
const mediaInverse = {
  xs: `@media (max-width: ${sizes.sm - 1}px)`,
  sm: `@media (max-width: ${sizes.md - 1}px)`,
  md: `@media (max-width: ${sizes.lg - 1}px)`,
  lg: `@media (max-width: ${sizes.xl - 1}px)`,
  xl: `@media (max-width: ${sizes.xxl - 1}px)`,
  xxl: `@media (min-width: ${sizes.xxl}px)`,
}

function supportPassive() {
  let passiveIfSupported = false
  try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', { get: () => passiveIfSupported = { passive: true } }))
  } catch (err) {
    // window.console.log('error:: passive event')
  }
  return passiveIfSupported
}

export const theme = {
  IMAGE_URL: `${constants.urls.SITE}wp-content/themes/sterling/images/`,
  media,
  mediaInverse,
  detect: {
    hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
    hasPointer: !!window.navigator.msPointerEnabled,
    hasTouch: 'ontouchstart' in document,
    passive: supportPassive(),
  },
  padding: [0, '8%'],
  paddingMobile: 30,
  header: {
    top: 48,
    height: 44,
    spacing: [50, 60],
    spacingMobile: [30, 30],
    logo,
  },
  fonts: [
    'acumin-pro,sans-serif',
    '"Cutive Mono", monospace',
  ],
  colors: [
    '#23212c', // background // Verde: #205155 // Viola: #23212c
    '#FFFFFF', // bianco
    '#604bb7', // rosa per background verde: #eab194 // Rosa per background viola: #f4b697
    '#000',
    '#C5AA8E', // Alvarez altri pre-esistenti
    '#5a5a5a', // #5
    '#ededed',
    '#ae9b8b', // Gold Light
    '#111111',
    '#f4f4f4',
    '#817059', // #10  Gold
    '#a79c8e', // #11 bg menu
    '#b2b2b2', // #12 light color menu
    '#4c407b', // #13 background news
  ],
  archiveColor: '#C5AA8E',
  archiveOpacity: 0.3,
  home: {
    aside,
  },
  title: {
    width: '39.5vw',
    height: '2.3em',
    left: '56%',
    sizeDefault: 9.5,
    sizeUpdated: 9.5,
  },
  icon: {
    size: 56,
    sizeSmall: 44,
  },
  animations: {
    ease: 'cubic-bezier(0.650, 0.075, 0.400, 0.935)',
    time: '0.6s',
  },
  getRgba: (color, opacity) => hexToRgba(color, opacity * 100),
  breakpoints: generateBreakPoints({
    values: sizes,
  }),
}


