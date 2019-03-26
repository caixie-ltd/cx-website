import React, { Component } from 'react'
import _ from 'lodash'
import { isMobile } from 'react-device-detect'

class Parallax extends Component {
  state = {
    enableCalculations: false,
    viewportHeight: 0,
    firstScroll: 0,
  }

  constructor(props) {
    super(props)

    this.initialPosition = undefined
    this.item = React.createRef()
  }

  componentDidMount() {
    this.setState({
      enableCalculations: true,
      viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    })

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }
  }

  onResize = event => {
    this.setState({
      viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    })
  }

  move = viewportScroll => {
    if (this.state.enableCalculations) {
      if (isMobile && this.props.disabledOnMobile) return 0

      let moveValue = 0

      if (this.inViewport()) {
        if (this.initialPosition === undefined) {
          this.initialPosition = viewportScroll
        }
        const percentage = _.clamp(
          (viewportScroll - this.initialPosition) / this.state.viewportHeight,
          -1,
          1
        )

        moveValue = -this.props.moveRange * percentage
      }

      return moveValue
    }
  }

  inViewport = () => {
    const { top } = this.item.current.getBoundingClientRect()

    return top < this.state.viewportHeight
  }

  render() {
    return (
      <div ref={this.item}>
        <div
          style={{
            transform: `translate3d(0, ${this.move(
              this.props.viewportScroll
            )}px, 0)`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Parallax
