import React, { Component } from 'react'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'
import Img from 'gatsby-image'

import './serviceFloat.css'
import CustomButton from '../button/button'
import InternalLink from '../../helper/links/InternalLink'

class ServiceFloat extends Component {
  slideAnimation = animations('SLIDE')

  render() {
    const { data, servicePosition, onService } = this.props

    return (
      <div className={`service-float ${onService && 'show'}`}>
        <div className="service-head content-container">
          <h2 className={`service-title type-h11`}>
            <SplitText
              initialPose="exit"
              withParent={false}
              pose={onService ? 'enter' : 'exit'}
              charPoses={this.slideAnimation}
            >
              {data.servicesTitle}
            </SplitText>
          </h2>
        </div>

        <div className="service-sections content-container">
          <section className="website block">
            <div
              className={`bg-text type-bg2 animation ${servicePosition === 1 &&
              'animation-appear'}`}
            >
              <div className="bg-text-wrapper">
                设计
                {/*Webs<p className="hidden-letter">ites</p>*/}
              </div>
            </div>
            <div
              className={`bg-text type-bg2 point-text animation ${servicePosition ===
              1 && 'animation-appear'}`}
            >
              <div className="bg-text-wrapper">
                {/*<p className="hidden-letter">Webs</p>ites*/}
                设计
              </div>
            </div>
            <div>
              <div className="block-name type-bg2">Website</div>
              <div className="key-image-container">
                <div className={`key-image ${servicePosition === 1 && 'show'}`}>
                  {/*<Img fixed={data.websiteImage.fixed} />*/}
                </div>
              </div>
              <div
                className={`text-block animation ${servicePosition === 1 &&
                'animation-appear'}`}
              >
                {data.websiteDescription}
              </div>
            </div>
          </section>
          <section className="creative block">
            <div
              className={`bg-text type-bg2 animation ${servicePosition === 2 &&
              'animation-appear'}`}
            >
              <div className="bg-text-wrapper">
                创新
                {/*Creat<p className="hidden-letter">ive</p>*/}
              </div>
            </div>
            <div
              className={`bg-text type-bg2 point-text animation ${servicePosition ===
              2 && 'animation-appear'}`}
            >
              <div className="bg-text-wrapper">
                创新
                {/*<p className="hidden-letter">Creat</p>ive*/}
              </div>
            </div>
            <div>
              <div className="block-name type-bg2">Creative</div>
              <div className="key-image-container">
                <div className={`key-image ${servicePosition === 2 && 'show'}`}>
                  {/*<Img fixed={data.creativeImage.fixed} />*/}
                </div>
              </div>
              <div
                className={`text-block animation ${servicePosition === 2 &&
                'animation-appear'}`}
              >
                {data.creativeDescription}
              </div>
            </div>
          </section>
          <section className="strategy block">
            <div
              className={`bg-text type-bg2 animation ${servicePosition === 3 &&
              'animation-appear'}`}
            >
              <div className="bg-text-wrapper">
                策略
                {/*Strat<p className="hidden-letter">egy</p>*/}
              </div>
            </div>
            <div
              className={`bg-text type-bg2 point-text animation ${servicePosition ===
              3 && 'animation-appear'}`}
            >
              <div className="bg-text-wrapper">
                策略
                {/*<p className="hidden-letter">Strat</p>egy*/}
              </div>
            </div>
            <div>
              <div className="block-name type-bg2">Strategy</div>
              <div className="key-image-container">
                <div className={`key-image ${servicePosition === 3 && 'show'}`}>
                  {/*<Img fixed={data.strategyImage.fixed} />*/}
                </div>
              </div>
              <div
                className={`text-block animation ${servicePosition === 3 &&
                'animation-appear'}`}
              >
                {data.strategyDescription}
              </div>
            </div>
          </section>
          <div className="more-wrapper block">
            <div className={`services-view-more ${onService && 'enable'}`}>
              <InternalLink to="/services">
                <CustomButton theme="black" animate={onService}>
                  查看我们的服务
                </CustomButton>
              </InternalLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceFloat
