import React, { Component } from 'react'
import Hamburger from './hamburger.jsx'
import Navigation from '../navigation/navigation.jsx'
import CTA from './cta.jsx'
import Logo from './logo.jsx'
import { connect } from 'react-redux'
import './header.css'
import { BrowserView, isBrowser } from 'react-device-detect'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

class Header extends Component {
  state = {
    active: false,
    clickOutX: 0,
    clickOutY: 0,
  }

  constructor(props) {
    super(props)

    this.sectionMenu = React.createRef()
  }

  doToggleMenu = event => {
    const { left, top, right } = event.target.getBoundingClientRect()
    const radius = (right - left) * 0.5
    const clickX = isBrowser ? event.clientX - left - radius : 0
    const clickY = isBrowser ? event.clientY - top - radius : 0

    this.setState(
      {
        active: !this.state.active,
        clickOutX: clickX,
        clickOutY: clickY,
      },
      () => {
        if (this.state.active) {
          disableBodyScroll(this.sectionMenu.current)
        } else {
          enableBodyScroll(this.sectionMenu.current)
        }
      }
    )
  }

  doCloseMenu = () => {
    this.setState({
      active: false,
    })

    enableBodyScroll(this.sectionMenu.current)
  }

  render() {
    const { active, clickOutX, clickOutY } = this.state
    const { theme, showHomepageLoading } = this.props

    return (
      <React.Fragment>
        <header
          className={`header ${showHomepageLoading ? 'hidden' : 'reveal'}`}
        >
          <div className="logo-container">
            <Logo
              theme={theme}
              active={active}
              onLogoClick={this.doCloseMenu}
            />
          </div>
          <nav className="minimal">
            <BrowserView>
              <CTA
                theme={theme}
                active={active}
                onMenuClick={this.doCloseMenu}
              />
            </BrowserView>
            <Hamburger
              theme={theme}
              active={active}
              onHamburgerClick={this.doToggleMenu}
            />
          </nav>
        </header>
        <div className="prevent-container" ref={this.sectionMenu}>
          {/*TODO: revisit content-container bubbling issue*/}
          <Navigation
            theme={theme}
            active={active}
            clickOutX={clickOutX}
            clickOutY={clickOutY}
            onMenuClick={this.doCloseMenu}
          />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.backgroundColor,
    showHomepageLoading: state.showHomepageLoading,
  }
}

const ConnectedHeader = connect(
  mapStateToProps,
  null
)(Header)

export default ConnectedHeader
