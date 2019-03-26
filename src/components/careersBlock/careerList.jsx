import React from "react"

import "./careerList.css"
import InternalLink from "../../helper/links/InternalLink"
import SplitText from "react-pose-text"
import { animations } from "../../helper/variables"
import VisibilityWrapper from "../../helper/visibilityWrapper"

const CareerList = props => {
  const { page, careers } = props
  const ariseAnimation = animations("ARISE")

  return (
    <div className="career-list-container content-container">
      <div className="career-list-wrapper">
        <VisibilityWrapper partialVisibility={true}>
          {({ isVisible }) => {
            return (
              <h3 className="type-h1">
                <SplitText
                  initialPose="exit"
                  pose={isVisible ? "enter" : "exit"}
                  withParent={false}
                  charPoses={ariseAnimation}
                >
                  {page.careerListTitle}
                </SplitText>
              </h3>
            )
          }}
        </VisibilityWrapper>
        <ul className="career-list">
          {careers.map((position, index) => (
            <li key={index}>
              <VisibilityWrapper partialVisibility={true}>
                {({ isVisible }) => {
                  return (
                    <InternalLink to={`/careers/${position.node.slug}`}>
                      <div
                        className={`position animation animation-${isVisible &&
                        "appear"}`}
                      >
                        <div className="info">
                          <h4 className="type-h6 position-title">
                            <div className="text">{position.node.title}</div>
                            <div className="hover"/>
                          </h4>
                          <div className="department type-sub3">
                            {position.node.department}
                          </div>
                        </div>
                        <div className="button-area">
                          <div className="icon-plus"/>
                        </div>
                      </div>
                    </InternalLink>
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

export default CareerList
