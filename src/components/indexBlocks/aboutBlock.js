import React from "react"
import VisibilityWrapper from "../../helper/visibilityWrapper"
import TimelineBlock from "./timelineBlock"
import ImgSplit from "../imgSplit/imgSplit"
const aboutCover = "/assets/cover.jpg"

const AboutBlock = props => {
  return (
    <VisibilityWrapper partialVisibility={true}>
      {({ isVisible }) => {
        return (
          <ImgSplit
            img={aboutCover}
            heading={`我们是一家专注于提供:产品技术创新服务的公司`}
            body={`我们的发展离不开满意的客户和满意的员工`}
            ctaTo={`/aboutus`}
            ctaText={`关于我们`}>
            <TimelineBlock/>
          </ImgSplit>
        )
      }}
    </VisibilityWrapper>
  )
}
export default AboutBlock

