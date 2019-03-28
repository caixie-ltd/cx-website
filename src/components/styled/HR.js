import React from 'react'
import styled from 'styled-components'
import { space, maxWidth } from 'styled-system'

import { colors } from './theme'

export const HR = styled(props => (
  <svg width="100%" height="1" viewBox="0 0 1200 1" fill="none" {...props}>
    <line
      y1="0.5"
      x2="1200"
      y2="0.5"
      stroke={colors.gray1}
      strokeDasharray="1 2"
    />
  </svg>
))`
  margin-bottom: 48px;
  ${space};
  ${maxWidth};
`

export default HR
