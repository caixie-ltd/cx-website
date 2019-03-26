import React from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'

const InternalLink = props => {
  const {
    onMouseEnter: passedOnMouseEnter,
    onMouseLeave: passedOnMouseLeave,
    mouseEnter,
    mouseLeave,
    ...remainingProps
  } = props

  return (
    <Link
      onMouseEnter={event => {
        mouseEnter()
        if (passedOnMouseEnter) passedOnMouseEnter(event)
      }}
      onMouseLeave={event => {
        mouseLeave()
        if (passedOnMouseLeave) passedOnMouseLeave(event)
      }}
      {...remainingProps}
    >
      {props.children}
    </Link>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    mouseEnter: () => dispatch({ type: 'BUTTON_MOUSE_ENTER' }),
    mouseLeave: () => dispatch({ type: 'BUTTON_MOUSE_LEAVE' }),
  }
}

const ConnectedInternalLink = connect(
  null,
  mapDispatchToProps
)(InternalLink)

export default ConnectedInternalLink
