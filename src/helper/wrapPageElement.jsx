import React from 'react'
import TransitionWrapper from './transitionWrapper.jsx'

const wrapPageElement = ({ element, props }) => {
  return <TransitionWrapper {...props}>{element}</TransitionWrapper>
}

export default wrapPageElement
