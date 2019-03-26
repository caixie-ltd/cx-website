import React from "react"
// import Sparks from "../graphic/sparks"

import cls from "./introBlock.module.scss"
// import SplitText from "react-pose-text"
import VisibilityWrapper from "../../helper/visibilityWrapper"
// import { animations } from "../../helper/variables"

const IntroBlock = props => {
  // const { data } = props

  // const slideAnimation = animations("SLIDE")

  return (
    <VisibilityWrapper partialVisibility={true}>
      {({ isVisible }) => {
        return (
          <div className={cls.intro}>
            <div className={cls.intro__container}>

              <p className={cls.intro__text}>
                我们提供 <span className={cls.intro__emphasized}>移动端应用、网络系统开发，</span>
                <br/>包含 <span className={cls.intro__emphasized}>用户体验设计、用户界面设计;</span>
                <br/>
                和 <span className={cls.intro__emphasized}>互联网产品咨询服务。</span>
              </p>

            </div>
          </div>
        )
      }}
    </VisibilityWrapper>
  )
}

export default IntroBlock
