import React from 'react'
// import { B, A, U, N } from '../svg/logo'
import Sparks from '../graphic/sparks'
import Parallax from '../../helper/parallax'
import SplitText from 'react-pose-text'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import InternalLink from '../../helper/links/InternalLink.jsx'
import CustomButton from '../button/button'
import { animations } from '../../helper/variables'

import './heroBlock.css'

const slideAnimation = showHomepageLoading =>
  animations('SLIDE', showHomepageLoading)
const ariseAnimation = showHomepageLoading =>
  animations('ARISE', showHomepageLoading)

const HeroBlock = props => {
  const { theme, data, momentumScrollValue, showHomepageLoading } = props

  return (
    <VisibilityWrapper partialVisibility={true}>
      {({ isVisible }) => {
        return (
          <div className="homepage-hero-content">
            <div className={`background`}>
              <div className="spark1">
                <Parallax
                  viewportScroll={momentumScrollValue}
                  moveRange="500"
                  disabledOnMobile
                >
                  <Sparks type="1" showHomepageLoading={showHomepageLoading} />
                </Parallax>
              </div>
              <div className="spark2">
                <Parallax
                  viewportScroll={momentumScrollValue}
                  moveRange="-200"
                  disabledOnMobile
                >
                  <Sparks type="2" showHomepageLoading={showHomepageLoading} />
                </Parallax>
              </div>
            </div>

            <div className="section-hero-content">
              <h2
                className={`type-h11 color-red ribbon-text hidden-onload ${isVisible &&
                'visible'}`}
              >
                <SplitText
                  initialPose="exit"
                  pose={isVisible ? 'enter' : 'exit'}
                  withParent={false}
                  charPoses={slideAnimation(showHomepageLoading)}
                >
                  {data.heroRibbonText}
                </SplitText>
              </h2>
              <div className="inner">
                <h1
                  className={`type-h3 color-white title hidden-onload ${isVisible &&
                  'visible'}`}
                >
                  <SplitText
                    initialPose="exit"
                    pose={isVisible ? 'enter' : 'exit'}
                    withParent={false}
                    charPoses={ariseAnimation(showHomepageLoading)}
                  >
                    {data.heroHeadline}
                  </SplitText>
                </h1>
                <div
                  className={`description color-white animation ${isVisible &&
                  'animation-appear'} ${showHomepageLoading &&
                  'initial-delay'}`}
                >
                  {data.heroDescription}
                </div>
                <InternalLink to="/about">
                  <CustomButton
                    theme="white"
                    animate={isVisible}
                    delayed={showHomepageLoading}
                  >
                    {data.heroButtonText}
                  </CustomButton>
                </InternalLink>
              </div>
            </div>
          </div>
        )
      }}
    </VisibilityWrapper>
  )
}

export default HeroBlock
