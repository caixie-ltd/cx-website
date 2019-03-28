import React from 'react'
import system from 'system-components'

const Text = system(
  {
    is: 'span',
    fontFamily: 'sans',
    fontSize: 2,
    fontWeight: '400',
    lineHeight: 'normal',
    m: 0
  },
  'fontSize',
  'fontFamily',
  'fontWeight',
  'textAlign',
  'color',
  'display',
  'space',
  'opacity',
  'width',
  'maxWidth'
)

Text.p = system(
  {
    is: 'p',
    fontFamily: 'sans',
    fontSize: 3,
    fontWeight: '400',
    lineHeight: 1.5,
    m: 0
  },
  'display',
  'fontSize',
  'fontFamily',
  'fontWeight',
  'textAlign',
  'lineHeight',
  'color',
  'width'
)

Text.detail = props => (
  <Text color="gray1" {...props}>
    {props.children}
  </Text>
)

Text.subheader = props => (
  <Text lineHeight={1.4} fontSize={4} color="gray2" {...props}>
    {props.children}
  </Text>
)

Text.error = props => (
  <Text lineHeight={1.4} fontSize={0} color="red" {...props}>
    {props.children}
  </Text>
)

Text.displayName = 'Text'
export default Text
