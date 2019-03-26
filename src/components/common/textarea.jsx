import React, { Component } from 'react'

import './textarea.css'

class Textarea extends Component {
  state = {}
  render() {
    return (
      <div className="textarea type-sub3">
        <textarea {...this.props} />
        <div className="underline" />
      </div>
    )
  }
}

export default Textarea
