import styled from 'styled-components'
import system from 'system-components'

export const Box = system(
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'display',
  'space',
  'fontSize',
  'color',
  'zIndex',
  'boxShadow',
  'space',

  // position
  'position',
  'top',
  'bottom',
  'left',
  'right',

  // borders
  'borders',
  'borderColor',
  'borderRadius',

  // flexbox
  'flexDirection',
  'alignItems',
  'flexWrap',
  'alignItems',
  'justifyContent',
  'flex',
  'order',
  'alignSelf',
  'justifySelf'
)

Box.Border = styled(Box)`
  border: 2px solid;
  border-color: black;
`

Box.displayName = 'Box'

export default Box
