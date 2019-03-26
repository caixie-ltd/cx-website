import React from "react"
import { animations } from "../../helper/variables"
import VisibilityWrapper from "../../helper/visibilityWrapper"
import Sparks from "../graphic/sparks"
import SplitText from "react-pose-text"
import "./cta.css"
import Parallax from "../../helper/parallax"
import { StaticQuery, graphql } from "gatsby"
import InternalLink from "../../helper/links/InternalLink"
import CustomButton from "../button/button"
import Circle from "../graphic/circle"

const CTA = props => {
  const { data, momentumScrollValue } = props

  const slideAnimation = animations("SLIDE")

  return (
    <VisibilityWrapper partialVisibility={true}>
      {({ isVisible }) => {
        return (
          <div className="cta-wrapper">
            <div className="cta-circle">
              <Circle lineColor="#ffffff"/>
            </div>
            <Parallax
              viewportScroll={momentumScrollValue}
              moveRange="200"
              disabledOnMobile
            >
              <Sparks type="3" className="spark3"/>
            </Parallax>
            <div>
              <h2 className={`type-h11 color-white ribbon`}>
                <SplitText
                  initialPose="exit"
                  withParent={false}
                  pose={isVisible ? "enter" : "exit"}
                  charPoses={slideAnimation}
                >
                  {data.ctaRibbon}
                </SplitText>
              </h2>
              <div className={`intro-context type-h1 color-white main`}>
                {data.ctaText}
              </div>
              <div className="say-hello">
                <InternalLink to="/lets-talk">
                  <CustomButton theme="red" animate="true">
                    一起聊聊
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

export default props => (
  <StaticQuery
    query={graphql`
      query {
            defaultSettingsJson{
                ctaRibbon
                ctaText
            }
      }
    `}
    render={data => <CTA data={data.defaultSettingsJson} {...props} />}
  />
)
