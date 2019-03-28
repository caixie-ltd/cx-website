export const breakpoints = ['736px', '1004px', '1200px', '1600px']

export const space = [
  '0rem',
  '0.25rem',
  '0.5rem',
  '0.875rem',
  '1rem',
  '1.5rem',
  '2rem',
  '4rem',
  '6rem',
  '8rem',
  '16rem',
  '32rem'
]

export const fonts = {
  dawn: '"Georgia"',
  sans: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Helvetica',
    'sans-serif'
  ].join(', '),
  mono: [
    '"SFMono-Regular"',
    'Consolas',
    '"Liberation Mono"',
    'Menlo',
    'Courier',
    'monospace'
  ].join(', ')
}

export const fontSizes = [
  '0.75rem',
  '0.875rem',
  '1rem',
  '1.375rem',
  '1.5rem',
  '2rem',
  '2.75rem'
]

export const fontWeights = { normal: 400, medium: 500, bold: 700 }

export const lineHeights = {
  none: 1,
  normal: 1.2,
  loose: 1.5
}

export const colors = {
  black: '#000',
  cardinal: '#C5050C',
  blue: '#2AA3EF',
  blueLink: '#179bee',
  green: '#21C97B',
  orange: '#FDAD2A',
  yellow: '#FFF72B',
  purple: '#8D65F2',
  red: '#ED3A5B',
  salmon: '#F98FA6',
  gray0: '#F2F2F2',
  gray1: '#8F8F8F',
  gray2: '#777777'
}

export const borders = [0, '1px solid', `2px solid black`, '3px solid']

export const radii = [0, 2, 4, '4px 4px 0px 0px']

export const shadows = [
  'none',
  '0px 5px 8px -6px #A2B1C6',
  '0 0 0 1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)',
  `0 0 0 2px ${colors.gray2}`,
  '0px 2px 6px rgba(189, 189, 189, 0.3)'
]

const theme = {
  breakpoints,
  space,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  colors,
  borders,
  radii,
  shadows
}

export default theme
