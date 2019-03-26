import React from 'react'
import posed from 'react-pose'
import SplitText from 'react-pose-text'
import _ from 'lodash'

import './benefitsBG.css'
import { animations, easeFunction } from '../../helper/variables'

const Circle = posed.div({
  exit: {
    opacity: 0,
    transition: {
      ease: easeFunction(),
      duration: 900,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      ease: easeFunction(),
      duration: 900,
    },
  },
})

const ariseAnimation = animations('ARISE')

const getCircleSize = (momentumScrollValue, startingPoint) => {
  const difference = (momentumScrollValue - startingPoint) / 50

  return _.clamp(difference, 1, 30)
}

const BenefitsContainer = posed.div({
  exit: {},
  enter: {},
})

const BenefitsBg = props => {
  const { page, momentumScrollValue, onValues, startingPoint, isReady } = props

  return (
    <BenefitsContainer
      initialPose="exit"
      pose={onValues ? 'enter' : 'exit'}
      withParent={false}
      className={`benefits-bg ${isReady && 'ready'}`}
    >
      <Circle className="circle-container">
        <div
          className="value-circle"
          style={{
            transform: `scale(${getCircleSize(
              momentumScrollValue,
              startingPoint
            )})`,
          }}
        />
      </Circle>
      <div className="assets content-container">
        <h2 className="type-h1 value-title">
          <SplitText charPoses={ariseAnimation}>{page.benefitsTitle}</SplitText>
        </h2>
      </div>
    </BenefitsContainer>
  )
}

export default BenefitsBg
