import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { TweenMax, TimelineMax, Power2 } from 'gsap'
import style from './style'


class LabelString2 extends Component {
  componentWillMount() {
    this.currentString = ''
    this.newString = ''
    this.updated = false
  }
  componentDidMount() {
    this.props.onRef(this)
    const { classes } = this.props
    this.$ = {
      root: this.node,
      string: this.node.getElementsByClassName(classes.string),
      line: this.node.getElementsByClassName(classes.line),
      stringNew: this.node.getElementsByClassName('bottom'),
      container: this.node.getElementsByClassName(classes.container),
      lineContainer: this.node.getElementsByClassName(classes.lineContainer),
    }
    this.update()
  }
  componentDidUpdate(prevProps) {
    if (this.props.string !== prevProps.string) {
      this.update()
    }
    if (this.props.navOpen !== prevProps.navOpen) {
      this.menuIsOpen = (this.props.navOpen) ? 'navOpen' : ''
    }
  }
  update() {
    this.newString = this.props.string
    let xPos = '0%'
    if (this.props.center) {
      xPos = '-50%'
    }
    // this.currentString = obj.cStr
    if (this.updated) {
      TweenMax.set(this.$.string, { y: '0%', x: xPos })
    }
    if (this.props.line) {
      this.timelineHover = new TimelineMax({ paused: true })
      const lineW = this.$.stringNew[0].clientWidth - 2
      this.timelineHover
        .set(this.$.line, { transformOrigin: '100% 0%' })
        .to(this.$.line, 0.5, { scaleX: 0 })
        .set(this.$.lineContainer, { width: lineW })
        // .to(this.$.lineContainer, 0.2, { ease: Power2.easeInOut, width: this.$.stringNew[0].clientWidth })
        .set(this.$.line, { transformOrigin: '0% 0%', scaleX: 0 })
        .to(this.$.line, 0.5, { scaleX: 1 })

      this.timelineHover.play()
    }
    TweenMax.to(this.$.string, 0.5, {
      y: '-100%',
      x: xPos,
      ease: Power2.easeInOut,
      force3D: true,
      onComplete: () => {
        this.currentString = this.newString
        this.updated = true
        // TweenMax.to(this.$.line, 0.5, { ease: Power2.easeInOut, scaleY: '1' })
        // window.console.log('nuova W :', this.$.stringNew[0])
      },
    })
    // window.console.log('oggetto $', this.$.stringNew[0].clientWidth)
  }

  renderLine() {
    const { classes, center } = this.props
    this.centerClass = (center) ? 'center' : ''
    if (this.props.line) {
      return (
        <div className={`${classes.lineContainer}`}>
          <span className={`${classes.line}`} />
        </div>
      )
    }
    return (null)
  }
  render() {
    const { classes } = this.props

    return (
      <div className={`${classes.root} ${this.centerClass} ${this.menuIsOpen}`} ref={(node) => { this.node = node }}>
        <div className={`${classes.container}`}>
          <span className={`${classes.string} top`}>
            {`${this.currentString}`}
          </span>
          <span className={`${classes.string} bottom`}>
            {`${this.props.string}`}
          </span>
        </div>
        { this.renderLine() }
      </div>
    )
  }
}

LabelString2.defaultProps = {
  string: '',
  line: false,
}

export default injectSheet(style)(LabelString2)



// WEBPACK FOOTER //
// src/components/LabelString2/index.js
