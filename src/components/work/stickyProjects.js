// import { TimelineMax } from "gsap/TimelineMax"
// import { $, $$, $on, anchorScroll, debounce } from "../helper/help"
// import { Power4 } from "gsap/TweenLite"
// import Sticky from "./sticky"
import { Component } from "react"
// import Layout from "../pages/project"
import React from "react"
import { TimelineMax } from "gsap/TimelineMax"
import { Power4 } from "gsap"
// import { $, $$ } from "../../helper/help"

import cls from "./workProject.module.scss"
import IconButton from "../iconButton/iconButton"

const projectStyle = {
  visibility: "inherit",
  opacity: 0,
  transform: "matrix(1, 0, 0, 1, 0, 0)",
}

class StickyProjects extends Component {
  constructor(props) {
    super(props)
    this.parent = this.props.parentRect
    this.bottomOffset = 0
    this.containerRef = React.createRef()
    this.wiperRef = React.createRef()
    this.projectsRef = React.createRef()
    this.currentAnimation = null
    this.prevIndex = null
  }

  componentDidMount() {
    this.projects = []
    const childrenArray = this.projectsRef.current.children
    for (let i = 1; i < childrenArray.length; i++) {
      this.projects.push(childrenArray[i])
    }
    this.wiper = this.wiperRef.current
  }

  animateProjects = (project) => {
    const prevProject = this.projects[this.prevIndex || 0]
    if (this.currentAnimation) {
      const seekBackToTime = this.currentAnimation.totalDuration()
      this.currentAnimation.seek(seekBackToTime, false)
    }
    const timeline = new TimelineMax({
      force3D: true,
      onComplete: () => {
        this.currentAnimation = null
      },
    })

    timeline.to(this.wiper, .01, {
      transformOrigin: "100% 100%",
    }, 0).to(project, .01, {
      autoAlpha: 0,
    }, 0)
    if (prevProject) {
      timeline.to(prevProject, .2, {
        y: -22,
        autoAlpha: 0,
        scale: .98,
        ease: Power4.easeOut,
      }, 0)

      timeline.to(this.wiper, .2, {
        scaleY: 1,
        ease: Power4.easeOut,
      }, 0).to(this.wiper, .01, {
        transformOrigin: "0 0",
        ease: Power4.easeOut,
      }, "+=0").to(this.wiper, .3, {
        scaleY: 0,
        ease: Power4.easeOut,
      }, "+=0").fromTo(project, .8, {
        autoAlpha: 0,
        y: 22,
        scale: 1.01,
        ease: Power4.easeOut,
      }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: Power4.easeOut,
      }, "-=.3")
      this.currentAnimation = timeline
    }
  }

  render() {
    const { projects, onWork, currentIndex } = this.props
    if ((onWork && currentIndex) || currentIndex === 0) {
      const project = this.projects[currentIndex]
      if (this.prevIndex !== currentIndex) {
        this.animateProjects(project)
      }
      this.prevIndex = currentIndex
    }
    return (
      <div
        className={cls.work__stickyProjects}
        ref={this.containerRef}>
        <div
          className={cls.work__projects}
          ref={this.projectsRef}>
          <div
            className={cls.work__wiper}
            ref={this.wiperRef}/>
          {projects.map((project, index) => (
            <div className={`${cls.work__project} ${this.prevIndex === index ? "" : cls.work__projectIsHidden}`}
                 key={index}
                 style={projectStyle}>
              <span className={cls.work__heading}>
                特色案例
              </span>
              <h2 className={cls.work__name}>
                {project.title}
              </h2>
              <ul className={cls.work__services}>
                {project.services.map((service, index) => (
                  <li className={cls.work__service}
                      key={index}>
                    {service}
                  </li>
                ))}
              </ul>
              <div className={cls.work__studyButton}>
                <IconButton
                  type="arrow"
                  label="查看案例"
                  to={`/case-study/${project.slug}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

}

export default StickyProjects
