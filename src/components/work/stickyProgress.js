import { Component } from "react"
import React from "react"
import { TimelineMax } from "gsap/TimelineMax"
import { Power4 } from "gsap"
import { $, $$} from "../../helper/help"
import { CustomEase } from "../../gsap-bonus/CustomEase"

class StickyProgress extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.dotsDashRef = React.createRef()
    this.firstDotTop = 0
    // this.state = {
    this.prevDotPosition = 0
    this.dash = null
    this.activeDot = null
    this.preIndex = null

    //   firstDotTop: 0,
    //   dash: null,
    //   activeDot: null,
    //   currentDotIndex: this.props.currentDotIndex,
    // }
    this.bigWiggleEase = CustomEase.create("custom", "M0,0 C0,0.872 0,1.3 0.2,1.3 0.33,1.3 0.309,0.85 0.414,0.85 0.498,0.85 0.506,1.061 0.6,1.062 0.672,1.062 0.69,0.952 0.748,0.952 0.783,0.952 0.835,1.022 0.887,1.024 0.932,1.024 0.976,1 1,1")

  }

  componentDidMount() {
    this.dots = $$(this.containerRef.current, ".dots__dot-container")
    // this.dash = $(this.containerRef.current, ".dots__dash")
    // console.log(this.dash)
    console.log(this.dotsDashRef)
    this.dash = this.dotsDashRef.current
    this.activeDot = $(this.containerRef.current, ".dots__active-dot")
    this.dotHeight = parseFloat(window.getComputedStyle(this.dots[0]).height)
    this.firstDotTop = this.dots[0].offsetTop
  }

  animateDots = (index) => {
    const timeline = new TimelineMax({
      force3D: true,
    })
    console.log("animate dots" + index)
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

  dotClick(event) {
    // event.preventDefault()
    // const arrival = this.getAttribute("href")
    // anchorScroll(arrival)
  }

  render() {
    const { projects, onWork, currentIndex } = this.props
    // console.log("projectINdex: " + this.preIndex)
    // console.log("currentindex: " + currentIndex)
    if (onWork && currentIndex || currentIndex === 0) {
      if (this.preIndex !== currentIndex) {
        this.animateDots(currentIndex)
      }
      this.preIndex = currentIndex
    }
    return (
      <div className="work__sticky-progress"
           ref={this.containerRef}>
        <div className="work__progress">
          <div className="dots">
            <div className="dots__active-dot"/>
            <div className="dots__dash" ref={this.dotsDashRef}/>
            {projects.map((project, index) => (
              <a href={`#${project.slug}`}
                 key={index}
                 className={`dots__dot-container`}
                 onClick={this.dotClick(index)}>
                <div className="dots__dot"/>
                <span className="dots__label">{project.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default StickyProgress
