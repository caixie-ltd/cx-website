import React from 'react'
import InternalLink from '../../helper/links/InternalLink'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'

const ariseAnimation = animations('ARISE')

const ServiceBlock = props => {
  const { page, services } = props

  return (
    <div className="service-list">
      <div className="content-container">
        <h2 className="type-h1 service-list-title">
          <VisibilityWrapper>
            {({ isVisible }) => {
              return (
                <SplitText
                  initialPose="exit"
                  withParent={false}
                  pose={isVisible ? 'enter' : 'exit'}
                  charPoses={ariseAnimation}
                >
                  {page.serviceListTitle}
                </SplitText>
              )
            }}
          </VisibilityWrapper>
        </h2>
        <div className="services-container">
          <VisibilityWrapper partialVisibility={true}>
            {({ isVisible }) => {
              return (
                <div className={`animation ${isVisible && 'animation-appear'}`}>
                  <ul className="services">
                    {services.map(service => (
                      <li key={service.node.id} className="type-tab1">
                        <div className="service-label-wrapper">
                          <div className="service-label">
                            <InternalLink to={`/${service.node.slug}`}>
                              {service.node.title}
                            </InternalLink>
                          </div>
                          <div className="hover" />
                        </div>
                        <span className="icon-plus" />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }}
          </VisibilityWrapper>
        </div>
      </div>
    </div>
  )
}

export default ServiceBlock
