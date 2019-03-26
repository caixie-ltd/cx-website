import { Component } from "react"
import React from "react"
import { TimelineMax } from "gsap/TimelineMax"
import { Power4 } from "gsap"
import { CustomEase } from "../../../gsap-bonus/CustomEase"
// import Dots from "./dots"
import dotsCls from "./dots.module.scss"
import cls from "./stickyProgress.module.scss"
import IconButton from "../../../components/iconButton/iconButton"
// import { anchorScroll } from "../../../helper/help"
// import _ from "lodash"

class StickyProgress extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.dotsDashRef = React.createRef()
    this.activeDotRef = React.createRef()
    this.firstDotTop = 0
    this.prevDotPosition = 0
    this.activeDot = null
    this.preIndex = null
    this.bigWiggleEase = CustomEase.create("custom", "M0,0 C0,0.872 0,1.3 0.2,1.3 0.33,1.3 0.309,0.85 0.414,0.85 0.498,0.85 0.506,1.061 0.6,1.062 0.672,1.062 0.69,0.952 0.748,0.952 0.783,0.952 0.835,1.022 0.887,1.024 0.932,1.024 0.976,1 1,1")
  }

  componentDidMount() {
    this.dash = this.dotsDashRef.current
    this.activeDot = this.activeDotRef.current
    this.dotHeight = parseFloat(window.getComputedStyle(this["dots-0"]).height)
    this.firstDotTop = this["dots-0"].offsetTop
  }

  animateDots = (index) => {
    const timeline = new TimelineMax({
      force3D: true,
    })
    const y = this.firstDotTop + this.dotHeight * (index + .5)
    const subHeight = this.prevDotPosition > y ? 15 : -15
    timeline.to(this.dash, .1, {
      y: y,
      ease: Power4.easeOut,
    }, 0).to(this.dash, .05, {
      scaleY: 2,
      ease: Power4.easeOut,
    }, 0).to(this.dash, .05, {
      scaleY: .5,
      ease: Power4.easeOut,
    }, .03).to(this.activeDot, .1, {
      scale: 0,
      ease: Power4.easeOut,
    }, 0).to(this.activeDot, 0, {
      y: y + subHeight,
    }, .03).to(this.activeDot, .2, {
      y: y,
      ease: this.bigWiggleEase,
    }, .05).to(this.activeDot, .2, {
      scaleY: 1,
      ease: this.bigWiggleEase,
    }, .05).to(this.activeDot, .1, {
      scaleX: 1,
      ease: Power4.easeOut,
    }, .05)
    this.prevDotPosition = y
  }

  dotClick = (event, target, index) => {
    event.preventDefault()
    this.animateDots(index)
    this.props.updateProjectIndex(index)
    this.props.jumpTo(index)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { onWork, currentIndex } = nextProps
    if ((onWork && currentIndex) || currentIndex === 0) {
      if (this.preIndex !== currentIndex) {
        this.animateDots(currentIndex)
      }
      this.preIndex = currentIndex
    }
  }

  render() {
    // const { projects, onWork, currentIndex } = this.props

    return (
      <div className={cls.work__stickyProgress}
           ref={this.containerRef}>
        <div className={cls.work__progress}>

          <div className={dotsCls.dots}>
            <div className={dotsCls.dots__activeDot} ref={this.activeDotRef}/>
            <div className={dotsCls.dots__dash} ref={this.dotsDashRef}/>

            {this.props.projects.map((project, index) => (
              <a href={`#${project.slug}`}
                 key={index}
                 className={dotsCls.dots__dotContainer}
                 onClick={
                   (event) => this.dotClick(event, `${project.slug}`, index)
                 }
                 ref={(elem) => this[`dots-${index}`] = elem}>
                <div className={dotsCls.dots__dot}/>
                <span className={dotsCls.dots__label}>{project.title}</span>
              </a>
            ))}
          </div>
          <IconButton
            classes={cls.iconButton}
            label="全部案例"
            to={`/projects`}/>
        </div>
      </div>
    )
  }
}

export default StickyProgress
