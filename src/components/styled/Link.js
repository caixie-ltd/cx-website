import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import styled, { css } from 'styled-components'
import {
  display,
  space,
  width,
  color,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  border,
  borderRadius,
  justifyContent,
  alignItems
} from 'styled-system'
import { breakpoints, fonts } from './theme'

const Link = styled(props =>
  props.to ? (
    <GatsbyLink
      onClick={props.onClick}
      className={props.className}
      to={props.to}
      target={props.target}
      activeClassName="active"
    >
      {props.children}
    </GatsbyLink>
  ) : (
    <a {...props} />
  )
)`
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-size: 1.375rem;
  font-family: ${fonts.sans};
  font-weight: 400;
  color: inherit;
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};

  ${display}
  ${space}
  ${width}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${letterSpacing}
  ${lineHeight}
  ${border}
  ${borderRadius}
  ${justifyContent}
  ${alignItems}

  &:hover {
    ${css`
      ${props => props.hover};
    `}
  }

  &:disabled {
    opacity: 0.25;
  }

  ${props =>
  props.nav &&
  css`
      &.active::after {
        position: absolute;
        top: 50%;
        right: -16px;
        transform: translateY(-40%);
        content: ' ';
        width: 8px;
        height: 8px;
        background: #c4c4c4;
        border-radius: 50%;
      }

      @media (max-width: ${breakpoints[0]}) {
        &.active::after {
          content: none;
        }

        &.active {
          font-weight: 600;
        }
      }
    `}
`

Link.internal = ({ children, ...props }) => (
  <Link
    color="blueLink"
    border="1px solid transparent"
    hover={{ borderBottom: '1px solid' }}
    fontSize="1.125rem"
    fontWeight="medium"
    letterSpacing="-0.5px"
    {...props}
  >
    {children} →
  </Link>
)

Link.external = ({ children, ...props }) => (
  <Link
    color="blueLink"
    border="1px solid transparent"
    hover={{ borderBottom: '1px solid' }}
    fontSize="1.125rem"
    fontWeight="medium"
    letterSpacing="-0.5px"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </Link>
)

export default Link
