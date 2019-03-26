import React, { Component } from 'react'
import Img from 'gatsby-image'

import './serviceBlock.css'
import { MobileView } from 'react-device-detect'
import CustomButton from '../button/button'
import InternalLink from '../../helper/links/InternalLink'

class ServiceBlock extends Component {
  state = {
    strategyPoint: 0,
    websitePoint: 0,
    creativePoint: 0,
  }

  constructor(props) {
    super(props)

    this.sectionStrategy = React.createRef()
    this.sectionWebsite = React.createRef()
    this.sectionCreative = React.createRef()
  }

  componentDidMount() {
    this.updateServicePoints()

    if (typeof window !== 'undefined')
      window.addEventListener('resize', this.updateServicePoints)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined')
      window.removeEventListener('resize', this.updateServicePoints)
  }

  updateServicePoints = () => {
    const { momentumScrollValue } = this.props

    this.props.updateServicePoints({
      strategyPoint:
        momentumScrollValue +
        this.sectionStrategy.current.getBoundingClientRect().top,
      websitePoint:
        momentumScrollValue +
        this.sectionWebsite.current.getBoundingClientRect().top,
      creativePoint:
        momentumScrollValue +
        this.sectionCreative.current.getBoundingClientRect().top,
    })
  }

  render() {
    const { data } = this.props

    return (
      <div className="service-block">
        <div className="service-head">
          <h2 className={`service-title type-h1`}>{data.servicesTitle}</h2>
          <p>{data.servicesDescription}</p>
        </div>
        <section className="website block" ref={this.sectionWebsite}>
          <div>
            <div className="block-name type-bg2">Website</div>
            <div className="key-image-container">
              <div className={`key-image show`}>
                <Img fixed={data.websiteImage.fixed} />
              </div>
            </div>
            <div className={`text-block `}>{data.websiteDescription}</div>
          </div>
        </section>
        <section className="creative block" ref={this.sectionCreative}>
          <div>
            <div className="block-name type-bg2">Creative</div>
            <div className="key-image-container">
              <div className={`key-image show`}>
                <Img fixed={data.creativeImage.fixed} />
              </div>
            </div>
            <div className={`text-block`}>{data.creativeDescription}</div>
          </div>
        </section>
        <section className="strategy block" ref={this.sectionStrategy}>
          <div>
            <div className="block-name type-bg2">Strategy</div>
            <div className="key-image-container">
              <div className={`key-image show`}>
                <Img fixed={data.strategyImage.fixed} />
              </div>
            </div>
            <div className={`text-block `}>{data.strategyDescription}</div>
          </div>
        </section>
        <MobileView>
          <div className="services-view-more">
            <InternalLink to="/services">
              <CustomButton theme="black" animate="true">
                查看我们的服务
              </CustomButton>
            </InternalLink>
          </div>
        </MobileView>
      </div>
    )
  }
}

export default ServiceBlock
