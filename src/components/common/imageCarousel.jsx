import React, { Component } from 'react'
import Img from 'gatsby-image'
import _ from 'lodash'

import './imageCarousel.css'
import SplitText from 'react-pose-text'
import { easeFunction } from '../../helper/variables'
import VisibilityWrapper from '../../helper/visibilityWrapper'

const pages = {
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      ease: easeFunction(),
      duration: 900,
    },
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      ease: easeFunction(),
      duration: 900,
    },
  },
}

class ImageCarousel extends Component {
  state = {}
  render() {
    const { images, currentPage, totalPages } = this.props

    return (
      <VisibilityWrapper partialVisibility={true}>
        {({ isVisible }) => {
          return (
            <div className={`image-carousel ${isVisible && 'appear'}`}>
              <ul className={`image-current`}>
                {images.map((image, index) => {
                  const idx = index + 1

                  return (
                    <li
                      key={image.id}
                      className={`carousel-image carousel-image-${idx} ${idx ===
                      currentPage && 'selected'}`}
                    >
                      <Img fluid={image.fluid} />
                    </li>
                  )
                })}
              </ul>

              <div className="number-container type-h1">
                <ul className="numbers">
                  {images.map((image, index) => {
                    return (
                      <li key={image.id}>
                        <SplitText
                          initialPose="exit"
                          withParent={false}
                          pose={index + 1 === currentPage ? 'enter' : 'exit'}
                          charPoses={pages}
                        >
                          {_.padStart(index + 1, 2, '0')}
                        </SplitText>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <ul className="image-next">
                {images.map((image, index) => {
                  const idx = index + 1
                  const nextPage =
                    currentPage + 1 > totalPages ? 1 : currentPage + 1

                  return (
                    <li
                      key={image.id}
                      className={`carousel-image ${idx === nextPage &&
                      'selected'}`}
                    >
                      <Img fluid={image.fluid} />
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }}
      </VisibilityWrapper>
    )
  }
}

export default ImageCarousel
