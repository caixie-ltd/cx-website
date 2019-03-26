import React from 'react'
import { animations } from '../../helper/variables'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import SplitText from 'react-pose-text'
// import './approachTitle.css'

const ariseAnimation = animations('ARISE')

const ApproachTitle = props => {
  return (
    <div className="approach-title-container">
      <div className="content-container">
        <h2 className="type-h1 approach-title color-white">
          <VisibilityWrapper>
            {({ isVisible }) => {
              return (
                <SplitText
                  initialPose="exit"
                  withParent={false}
                  pose={props.trigger ? 'enter' : 'exit'}
                  charPoses={ariseAnimation}
                >
                  {props.title}
                </SplitText>
              )
            }}
          </VisibilityWrapper>
        </h2>
      </div>
    </div>
  )
}

export default ApproachTitle
