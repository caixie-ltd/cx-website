import React from 'react'
import { animations } from '../../helper/variables'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import Sparks from '../graphic/sparks'
import SplitText from 'react-pose-text'
import './statementBlock.css'
import Parallax from '../../helper/parallax'
import CustomButton from '../button/button'
import InternalLink from '../../helper/links/InternalLink'

const StatementBlock = props => {
  const { data, momentumScrollValue } = props

  const slideAnimation = animations('SLIDE')
  const ariseAnimation = animations('ARISE')

  return (
    <div className="about-statement content-container">
      <Parallax
        viewportScroll={momentumScrollValue}
        moveRange="200"
        disabledOnMobile
      >
        <Sparks type="3" className="spark3" />
      </Parallax>
      <div>
        <VisibilityWrapper partialVisibility={true}>
          {({ isVisible }) => {
            return (
              <div>
                <h2 className={`type-h11 ribbon`}>
                  <SplitText
                    initialPose="exit"
                    withParent={false}
                    pose={isVisible ? 'enter' : 'exit'}
                    charPoses={slideAnimation}
                  >
                    {data.statementRibbonText}
                  </SplitText>
                </h2>
                <div className={`intro-context type-h1 main`}>
                  <SplitText
                    initialPose="exit"
                    withParent={false}
                    pose={isVisible ? 'enter' : 'exit'}
                    charPoses={ariseAnimation}
                  >
                    {data.statementText}
                  </SplitText>
                </div>
              </div>
            )
          }}
        </VisibilityWrapper>
        <VisibilityWrapper partialVisibility={true}>
          {({ isVisible }) => {
            return (
              <div className="more-works">
                <InternalLink to="/work">
                  <CustomButton theme="black" animate={isVisible}>
                    我们的工作
                  </CustomButton>
                </InternalLink>
              </div>
            )
          }}
        </VisibilityWrapper>
      </div>
    </div>
  )
}

export default StatementBlock
