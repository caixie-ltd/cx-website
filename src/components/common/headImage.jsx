import React, { Component } from 'react'
import Img from 'gatsby-image'
import { isBrowser } from 'react-device-detect'
import _ from 'lodash'

import './headImage.css'

class HeadImage extends Component {
  state = {
    windowHeight: 0,
    margin: 0,
    parallaxValue: 100,
  }

  componentDidMount() {
    this.setMargin()

    if (typeof window !== 'undefined')
      window.addEventListener('resize', this.setMargin)
  }

  setMargin = () => {
    this.setState({
      windowHeight: typeof window !== 'undefined' && window.innerHeight,
      margin: this.getMargin(),
    })
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined')
      window.removeEventListener('resize', this.setMargin)
  }

  getMargin = () => {
    const windowWidth = typeof window !== 'undefined' && window.innerWidth

    return (windowWidth - (windowWidth > 1440 ? 1200 : 1080)) * 0.5
  }

  pushValue = momentumScrollValue => {
    const scrolledRatio = _.clamp(
      momentumScrollValue / this.state.windowHeight,
      0,
      1
    )

    return scrolledRatio
  }

  render() {
    const { fluid, momentumScrollValue } = this.props

    return (
      <div
        className="head-image-container"
        style={{
          marginBottom: `${-this.state.parallaxValue}px`,
        }}
      >
        <div
          className="head-image"
          style={{
            // clipPath: isBrowser
            //   ? `inset(0 0 ${this.state.parallaxValue -
            //       this.state.parallaxValue *
            //         this.pushValue(momentumScrollValue)}px ${this.pushValue(
            //       momentumScrollValue
            //     ) * this.state.margin}px)`
            //   : '',
            transform: isBrowser
              ? `translate3d(0, ${-this.pushValue(momentumScrollValue) *
              this.state.parallaxValue}px, 0) translateZ(0)`
              : '',
          }}
        >
          <Img fluid={fluid} />
          <div
            className="left-cover"
            style={{
              transform: `scale(${this.pushValue(momentumScrollValue) * 1}, 1)`,
            }}
          />
        </div>
      </div>
    )
  }
}

export default HeadImage
