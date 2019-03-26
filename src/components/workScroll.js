// import { TimelineMax } from "gsap/TimelineMax"
// import { $, $$, $on, debounce } from "../helper/help"
// import { Power4 } from "gsap/TweenLite"
import { Component } from "react"
import React from "react"
// import { isBrowser } from "react-device-detect"
import WorkSticky from "./work/sticky"
import cls from './work.module.scss'

class WorkScroll extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.getRectsInterval = undefined
  }

  state = {
    prevDotIndex: null,
    prevDotPosition: 0,
    currentDotIndex: 0,
    currentAnimation: null,
    scrolled: 0,
    windowHalfHeight: 0,
    viewportCenter: 0,
    pageHeight: 0,
    windowHeight: null,
    translateValue: 0,
    scrollPercentage: 0,
    isScrolling: false,
    clientTop: null,
    containerRect: {
      left: 0,
      width: 0,
      top: 0,
      bottom: 0,
    },
    currentProject: null
    // isSticky: false,
    // containerRect:
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.props.isSticky)
  }

  componentDidMount() {
    // this.projects = $$(document, ".work__project")
    // this.wiper = $(this.containerRef.current, ".work__wiper")
    // this.getRectsInterval = setInterval(() => {
    //   this.setState(state => {
    //     const containerRect = this.containerRef.current.getBoundingClientRect()
    //     return JSON.stringify(containerRect) !== JSON.stringify(state.containerRect) ? null : { containerRect }
    //   })
    // }, 10)

    // console.log(this.props.projects)
    // this.calculateValues()

    // if (typeof window !== "undefined") {
    //   window.addEventListener(
    //     isBrowser ? "wheel" : "scroll",
    //     this.onScroll,
    //   )
    // }
    // if (typeof window !== "undefined") {
    //   window.addEventListener("resize", this.onResize)
    // }
    // $on(window, "scroll", this.onScroll)
    // $on(window, "resize", this.onResize)
  }

  componentWillUnmount() {
    // clearInterval(this.getRectsInterval)
  }

  render() {
    const { isSticky, onWork, currentIndex, projects } = this.props

    return (
      <section
        className={cls.work}
        data-bkg="#161517"
        ref={this.containerRef}>
        <WorkSticky
          currentIndex={currentIndex}
          onWork={onWork}
          isSticky={isSticky}
          parentRect={this.state.containerRect}
          projects={projects}
          prevDotIndex={this.state.prevDotIndex}
          currentProject={this.state.currentProject}
          updateProjectIndex={this.props.updateProjectIndex}
          jumpTo={this.props.jumpTo}
        />
      </section>
    )
  }

}

export default WorkScroll
