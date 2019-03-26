import { Component } from "react"
import React from "react"
import cls from "./dots.module.scss"
import { TimelineMax } from "gsap/TimelineMax"
import { Power4 } from "gsap"

export default class Dots extends Component {
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
    // this.setState({
    //   prevDotPosition: y,
    // })
  }
  dotClick = () => {
  }

  render() {
    return (
      <div className={cls.dots}>
        <div className={cls.dots__activeDot}/>
        <div className={cls.dots__dash}/>
        {this.props.projects.map((project, index) => (

          <a href={`#${project.slug}`}
             key={index}
             className={cls.dots__dotContainer}
             onClick={this.dotClick(index)}>
            <div className={cls.dots__dash}/>
            <span className={cls.dots__label}>{project.title}</span>
          </a>
        ))}
      </div>
    )
  }
}
