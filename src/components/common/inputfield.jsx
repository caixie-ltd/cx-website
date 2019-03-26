import React, { Component } from 'react'

import './inputfield.css'

class InputField extends Component {
  state = {}
  render() {
    return (
      <div className="input-field type-sub3">
        <input {...this.props} />
        <div className="underline" />
      </div>
    )
  }
}

export default InputField
