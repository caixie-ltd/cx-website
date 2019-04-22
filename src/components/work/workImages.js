import { Component } from "react"
import React from "react"
// import { $on, debounce } from "../../helper/help"
import cls from "./workImages.module.scss"
import InternalLink from "../../helper/links/InternalLink"
// import Img from 'gatsby-image'

export default class WorkImages extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    // this.imageContainer = React.createRef()
    // this.state = {
    //   prevDotIndex: null,
    //   workPosition: 0
    // momentumScrollValue: this.props.momentumScrollValue
    // }
    // this.currentIndex
    this.prevDotIndex = null
    this.workPosition = 0
  }

  componentWillUnmount() {

  }

  componentDidMount() {
    this.calculateValues()
    // $on(window, "resize", this.onResize)
    // console.log(this.props.currentIndex + 's-s-s-s-')
  }

  onScroll = event => {
    // requestAnimationFrame(this.toggleActive)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.props.currentIndex && this.props.currentIndex !== this.prevDotIndex) {
    //   console.log('imagevalues..: ' + this[`workImage${this.props.currentIndex}`].getBoundingClientRect().top)
    // }
  }

  onResize() {
    // debounce((canCreateDiscussions) => {
    //   this.calculateValues()
    //   this.toggleActive()
    // }, 200)
  }

  calculateValues = () => {
    const firstImage = this["workImage0"].getBoundingClientRect()
    // const secondImage = this["workImage1"].getBoundingClientRect()
    // const threeImage = this["workImage2"].getBoundingClientRect()
    // console.log(firstImage.top)
    // console.log(secondImage.top)
    // console.log(threeImage.top)
    let workPositionArray = []
    this.props.projects.forEach((project, index) => {
      workPositionArray.push(this[`workImage${index}`].getBoundingClientRect().top)
    })
    this.props.updateWorksPosition(workPositionArray)
    this.windowHalfHeight = window.innerHeight / 2
    this.viewportCenter = this.props.momentumScrollValue + this.windowHalfHeight
    this.firstTop = firstImage.top + this.props.momentumScrollValue
    // console.log("firstTop: " + this.firstTop)

    this.containerHeight = firstImage.height
  }

  toggleActive = () => {
  }

  render() {
    const { projects, onWork, momentumScrollValue } = this.props

    if (onWork) {

      this.viewportCenter = momentumScrollValue + this.windowHalfHeight
      projects.forEach((project, index) => {
        if (this.prevDotIndex !== index &&
          this.viewportCenter > this.firstTop + index * this.containerHeight
          && this.viewportCenter < this.firstTop + (index + 1) * this.containerHeight) {
          this.prevDotIndex = index
          this.workPosition = index
          this.props.updateProjectIndex(index)
        }
      })
    }
    return (
      <div className={cls.workImages}
           ref={this.containerRef}>
        <div className={cls.workBackgroundTransition}/>

        {projects.map((project, index) => (
          <div
            id={project.slug}
            className={cls.workImageContainer}
            key={index}
            ref={(elem) => this[`workImage${index}`] = elem}
          >
            <InternalLink
              className={`${cls.workImage} ${this.workPosition === index ? cls.isVisible : ""}`}
              to={`/case-study/${project.slug}`}
              title={project.title}
              data-bkgcolor="#ff0000"
              style={{ backgroundImage: "url(" + project.cover + ")" }}
            >
              {/*<Img fluid={data.thumbnail.fluid} />*/}

            </InternalLink>
          </div>
        ))}
      </div>
    )
  }

}

