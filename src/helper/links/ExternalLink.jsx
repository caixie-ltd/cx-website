import React from "react"
import { connect } from "react-redux"

const ExternalLink = props => {
  const {
    onMouseEnter: passedOnMouseEnter,
    onMouseLeave: passedOnMouseLeave,
    mouseEnter,
    mouseLeave,
    ...remainingProps
  } = props

  return (
    <a
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
    </a>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    mouseEnter: () => dispatch({ type: "BUTTON_MOUSE_ENTER" }),
    mouseLeave: () => dispatch({ type: "BUTTON_MOUSE_LEAVE" }),
  }
}

const ConnectedExternalLink = connect(
  null,
  mapDispatchToProps,
)(ExternalLink)

export default ConnectedExternalLink
