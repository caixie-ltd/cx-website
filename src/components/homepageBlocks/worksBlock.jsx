import React from 'react'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import SplitText from 'react-pose-text'
import InternalLink from '../../helper/links/InternalLink.jsx'
import CustomButton from '../button/button'
import Thumbnail from '../work/thumbnail'
import { animations } from '../../helper/variables'

import './worksBlock.css'
import Parallax from '../../helper/parallax'

const ariseAnimation = animations('ARISE')

const WorksBlock = props => {
  const { theme, data, works, momentumScrollValue } = props

  return (
    <div className="works-content">
      <VisibilityWrapper>
        {({ isVisible }) => {
          return (
            <div className="works-head">
              <div className="works-head-left">
                <h2 className={`works-title type-h1`}>
                  <SplitText
                    initialPose="exit"
                    withParent={false}
                    pose={isVisible ? 'enter' : 'exit'}
                    charPoses={ariseAnimation}
                  >
                    {data.worksTitle}
                  </SplitText>
                </h2>
                <p className={`animation ${isVisible && 'animation-appear'}`}>
                  {data.worksDescription}
                </p>
              </div>
            </div>
          )
        }}
      </VisibilityWrapper>
      <div className="works-list">
        {works.map((work, index) => {
          if (index % 2 === 1) {
            return (
              <Parallax
                key={work.node.id}
                viewportScroll={momentumScrollValue}
                moveRange="200"
                disabledOnMobile
              >
                <Thumbnail data={work.node} className="even" />
              </Parallax>
            )
          } else {
            return <Thumbnail key={work.node.id} data={work.node} />
          }
        })}
      </div>
      <VisibilityWrapper>
        {({ isVisible }) => {
          return (
            <div className="works-view-more">
              <InternalLink to="/work">
                <CustomButton
                  theme={theme === 'black' ? 'white' : 'black'}
                  animate={isVisible}
                >
                  查看更多案例
                </CustomButton>
              </InternalLink>
            </div>
          )
        }}
      </VisibilityWrapper>
    </div>
  )
}

export default WorksBlock
