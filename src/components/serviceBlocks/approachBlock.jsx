import React from "react"
import Circle from "../graphic/circle"
import Sparks from "../graphic/sparks"

// import "./approachBlock.css"
import Parallax from "../../helper/parallax"
import VisibilityWrapper from "../../helper/visibilityWrapper"
import SplitText from "react-pose-text"
import { animations } from "../../helper/variables"
import { MobileView } from "react-device-detect"
import LottieWrapper from "../common/lottieWrapper"

const ariseAnimation = animations("ARISE")

const ApproachBlock = props => {
  const { theme, page, momentumScrollValue } = props

  return (
    <div className={`content-container section-approach color-white`}>
      <div className="approach-circle">
        <Circle theme={theme}/>
      </div>
      <div className="approach-spark">
        <Parallax
          viewportScroll={momentumScrollValue}
          moveRange="200"
          disabledOnMobile
        >
          <Sparks type="1"/>
        </Parallax>
      </div>
      <MobileView>
        <div className="approach-title">
          <h2 className="type-h1">
            <VisibilityWrapper>
              {({ isVisible }) => {
                return (
                  <SplitText
                    initialPose="exit"
                    withParent={false}
                    pose={isVisible ? "enter" : "exit"}
                    charPoses={ariseAnimation}
                  >
                    {page.approachTitle}
                  </SplitText>
                )
              }}
            </VisibilityWrapper>
          </h2>
        </div>
      </MobileView>
      <div className="approach-list">
        <ul className="approaches">
          {page.approaches.map(approach => (
            <li key={approach.id}>
              <VisibilityWrapper partialVisibility={true}>
                {({ isVisible }) => {
                  return (
                    <div>
                      <div
                        className={`icon-container animation ${isVisible &&
                        "animation-appear"}`}
                      >
                        <LottieWrapper
                          width={150}
                          height={150}
                          path={approach.animation.file.url}
                        />
                      </div>
                      <h3 className="title type-h6">
                        <SplitText
                          initialPose="exit"
                          pose={isVisible ? "enter" : "exit"}
                          withParent={false}
                          charPoses={ariseAnimation}
                        >
                          {approach.title}
                        </SplitText>
                      </h3>
                      <div
                        className={`description animation ${isVisible &&
                        "animation-appear"}`}
                      >
                        {approach.description}
                      </div>
                    </div>
                  )
                }}
              </VisibilityWrapper>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ApproachBlock
