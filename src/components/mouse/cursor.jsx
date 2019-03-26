import React, { Component } from 'react'
import posed from 'react-pose'
import { easeFunction } from '../../helper/variables.jsx'
import { connect } from 'react-redux'
import './cursor.css'

let animationFrame = null

const Pointer = posed.div({
  default: {},
})

const PointerDefault = posed.div({
  default: {
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 750,
      ease: easeFunction(),
    },
  },
  hide: {
    scaleX: 0,
    scaleY: 0,
    transition: {
      duration: 750,
      ease: easeFunction(),
    },
  },
})

const PointerHover = posed.div({
  default: {
    scaleX: 0,
    scaleY: 0,
    transition: {
      duration: 750,
      ease: easeFunction(),
    },
  },
  hide: {
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 750,
      ease: easeFunction(),
    },
  },
})

class Cursor extends Component {
  state = {
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
  }

  constructor(props) {
    super(props)

    this.cursor = React.createRef()
  }

  componentDidMount = () => {
    document.addEventListener('mousemove', this.onMouseMove)

    this.moveCursor()
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    cancelAnimationFrame(animationFrame)
  }

  onMouseMove = event => {
    this.setState({
      mouseX: event.clientX,
      mouseY: event.clientY,
    })
  }

  moveCursor = () => {
    // TODO: Pass if actual position is same as mouse position
    const { mouseX, mouseY, x, y } = this.state
    const dX = mouseX - x
    const dY = mouseY - y

    this.setState(
      {
        x: x + dX / 7,
        y: y + dY / 7,
      },
      () => {
        this.cursor.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
        animationFrame = requestAnimationFrame(this.moveCursor)
      }
    )
  }

  render() {
    const { didHoverOnButton } = this.props

    return (
      <Pointer
        initialPose="default"
        pose={didHoverOnButton ? 'hide' : 'default'}
        className="custom-cursor"
        ref={this.cursor}
      >
        <PointerDefault
          pose={didHoverOnButton ? 'hide' : 'default'}
          className="default"
        />
        <PointerHover
          pose={didHoverOnButton ? 'hide' : 'default'}
          className="hover"
        />
      </Pointer>
    )
  }
}

const mapStateToProps = state => {
  return {
    didHoverOnButton: state.buttonHover,
  }
}

const ConnectedCursor = connect(
  mapStateToProps,
  null
)(Cursor)

export default ConnectedCursor
