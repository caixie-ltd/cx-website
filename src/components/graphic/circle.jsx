import React, { Component } from 'react'
import { TweenMax } from 'gsap'
import { easeFunction } from '../../helper/variables'

import './circle.css'

class Circle extends Component {
  circleTimer = null

  mounted = false

  state = {
    length: 0,
    tween: null,
  }

  constructor(props) {
    super(props)

    this.circle = React.createRef()
  }

  componentDidMount() {
    this.setState({
      length: 3236,
      tween: 3236,
    })

    this.mounted = true

    this.circleTimer = setTimeout(
      () => {
        let tweenValue = {
          value: this.state.tween,
        }

        TweenMax.to(tweenValue, 15.25, {
          value: 0,
          onUpdate: () => {
            if (this.mounted) {
              this.setState({
                tween: tweenValue.value,
              })
            }
          },
          onUpdateParams: [tweenValue],
          ease: easeFunction(),
        })
      },
      this.props.showHomepageLoading ? 2000 : 0
    )
  }

  componentWillUnmount() {
    this.mounted = false
    clearTimeout(this.circleTimer)
  }

  render() {
    const { length } = this.state
    const { lineColor } = this.props

    return (
      <div className={`circle-container ${length > 0 && 'loaded'}`}>
        <svg height={1030} width={1030} className="bg-circle">
          <circle
            cx={615}
            cy={515}
            r={515}
            stroke={`${lineColor ? lineColor : '#9c9c9c'}`}
            strokeWidth={1}
            strokeDasharray={`${length} ${length}`}
            strokeDashoffset={this.state.tween}
            fill="none"
            ref={this.circle}
          />
        </svg>
      </div>
    )
  }
}

export default Circle
