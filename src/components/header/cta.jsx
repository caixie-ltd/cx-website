import React, { Component } from 'react'
import SplitText from 'react-pose-text'
import InternalLink from '../../helper/links/InternalLink.jsx'
import { easeFunction } from '../../helper/variables.jsx'
import './cta.css'

const TextHover = {
  init: {
    y: 0,
  },
  hover: {
    y: 0,
    transition: ({ charIndex }) => ({
      type: 'keyframes',
      values: [0, -5, 0],
      duration: 450,
      easings: easeFunction(),
      delay: charIndex * 20,
    }),
  },
}
// Call to Action
class CTA extends Component {
  state = {
    hover: false,
  }

  doHover = () => {
    this.setState({
      hover: true,
    })
  }

  doHoverOut = () => {
    this.setState({
      hover: false,
    })
  }
  render() {
    const { theme, active, onMenuClick } = this.props

    return (
      <InternalLink
        to="/lets-talk"
        className={`button-cta type-comp1 background-is-${theme} ${
          active ? 'active' : ''
          }`}
        onClick={onMenuClick}
        onMouseEnter={this.doHover}
        onMouseLeave={this.doHoverOut}
      >
        <SplitText
          charPoses={TextHover}
          pose={this.state.hover ? 'hover' : 'init'}
        >
          与我们沟通
        </SplitText>
      </InternalLink>
    )
  }
}

export default CTA
