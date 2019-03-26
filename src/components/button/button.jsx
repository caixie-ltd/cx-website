import React from 'react'
import './button.css'

const CustomButton = props => {
  return (
    <button
      className={`default-button type-comp2 theme-${
        props.theme
        } ${props.animate && 'animate'} ${props.delayed && 'delayed'}`}
      type={props.type ? props.type : 'button'}
    >
      <div className="button-background">
        <div className="left" />
        <div className="center" />
        <div className="right" />
      </div>
      <div className="text">{props.children}</div>
      <div className="plus-icon" />
    </button>
  )
}

export default CustomButton
