import React from 'react'
import Img from 'gatsby-image'

// import './collaborateBlock.css'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'
import { MobileView, BrowserView } from 'react-device-detect'

const ariseAnimation = animations('ARISE')

const CollaborateBlock = props => {
  const { page } = props

  return (
    <div className={`content-container section-collaborate`}>
      <div className="title">
        <BrowserView>
          <h2 className="type-h1">
            <VisibilityWrapper partialVisibility={true}>
              {({ isVisible }) => {
                return (
                  <SplitText
                    initialPose="exit"
                    pose={isVisible ? 'enter' : 'exit'}
                    withParent={false}
                    charPoses={ariseAnimation}
                  >
                    {page.collaborateTitle}
                  </SplitText>
                )
              }}
            </VisibilityWrapper>
          </h2>
        </BrowserView>
      </div>
      <div className="content">
        <div className="image-block">
          <VisibilityWrapper partialVisibility={true}>
            {({ isVisible }) => {
              return (
                <div
                  className={`image-container ${isVisible && 'show'} no-hover`}
                >
                  <div className="image-wrapper">
                    <Img fluid={page.collaborateKeyImage.fluid} />
                  </div>
                </div>
              )
            }}
          </VisibilityWrapper>
        </div>
        <div className="text-block">
          <MobileView>
            <h2 className="type-h1">
              <VisibilityWrapper partialVisibility={true}>
                {({ isVisible }) => {
                  return (
                    <SplitText
                      initialPose="exit"
                      pose={isVisible ? 'enter' : 'exit'}
                      withParent={false}
                      charPoses={ariseAnimation}
                    >
                      {page.collaborateTitle}
                    </SplitText>
                  )
                }}
              </VisibilityWrapper>
            </h2>
          </MobileView>
          <VisibilityWrapper partialVisibility={true}>
            {({ isVisible }) => {
              return (
                <div>
                  <h3 className="type-h6 type-title">
                    <SplitText
                      initialPose="exit"
                      pose={isVisible ? 'enter' : 'exit'}
                      withParent={false}
                      charPoses={ariseAnimation}
                    >
                      {page.collaborateSubscriptionTitle}
                    </SplitText>
                  </h3>
                  <div
                    className={`type-description animation ${isVisible &&
                    'animation-appear'}`}
                  >
                    {page.collaborateSubscriptionDescription}
                  </div>
                </div>
              )
            }}
          </VisibilityWrapper>
          <VisibilityWrapper partialVisibility={true}>
            {({ isVisible }) => {
              return (
                <div>
                  <h3 className="type-h6 type-title">
                    <SplitText
                      initialPose="exit"
                      pose={isVisible ? 'enter' : 'exit'}
                      withParent={false}
                      charPoses={ariseAnimation}
                    >
                      {page.collaborateProjectTitle}
                    </SplitText>
                  </h3>
                  <div
                    className={`type-description animation ${isVisible &&
                    'animation-appear'}`}
                  >
                    {page.collaborateProjectDescription}
                  </div>
                </div>
              )
            }}
          </VisibilityWrapper>
        </div>
      </div>
    </div>
  )
}

export default CollaborateBlock
