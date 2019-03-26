import React, { Component } from 'react'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'
import InternalLink from '../../helper/links/InternalLink'
import CustomButton from '../button/button'

import './insightsBlock.css'
import Thumbnail from '../insight/thumbnail'
import Parallax from '../../helper/parallax'

const ariseAnimation = animations('ARISE')

class InsightsBlock extends Component {
  state = {}
  render() {
    const { theme, data, insights, momentumScrollValue } = this.props

    return (
      <div className="insights-block">
        <VisibilityWrapper partialVisibility={true}>
          {({ isVisible }) => {
            return (
              <div className="insights-head">
                <div className="insights-head-left">
                  <h2
                    className={`insights-title type-h1 background-is-${theme}`}
                  >
                    <SplitText
                      initialPose="exit"
                      withParent={false}
                      pose={isVisible ? 'enter' : 'exit'}
                      charPoses={ariseAnimation}
                    >
                      {data.insightsTitle}
                    </SplitText>
                  </h2>
                  <p
                    className={`animation ${isVisible &&
                    'animation-appear'} background-is-${theme}`}
                  >
                    {data.insightsDescription}
                  </p>
                </div>
              </div>
            )
          }}
        </VisibilityWrapper>
        <div className="insights-list">
          {insights.map((insight, index) => {
            if (index % 2 === 1) {
              return (
                <Parallax
                  viewportScroll={momentumScrollValue}
                  moveRange="200"
                  key={insight.node.id}
                  disabledOnMobile
                >
                  <Thumbnail data={insight.node} className="even" />
                </Parallax>
              )
            } else {
              return <Thumbnail key={insight.node.id} data={insight.node} />
            }
          })}
        </div>
        <VisibilityWrapper partialVisibility={true}>
          {({ isVisible }) => {
            return (
              <div className="more-button">
                <InternalLink to="/blog">
                  <CustomButton theme="black" animate={isVisible}>
                    View more insights
                  </CustomButton>
                </InternalLink>
              </div>
            )
          }}
        </VisibilityWrapper>
      </div>
    )
  }
}

export default InsightsBlock
