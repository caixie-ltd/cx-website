import React, { Component } from 'react'
import _ from 'lodash'
import './hamburger.css'
import { isMobile } from 'react-device-detect'

let frame = null

class Hamburger extends Component {
  state = {
    returnIconPosition: false,
    initialX: 0,
    initialY: 0,
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  }

  constructor(props) {
    super(props)

    this.hamburgerWrapper = React.createRef()
  }

  getInitialPosition = () => {
    const {
      left: initialX,
      top: initialY,
    } = this.hamburgerWrapper.current.getBoundingClientRect()

    this.setState({
      initialX,
      initialY,
    })
  }

  componentDidMount() {
    this.setState({
      x: 0,
      y: 0,
    })

    this.getInitialPosition()
    window.addEventListener('resize', this.getInitialPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getInitialPosition)
  }

  moveIcon = () => {
    const {
      initialX,
      initialY,
      x,
      y,
      mouseX,
      mouseY,
      returnIconPosition,
    } = this.state

    const dX = mouseX - initialX - x - 20
    const dY = mouseY - initialY - y - 20
    let newX = x
    let newY = y

    newX += dX / 10
    newY += dY / 10

    newX = _.round(newX, 2)
    newY = _.round(newY, 2)

    this.hamburgerWrapper.current.style.transform =
      'translate3d(' + newX + 'px, ' + newY + 'px, 0)'

    this.setState({
      x: newX,
      y: newY,
    })

    if (returnIconPosition) {
      if (_.round(newX) === 0 && _.round(newY) === 0) {
        cancelAnimationFrame(frame)
        return
      }
    }
    frame = requestAnimationFrame(this.moveIcon)
  }

  onMouseMove = event => {
    this.setState({
      mouseX: event.clientX,
      mouseY: event.clientY,
    })
  }

  onMouseEnter = event => {
    this.getInitialPosition()
    if (!isMobile) {
      this.setState(
        {
          returnIconPosition: false,
          x: 0,
          y: 0,
          mouseX: event.clientX,
          mouseY: event.clientY,
        },
        () => this.moveIcon()
      )
    }
  }

  onMouseLeave = event => {
    if (!isMobile) {
      this.setState({
        returnIconPosition: true,
        mouseX: this.state.initialX + 20,
        mouseY: this.state.initialY + 20,
      })
    }
  }

  render() {
    const { active, onHamburgerClick, theme } = this.props

    return (
      <div
        className={`hamburger ${active ? 'active' : ''}`}
        onMouseMove={this.onMouseMove}
      >
        <div className="hamburger-wrapper" ref={this.hamburgerWrapper}>
          <div className="button">
            <button className="button-hamburger">
              <div
                className={`background-hamburger background-is-${theme} ${
                  active ? 'inactive' : ''
                  }`}
              />
              <div
                className={`background-hamburger white background-is-${theme} ${
                  active ? 'active' : 'inactive'
                  }`}
              />
              <div
                className={`icon-hamburger background-is-${theme} ${active &&
                'hide'}`}
              >
                <div className="line-center" />
              </div>
              <div
                className={`icon-close background-is-${theme} ${
                  active ? 'active' : ''
                  }`}
              />
            </button>
          </div>
        </div>
        <button
          className="click-layer"
          onClick={onHamburgerClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        />
      </div>
    )
  }
}

export default Hamburger
