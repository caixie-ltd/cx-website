import React, { Component } from 'react'
import posed from 'react-pose'
import InternalLink from '../../helper/links/InternalLink.jsx'
import { easeFunction } from '../../helper/variables.jsx'

const MenuItem = posed.li({
  active: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 950,
      ease: easeFunction(),
    },
  },
  inactive: {
    opacity: 0,
    x: -100,
    skewX: 5,
    transition: {
      duration: 550,
      ease: easeFunction(),
    },
  },
})

class Menu extends Component {
  state = {}
  render() {
    const {
      menu,
      focused,
      onMenuFocus,
      onMenuFocusOut,
      onMenuClick,
    } = this.props

    return (
      <ul>
        {menu.map(({ label, link }, index) => (
          <MenuItem
            key={label}
            className={`type-h2 menu-item ${
              focused === label ? 'focused' : ''
              } ${focused === null ? '' : 'focused-out'}`}
            onMouseEnter={() => onMenuFocus(label)}
            onMouseLeave={() => onMenuFocusOut(label)}
          >
            <InternalLink to={link} onClick={onMenuClick} className="menu-word">
              {label}
            </InternalLink>
            <div className="grayed">{label}</div>
            <div className="numbering type-comp2">0{index + 1}</div>
          </MenuItem>
        ))}
      </ul>
    )
  }
}

export default Menu
