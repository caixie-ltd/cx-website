import React from "react"
import VisibilityWrapper from "../../helper/visibilityWrapper"

const HeroBlock = props => {
  return (
    <VisibilityWrapper partialVisibility={true}>
      {({ isVisible }) => {
        return (
          <section className="hero">
            <div className="hero__header">
              <h1 className="hero__headline">
                请看，这里是我们的工作
              </h1>
              <div className="hero__underline">
                <img src="/assets/squiggle-white.svg" />
              </div>
            </div>
            <div className="hero__pull-down"/>
          </section>
        )
      }}
    </VisibilityWrapper>
  )
}
export default HeroBlock

