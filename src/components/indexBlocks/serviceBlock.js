import React from "react"
import VisibilityWrapper from "../../helper/visibilityWrapper"

const aboutCover = "/assets/bus.jpg"

const ServiceBlock = props => {
  return (
    <VisibilityWrapper partialVisibility={true}>
      {({ isVisible }) => {
        return (
          <section className="callout services -visible"
                   data-bkg="#f04e30" data-headline="">
            <div className="callout__container">

              <p className="callout__text">
                我们提供 <span className="callout__emphasized">移动端应用、网络系统开发，</span>
                <br/>包含 <span className="callout__emphasized">用户体验设计、用户界面设计;</span>
                <br/>
                和 <span className="callout__emphasized">互联网产品咨询服务。</span>
              </p>

            </div>
          </section>
        )
      }}
    </VisibilityWrapper>
  )
}
export default ServiceBlock

