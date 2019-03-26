import React from 'react'
import { connect } from 'react-redux'
import './scrollIndicator.css'

const ScrollIndicator = props => {
  return (
    <div
      className={`scroll-indicator bg-is-${props.theme}`}
      style={{
        transform: `scale(1, ${props.scrollPercentage})`,
      }}
    />
  )
}

const mapStateToProps = state => {
  return {
    theme: state.backgroundColor,
  }
}

const ConnectedScrollIndicator = connect(
  mapStateToProps,
  null
)(ScrollIndicator)

export default ConnectedScrollIndicator
