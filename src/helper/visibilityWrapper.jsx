import React, { Component } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

class VisibilityWrapper extends Component {
  state = {
    show: false,
    allowChange: true,
  }

  componentDidMount() {
    this.setState({
      allowChange: true,
    })
  }

  triggerShow = isVisible => {
    if (isVisible && !this.state.show && this.state.allowChange) {
      this.setState({
        show: true,
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      allowChange: false,
    })
  }

  render() {
    return (
      <div>
        <VisibilitySensor
          onChange={this.triggerShow}
          active={!this.state.show}
          {...this.props}
        >
          {this.props.children}
        </VisibilitySensor>
      </div>
    )
  }
}

export default VisibilityWrapper
