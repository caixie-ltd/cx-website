/* eslint-disable */
import React from "react"
import VisibilityWrapper from "../../helper/visibilityWrapper"
// import { animations } from "../../helper/variables"

// const slideAnimation = showHomepageLoading => animations("SLIDE", showHomepageLoading)
// const ariseAnimation = showHomepageLoading => animations("ARISE", showHomepageLoading)
import cls from "./hero.module.scss"
import HeroScene from "../HeroScene"

const HeroBLock = props => {
  // const { theme, data, momentumScrollValue, showHomepageLoading } = props

  return (
    <VisibilityWrapper paritalVisibility={true}>
      {({ isVisible }) => {
        return (
          <div className={cls.hero}>
            {props.isHome && <HeroScene/>}
            <div className={cls.hero__container}>
              <div className={cls.hero__header}>
                {
                  props.headline &&
                  <React.Fragment>
                    <h1 className={cls.hero__headline}>
                      {props.headline}
                    </h1>
                    < div className={cls.hero__underline}>
                      <img src="/assets/squiggle-white.svg" alt=""/>
                    </div>
                  </React.Fragment>
                }
                {
                  props.isHome &&
                  <React.Fragment>
                    <p className={cls.hero__greeting}>
                      您好!&nbsp;&nbsp;&nbsp;<span role="img">👋</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p className={cls.hero__greeting}>
                      我们是采撷科技：
                    </p>
                    <h1 className={cls.hero__work}>
                      提供人性化的设计 & 技术开发服务
                    </h1>
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
        )
      }}
    </VisibilityWrapper>
  )
}

export default HeroBLock
