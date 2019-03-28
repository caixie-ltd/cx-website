import React from 'react'
import { Box } from './index'

export const Flex = ({ children, ...rest }) => (
  <Box display="flex" {...rest}>
    {children}
  </Box>
)

Flex.displayName = 'Flex'

export const Row = ({ children, flexDirection, reverse, ...rest }) => (
  <Flex
    flexDirection={flexDirection || (reverse ? 'row-reverse' : 'row')}
    {...rest}
  >
    {children}
  </Flex>
)

export const Column = ({ children, flexDirection, reverse, ...rest }) => (
  <Flex
    flexDirection={flexDirection || (reverse ? 'column-reverse' : 'column')}
    {...rest}
  >
    {children}
  </Flex>
)

export default Flex
