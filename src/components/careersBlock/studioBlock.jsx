import React, { Component } from 'react'
import ImageCarousel from '../common/imageCarousel'
import _ from 'lodash'

import './studioBlock.css'
import Sparks from '../graphic/sparks'
import ExternalLink from '../../helper/links/ExternalLink'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'

class StudioBlock extends Component {
  ariseAnimation = animations('ARISE')

  state = {
    currentPage: 1,
    totalPages: 0,
    rollTimer: undefined,
    rollInterval: 4000,
  }

  constructor(props) {
    super(props)

    this.progressBar = React.createRef()
  }

  componentDidMount() {
    this.setState({
      totalPages: this.props.page.studioImages.length,
      rollTimer: setInterval(this.rollImages, this.state.rollInterval),
    })
    this.rollImages()
  }

  rollImages = () => {
    this.turnPage('right')

    this.progressBar.current.style.transitionDuration = `${this.state
      .rollInterval / 1000}s`
    this.progressBar.current.style.transform = `scale(1, 1)`
  }

  componentWillUnmount() {
    clearInterval(this.state.rollTimer)
  }

  getIndicatorProgress = () => {
    const { currentPage, totalPages } = this.state

    return _.clamp(currentPage / totalPages, 0, 1)
  }

  toggleCarousel = event => {
    if (event.currentTarget.classList.contains('left')) {
      this.turnPage('left')
    } else {
      this.turnPage('right')
    }
  }

  turnPage = direction => {
    this.progressBar.current.style.transitionDuration = `0s`
    this.progressBar.current.style.transform = `scale(0, 1)`

    if (direction === 'left') {
      this.setState({
        currentPage:
          this.state.currentPage - 1 < 1
            ? this.state.totalPages
            : this.state.currentPage - 1,
      })
    } else {
      this.setState({
        currentPage:
          this.state.currentPage + 1 > this.state.totalPages
            ? 1
            : this.state.currentPage + 1,
      })
    }
  }

  render() {
    const { page } = this.props
    const { currentPage, totalPages } = this.state

    return (
      <div className="studio-block-container content-container">
        <div className="studio-info">
          <VisibilityWrapper partialVisibility={true}>
            {({ isVisible }) => {
              return (
                <div>
                  <h2 className={`type-h1 studio-title color-black`}>
                    <SplitText
                      initialPose="exit"
                      pose={isVisible ? 'enter' : 'exit'}
                      withParent={false}
                      charPoses={this.ariseAnimation}
                    >
                      {page.studioTitle}
                    </SplitText>
                  </h2>
                  <div
                    className={`studio-description color-black animation animation-${isVisible &&
                    'appear'}`}
                  >
                    {page.studioDescription}
                  </div>
                </div>
              )
            }}
          </VisibilityWrapper>
          <div className="carousel-indicator type-comp3">
            <ExternalLink
              to="#"
              className="button-arrow left"
              onClick={this.toggleCarousel}
            />
            <div className="indicator-current">
              {_.padStart(currentPage, 2, '0')}
            </div>
            <div className="indicator-timer">
              <div className="progress" ref={this.progressBar} />
            </div>
            <div className="indicator-total">
              {_.padStart(totalPages, 2, '0')}
            </div>
            <ExternalLink
              to="#"
              className="button-arrow right"
              onClick={this.toggleCarousel}
            />
          </div>
        </div>
        <div className="carousel-container">
          <ImageCarousel
            images={page.studioImages}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <Sparks type="3" className="carousel-spark" />
        </div>
      </div>
    )
  }
}

export default StudioBlock
