import React from 'react'
import system from 'system-components'

const Heading = system(
  {
    is: 'h1',
    fontFamily: 'sans',
    fontSize: 6,
    fontWeight: 'normal',
    lineHeight: 'normal',
    m: 0
  },
  'fontFamily',
  'textAlign',
  'width',
  'maxWidth',
  'color'
)

Heading.displayName = 'Heading'

Heading.h1 = props => <Heading is="h1" lineHeight={1.2} {...props} />
Heading.h2 = props => (
  <Heading is="h2" fontSize={5} fontWeight="medium" {...props} />
)
Heading.h3 = props => (
  <Heading is="h3" fontSize={3} fontWeight="bold" {...props} />
)
Heading.h4 = props => (
  <Heading is="h4" fontSize={3} fontWeight="bold" {...props} />
)
Heading.h5 = props => (
  <Heading is="h5" fontSize={3} fontWeight="bold" {...props} />
)

export default Heading
