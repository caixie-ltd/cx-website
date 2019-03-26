import React, { Component } from 'react'
import _ from 'lodash'
import { TweenMax } from 'gsap'
import { easeFunction } from '../../helper/variables.jsx'
import './scrollLabel.css'

class ScrollLabel extends Component {
  state = {
    label: '滑动',
    timer: null,
    delay: 7000,
    appeared: false,
  }

  constructor(props) {
    super(props)

    this.wrapper = React.createRef()
  }

  componentDidMount() {
    this.setState({
      timer: setTimeout(() => {
        this.animateIn()
      }, 2000),
    })
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer)
  }

  animateIn = () => {
    TweenMax.to(this.wrapper.current.querySelector('.line'), 0.85, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: easeFunction('type_fourth'),
    })

    if (!this.state.appeared) {
      TweenMax.staggerFromTo(
        this.wrapper.current.querySelectorAll('.text'),
        1.2,
        {
          opacity: 0,
          x: -10,
          z: 2000,
          rotationY: -90,
        },
        {
          opacity: 1,
          x: 0,
          z: 0,
          rotationY: 0,
          ease: easeFunction('type_fourth'),
        },
        -0.05
      )
      this.setState({
        appeared: true,
      })
    }

    this.setState({
      timer: setTimeout(() => {
        this.animateOut()
      }, this.state.delay),
    })
  }

  animateOut = () => {
    TweenMax.to(this.wrapper.current.querySelector('.line'), 0.75, {
      scaleX: 0,
      transformOrigin: 'right',
      ease: easeFunction('type_fourth'),
    })

    this.setState({
      timer: setTimeout(() => {
        this.animateIn()
      }, 1500),
    })
  }

  render() {
    const { theme, visible } = this.props
    const letters = _.split(this.state.label, '')

    return (
      <div
        className={`scroll-label type-comp4 background-is-${theme} ${!visible &&
        'hidden'}`}
        ref={this.wrapper}
      >
        <div className="line" />
        {letters.map((letter, index) => (
          <div className="text" key={letter + index}>
            {letter}
          </div>
        ))}
      </div>
    )
  }
}

export default ScrollLabel
