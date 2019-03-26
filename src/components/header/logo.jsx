import React from 'react'
import InternalLink from '../../helper/links/InternalLink.jsx'
import {
  LogoB,
  LogoA,
  LogoU,
  LogoN,
  LogoF,
  LogoI,
  LogoR,
  LogoE,
  Symbol,
} from '../svg/logo.jsx'
import posed from 'react-pose'
import { connect } from 'react-redux'
import './logo.css'
import { isBrowser } from 'react-device-detect'

const Identity = posed.div({
  logo: {},
  symbol: {
    staggerChildren: 75,
  },
})

const ToLeft = posed.div({
  logo: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 450,
      ease: [0.475, 0.425, 0, 0.995],
    },
  },
  symbol: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 450,
      ease: [0.475, 0.425, 0, 0.995],
    },
  },
})

const ToRight = posed.div({
  logo: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 450,
      ease: [0.475, 0.425, 0, 0.995],
    },
  },
  symbol: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 450,
      ease: [0.475, 0.425, 0, 0.995],
    },
  },
})

const Disappear = posed.div({
  logo: {
    opacity: 1,
    transition: {
      duration: 450,
      ease: [0.475, 0.425, 0, 0.995],
    },
  },
  symbol: {
    opacity: 0,
    transition: {
      duration: 450,
      ease: [0.475, 0.425, 0, 0.995],
    },
  },
})

const CircleContainer = posed.div({
  logo: {
    opacity: 0,
    transition: {
      duration: 450,
      ease: [0.475, 0.425, 0, 0.995],
    },
  },
  symbol: {
    opacity: 1,
    transition: {
      duration: 450,
      ease: [0.475, 0.425, 0, 0.995],
    },
  },
})

const ConnectedLogo = props => {
  const { active, onLogoClick, theme, isSymbol, showMark } = props

  const color = active ? (theme === 'white' ? 'black' : 'white') : theme

  return (
    <InternalLink to="/" onClick={onLogoClick}>
      <Identity
        pose={active || (isBrowser && isSymbol) ? 'symbol' : 'symbol'}
        className={`identity ${isSymbol &&
        !active &&
        'is-symbol'} ${!showMark && 'hide'}`}
      >
        <ToRight>
          <LogoB theme={color} className="b letter" />
        </ToRight>
        <Disappear>
          <LogoA theme={color} className="a letter" />
        </Disappear>
        <ToLeft>
          <LogoU theme={color} className="u letter" />
        </ToLeft>
        <ToLeft>
          <LogoN theme={color} className="n letter" />
        </ToLeft>
        <ToLeft>
          <LogoF theme={color} className="f letter" />
        </ToLeft>
        <ToLeft>
          <LogoI theme={color} className="i letter" />
        </ToLeft>
        <ToLeft>
          <LogoR theme={color} className="r letter" />
        </ToLeft>
        <ToLeft>
          <LogoE theme={color} className="e letter" />
        </ToLeft>
        <CircleContainer>
          <Symbol theme={color} className="circle" />
        </CircleContainer>
      </Identity>
    </InternalLink>
  )
}

const mapStateToProps = state => {
  return {
    isSymbol: state.isSymbol,
    showMark: state.showMark,
  }
}

const Logo = connect(
  mapStateToProps,
  null
)(ConnectedLogo)

export default Logo
