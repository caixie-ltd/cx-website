import styled from 'styled-components'
import { themeGet } from 'styled-system'

export const LI = styled.li`
  position: relative;
  font-family: ${themeGet('fonts.sans')};
  font-size: ${({ fontSize }) => fontSize || themeGet('fontSizes.3')};
  padding-left: 1rem;
  line-height: 1.4;
  list-style: none;
  margin-bottom: 0.375rem;
  &:before {
    content: '';
    position: absolute;
    top: 12px;
    left: 0;
    height: 4px;
    width: 4px;
    border-radius: 100%;
    background: ${themeGet('colors.black')};
  }
`
export default LI
