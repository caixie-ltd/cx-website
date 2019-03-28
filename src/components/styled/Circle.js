import styled from 'styled-components'

import { Box } from '.'

const Circle = styled(Box)`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 99999px;
`

export default Circle
