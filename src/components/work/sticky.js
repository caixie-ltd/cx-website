// import { TimelineMax } from "gsap/TimelineMax"
// import { $, $$, $on, anchorScroll, debounce } from "../helper/help"
// import { Power4 } from "gsap/TweenLite"
// import Sticky from "./sticky"
import { Component } from "react"
// import Layout from "../pages/project"
import React from "react"
// import { isBrowser } from "react-device-detect"
// import { connect } from "react-redux"
// import _ from "lodash"
// import "./vincit-projects.css"
// import { CustomEase } from "../gsap-bonus/CustomEase"
import { throttle } from "lodash"
// import StickyProgress from "./stickyProgress"
import StickyProjects from "./stickyProjects"
import StickyProgress from "./workStickyProgressBlock/stickyProgress"
import cls from "./sticky.module.scss"

class WorkSticky extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
    this.parent = this.props.parentRect
    // console.log(this.parent)
    this.settings = {
      bottomOffset: 0,
      stickyClass: "-is-sticky",
      bottomClass: "-is-bottom",
      onStick: () => {
      },
      onUnstick: () => {
      },
    }
    this.wrapper = React.createRef()
  }

  state = {
    bottomOffset: 0,
    stickyClass: "-is-sticky",
    bottomClass: "-is-bottom",
    onStick: () => {
    },
    onUnstick: () => {
    },
    // parentRect: null,
    isSticky: false,
    firstLoad: true,
  }

  componentDidMount() {
    this.onResize = throttle(this.onResize, 400)
    this.elClasses = this.wrapper.current.classList
    this.elCss = window.getComputedStyle(this.wrapper.current)
    this.calculateValues()
    this.stick()

    window.addEventListener("scroll", this.onScroll)
    window.addEventListener("resize", this.onResize)
  }

  render() {
    const { isSticky, currentIndex, onWork } = this.props
    return (
      <div className={`${cls.work__stickyWrapper} ${isSticky && cls.isSticky}`} ref={this.wrapper}>
        <StickyProjects
          onWork={onWork}
          currentIndex={currentIndex}
          parentRect={this.props.parentRect}
          projects={this.props.projects}/>
        <StickyProgress
          onWork={onWork}
          currentIndex={currentIndex}
          parentRect={this.props.parentRect}
          projects={this.props.projects}
          updateProjectIndex={this.props.updateProjectIndex}
          jumpTo={this.props.jumpTo}
        />
      </div>
    )
  }

  onScroll = event => {
    this.animation = requestAnimationFrame(this.stick)
  }

  onResize = () => {
    this.calculateValues()
    this.stick()
  }

  calculateValues = () => {
    this.scrolled = window.pageYOffset
    this.parentTop = this.parent.top + this.scrolled
    this.parentBottom = this.parent.bottom + this.settings.bottomOffset + this.scrolled
    this.elCss = window.getComputedStyle(this.wrapper.current)
    this.elHeight = this.parent.offsetHeight + parseFloat(this.elCss.marginTop) + parseFloat(this.elCss.marginBottom)
  }

  stick = () => {
    this.scrolled = window.pageYOffset
    if (this.scrolled < this.parentTop) {
      if (!this.state.isSticky) {
        return
      }

      this.elClasses.remove(this.stickyClass)
      // this.state.isSticky = false
      this.setState({
        isSticky: false
      })
      this.settings.onUnstick()
      return
    }
    if (this.scrolled + this.elHeight < this.parentBottom) {
      if (this.state.isSticky) {
        return
      }
      this.elClasses.remove(this.settings.bottomClass)
      this.elClasses.add(this.settings.stickyClass)
      this.setState({
        isSticky: false
      })
      this.settings.onStick()
      return
    }
    if (!(true !== this.state.isSticky && true !== this.state.firstLoad)) {
      this.elClasses.remove(this.settings.stickyClass)
      this.elClasses.add(this.settings.bottomClass)
      this.setState({
        isSticky: false,
        firstLoad: false
      })
      this.settings.onUnstick()
    }
  }
}


export default WorkSticky
