import React from 'react'
import Sparks from '../graphic/sparks'
import SplitText from 'react-pose-text'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import Parallax from '../../helper/parallax'
import { animations } from '../../helper/variables'

const ariseAnimation = animations('ARISE')
const slideAnimation = animations('SLIDE')

const HeroBlock = props => {
  const { page, momentumScrollValue } = props

  return (
    <div className="content-container top-of-page">
      <Sparks type="3" className="spark" />
      <div className="page-header">
        <div className="header-left">
          <h2 className="type-h11 color-red ribbon-text">
            <SplitText
              initialPose="exit"
              pose="enter"
              charPoses={slideAnimation}
            >
              {page.heroRibbonText}
            </SplitText>
          </h2>
          <VisibilityWrapper>
            {({ isVisible }) => {
              return (
                <h1 className={`type-h3 headline`}>
                  <SplitText
                    initialPose="exit"
                    pose={isVisible ? 'enter' : 'exit'}
                    charPoses={ariseAnimation}
                  >
                    {page.heroHeadline}
                  </SplitText>
                </h1>
              )
            }}
          </VisibilityWrapper>
        </div>
        <div className="header-right">
          <VisibilityWrapper>
            {({ isVisible }) => {
              return (
                <div
                  className={`description type-sub3 animation ${isVisible &&
                  'animation-appear'}`}
                >
                  <Parallax
                    viewportScroll={momentumScrollValue}
                    moveRange="50"
                    disabledOnMobile
                  >
                    {page.heroDescription}
                  </Parallax>
                </div>
              )
            }}
          </VisibilityWrapper>
        </div>
      </div>
    </div>
  )
}

export default HeroBlock
