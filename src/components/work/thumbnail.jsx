import React, { Component } from 'react'
import Img from 'gatsby-image'

import './thumbnail.css'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'
import InternalLink from '../../helper/links/InternalLink'

class Thumbnail extends Component {
  slideAnimation = animations('ARISE')

  state = {}
  render() {
    const { data, className } = this.props

    return (
      <InternalLink
        to={`/work/${data.slug}`}
        className={`thumbnail-container ${className}`}
      >
        <VisibilityWrapper partialVisibility={true} offset={{ top: -100 }}>
          {({ isVisible }) => {
            return (
              <div className={`image-container ${isVisible && 'show'}`}>
                <div className="image-wrapper">
                  <Img fluid={data.thumbnail.fluid} />
                </div>
              </div>
            )
          }}
        </VisibilityWrapper>
        <VisibilityWrapper>
          {({ isVisible }) => {
            return (
              <div className="label">
                <h3 className="type-sub2 project-title">
                  <SplitText
                    initialPose="exit"
                    pose={isVisible ? 'enter' : 'exit'}
                    withParent={false}
                    charPoses={this.slideAnimation}
                  >
                    {data.project}
                  </SplitText>
                </h3>
                <div
                  className={`type-sub3 animation ${isVisible &&
                  'animation-appear'}`}
                >
                  {data.type}
                </div>
              </div>
            )
          }}
        </VisibilityWrapper>
      </InternalLink>
    )
  }
}

export default Thumbnail
