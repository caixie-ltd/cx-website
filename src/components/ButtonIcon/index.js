import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { TweenMax, Power3, Power0 } from 'gsap'
import LabelString2 from '../LabelString2/'
import DelayLink from '../DelayLink/'
import style from './style'
import constants from '../../constants'
import { theme } from '../../style'

class ButtonIcon extends Component {
  componentWillMount() {
    this.over = false
    this.mouseFollow = this.mouseFollow.bind(this)
    this.mouseleave = this.mouseleave.bind(this)
  }

  componentDidMount() {
    const { classes } = this.props
    this.$ = {
      root: this.node,
      wrap: this.node.getElementsByClassName(classes.wrap),
      icon: this.node.getElementsByClassName(classes.icon),
      text: this.node.getElementsByClassName(classes.text),
      border: this.node.getElementsByClassName(classes.border),
      magnetic: this.node.getElementsByClassName(classes.magnetic),
    }

    this.touch = false
    this.init()
    this.events()
  }

  componentDidUpdate() {
  }

  getRenderContent() {
    const self = this
    const { classes } = self.props
    this.renderContent = null
    this.renderIcon = null
    this.renderLabel = null
    this.renderBorder = null

    if (self.props.data.icon !== undefined) {
      let icon = null
      switch (this.props.data.icon) {
        case 'arrow-right':
          icon = (
            <svg
              className={`${classes.icon} icon`}
              viewBox="0 0 10 10"
              width="10"
              height="10"
            >
              <path d="M3.2,0.1l3.5,3.5L8.2,5L6.8,6.4L3.2,9.9L1.8,8.5L5.4,5L1.8,1.5L3.2,0.1z" />
            </svg>
          )
          break
        case 'arrow-left':
          icon = (
            <svg
              className={`${classes.icon} icon`}
              viewBox="0 0 10 10"
              width="10"
              height="10"
            >
              <path d="M5.4,9.9L1.9,6.4L0.5,5l1.4-1.4l3.5-3.5l1.4,1.4L3.3,5l3.5,3.5L5.4,9.9z" />
            </svg>
          )
          break
        case 'arrow-up':
          icon = (
            <svg
              className={`${classes.icon} icon`}
              viewBox="0 0 11 7"
              width="11"
              height="7"
            >
              <path
                fillRule="evenodd"
                d="M9.036,6.914 L5.500,3.379 L1.964,6.914 L0.550,5.500 L4.086,1.964 L5.500,0.550 L6.914,1.964 L10.450,5.500 L9.036,6.914 Z"
              />
            </svg>
          )
          break
        case 'arrow-down':
          icon = (
            <svg
              className={`${classes.icon} icon`}
              viewBox="0 0 10 6"
              width="10"
              height="6"
            >
              <path
                fillRule="evenodd"
                d="M1.420,-0.008 L5.000,3.336 L8.580,-0.008 L10.012,1.330 L6.432,4.674 L5.000,6.012 L3.568,4.674 L-0.012,1.330 L1.420,-0.008 Z"
              />
            </svg>
          )
          break
        case 'close':
          icon = (
            <svg
              className={`${classes.icon} icon`}
              viewBox="0 0 10 10"
              width="10"
              height="10"
            >
              <path
                fillRule="evenodd"
                d="M7.828,9.243 L5.000,6.414 L2.172,9.243 L0.757,7.828 L3.586,5.000 L0.757,2.172 L2.172,0.757 L5.000,3.586 L7.828,0.757 L9.243,2.172 L6.414,5.000 L9.243,7.828 L7.828,9.243 Z"
              />
            </svg>
          )
          break
        case 'list':
          icon = (
            <svg
              className={`${classes.icon} icon`}
              viewBox="0 0 14 14"
              width="14px"
              height="14px"
            >
              <path
                fillRule="evenodd"
                d="M5.000,12.000 L5.000,10.000 L14.000,10.000 L14.000,12.000 L5.000,12.000 ZM5.000,5.000 L14.000,5.000 L14.000,7.000 L5.000,7.000 L5.000,5.000 ZM5.000,-0.000 L14.000,-0.000 L14.000,2.000 L5.000,2.000 L5.000,-0.000 ZM-0.000,10.000 L2.000,10.000 L2.000,12.000 L-0.000,12.000 L-0.000,10.000 ZM-0.000,5.000 L2.000,5.000 L2.000,7.000 L-0.000,7.000 L-0.000,5.000 ZM-0.000,-0.000 L2.000,-0.000 L2.000,2.000 L-0.000,2.000 L-0.000,-0.000 Z"
              />
            </svg>
          )
          break
        default:
      }
      this.renderIcon = icon
    }

    if (self.props.data.label !== undefined) {
      this.renderLabel = (
        <div className={classes.text}>
          <LabelString2
            string={self.props.data.label}
            onRef={ref => (this.labelstring = ref)}
            height={9}
            width="100px"
            left={0}
            top={0}
            navOpen={false}
          />
        </div>
      )
    }

    this.renderContent = (
      <div className={classes.wrap}>
        {this.getRenderBorder()}
        {this.renderIcon}
        {this.renderLabel}
      </div>
    )

    if ((self.props.data.link !== undefined) && (typeof self.props.data.link === 'string') && (self.props.data.link !== '#')) {
      let external = !self.isInternal(self.props.data.link)
      let target = ''

      if (this.props.target) {
        external = true
        target = '_blank'
      }

      if (external) {
        target = '_blank'
        this.renderContent = (
          <div className={classes.wrap}>
            <a href={self.props.data.link} className={classes.content} target={target}>
              {this.getRenderBorder()}
              {this.renderIcon}
              {this.renderLabel}
            </a>
          </div>
        )
      } else {
        this.renderContent = (
          <div className={classes.wrap}>
            <DelayLink to={self.props.data.link} className={classes.content}>
              {this.getRenderBorder()}
              {this.renderIcon}
              {this.renderLabel}
            </DelayLink>
          </div>
        )
      }
    }

    if (this.props.eventClick !== undefined) {
      this.renderContent = (
        <div className={classes.wrap}>
          <button
            className={classes.content}
            onClick={() => {
              if (this.props.eventClick !== undefined) {
                this.props.eventClick()
              }
            }}
          >
            {this.getRenderBorder()}
            {this.renderIcon}
            {this.renderLabel}
          </button>
        </div>
      )
    }

    return this.renderContent
  }

  getRenderEffect() {
    let effect = null
    if (this.props.effect) {
      switch (this.props.effect) {
        case 'magnetic':
          effect = <div className={this.props.classes.magnetic} />
          break
        default:
      }
    }
    return effect
  }

  getRenderBorder() {
    const self = this
    const { classes } = self.props

    if (this.props.border) {
      return (
        <svg
          className={`${classes.border} border`}
          viewBox="0 0 46.5 45.5"
        >
          <path
            d="M44.533,26.132 L39.391,37.308 L28.893,43.949 L16.374,43.946 L5.806,37.301 L0.546,26.122 L2.264,13.960 L10.414,4.676 L22.408,1.216 L34.439,4.681 L42.687,13.969 L44.533,26.132 Z"
          />
        </svg>
      )
    }
    return false
  }

  isInternal(to) {
    this.currentLink = to
    const linkSplit = to.split('/')
    if (to.indexOf(constants.urls.SITE) === 0) return true
    if (to.indexOf('://') === -1) return true
    if (linkSplit[linkSplit.length - 1].indexOf('.') === -1) return false
    return window.location.hostname === to.hostname
  }

  init() {
    this.link = ''
  }

  // eslint-disable-next-line class-methods-use-this
  mouseFollow() {
    if (this.$.icon[0] && window.mouse !== undefined) {
      const centerX = this.bounds.left + (this.bounds.width / 2)
      const centerY = this.bounds.top + (this.bounds.height / 2)
      const x = window.mouse.x - centerX
      const y = window.mouse.y - centerY
      TweenMax.to(this.$.icon[0], 1.3, {
        x: x / 1.4,
        y: y / 1.4,
        ease: Power3.easeOut,
      })

      TweenMax.to(this.$.border[0], 1.3, {
        x: x / 2.0,
        y: y / 2.0,
        ease: Power3.easeOut,
      })
    }
  }

  events() {
    // TouchStart
    this.$.root.addEventListener('touchstart', () => {
      this.touch = true
    })

    // MouseEnter
    this.$.root.addEventListener('mouseenter', () => {
      this.bounds = this.node.getBoundingClientRect()
      if (this.props.effect === 'magnetic' && !this.touch) {
        if (this.$.icon[0] && this.$.magnetic[0]) {
          // window.console.log(this.props.layout)
          TweenMax.to(this.$.icon[0], 0.5, {
            fill: this.props.layout !== 2 ? theme.colors[0] : theme.colors[1],
            ease: Power3.easeOut,
          })
        }

        if (this.$.border[0]) {
          TweenMax.to(this.$.border[0], 0.5, {
            fill: this.props.layout !== 2 ? theme.colors[1] : theme.colors[0],
            ease: Power3.easeOut,
          })
        }

        if (this.$.border[0] && this.$.magnetic[0]) {
          TweenMax.to(this.$.border[0], 10, {
            rotation: 360,
            repeat: -1,
            ease: Power0.easeNone,
          })
        }

        if (this.$.magnetic[0]) {
          this.over = true
          this.mouseFollow()
        }
      }
    })


    // MouseMove
    this.$.root.addEventListener('mousemove', () => {
      if (this.props.effect === 'magnetic' && !this.touch && this.over) {
        if (this.$.magnetic[0]) {
          this.mouseFollow()
        }
      }
    })

    // MouseLeave
    this.$.root.addEventListener('mouseleave', this.mouseleave)
    this.$.root.addEventListener('touchend', this.mouseleave)
  }

  mouseleave() {
    if (this.props.effect === 'magnetic' && !this.touch) {
      if (this.$.icon && this.$.border) {
        TweenMax.to(this.$.icon[0], 0.5, {
          x: 0,
          y: 0,
          fill: this.props.layout !== 2 ? theme.colors[1] : theme.colors[0],
          ease: Power3.easeOut,
        })
      }

      if (this.$.border[0] && this.$.magnetic[0]) {
        TweenMax.to(this.$.border[0], 0.5, {
          x: 0,
          y: 0,
          fill: 'rgba(255, 255, 255, 0)',
          ease: Power3.easeOut,
        })
        this.over = false
      }

      if (this.$.border[0]) {
        TweenMax.to(this.$.border[0], 1, {
          rotation: 0,
        })
      }
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div
        className={`${classes.root} ${this.props.className}`}
        ref={node => (this.node = node)}
      >
        {this.getRenderEffect()}
        {this.getRenderContent()}
      </div>
    )
  }
}

export default injectSheet(style)(ButtonIcon)



// WEBPACK FOOTER //
// src/components/ButtonIcon/index.js
