import React from "react"
import VisibilityWrapper from "../../helper/visibilityWrapper"
import { animations } from "../../helper/variables"
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
          <section className="hero">
            <div className="hero__header">
              <p className="hero__greeting">
                您好!&nbsp;&nbsp;&nbsp;👋&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <p className="hero__greeting">
                我们是一家这样的机构：
              </p>
              <h1 className="hero__work">
                提供人性化的设计 & <br/>技术开发
              </h1>
            </div>
            <div className="hero__pull-down"/>
          </section>
        )
      }}
    </VisibilityWrapper>
  )
}
export default HeroBlock

