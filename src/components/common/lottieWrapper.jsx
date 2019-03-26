import React, { Component } from 'react'
import Lottie from 'lottie-web'

class LottieWrapper extends Component {
  state = {}

  constructor(props) {
    super(props)

    this.lottie = React.createRef()
  }

  componentDidMount() {
    const { path } = this.props

    Lottie.loadAnimation({
      container: this.lottie.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: path,
    })
  }

  render() {
    const { width, height } = this.props

    return (
      <div
        className="lottie-wrapper"
        style={{
          width: width,
          height: height,
        }}
        ref={this.lottie}
      />
    )
  }
}

export default LottieWrapper
