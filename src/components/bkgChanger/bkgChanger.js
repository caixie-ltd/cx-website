import React from 'react'
import './bkgChanger'

const BkgChanger = props => {
  return (
    <div className="bkg-changer">
      <div
        className={`bkg-changer__one ${props.active && 'active'}`}
        style={{background: props.bkg}}>
        <span className="bkg-changer__text">
          {props.children}
        </span>
      </div>
      <div className="bkg-changer__two">
        <span className="bkg-changer__text"></span>
      </div>
    </div>
  )
}

export default BkgChanger
