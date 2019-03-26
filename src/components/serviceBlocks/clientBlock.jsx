import React from 'react'
import Img from 'gatsby-image'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'
import { BrowserView, MobileView } from 'react-device-detect'

const ariseAnimation = animations('ARISE')

const ClientBlock = props => {
  const { page } = props

  return (
    <div className="clients-list">
      <div className="content-container">
        <h2 className="type-h1 clients-list-title">
          <VisibilityWrapper>
            {({ isVisible }) => {
              return (
                <SplitText
                  initialPose="exit"
                  pose={isVisible ? 'enter' : 'exit'}
                  withParent={false}
                  charPoses={ariseAnimation}
                >
                  {page.clientsListTitle}
                </SplitText>
              )
            }}
          </VisibilityWrapper>
        </h2>
        <ul className="clients">
          {page.clients.map(client => (
            <li key={client.id} className="client-logo">
              <VisibilityWrapper>
                {({ isVisible }) => {
                  return (
                    <div
                      className={`animation ${isVisible && 'animation-appear'}`}
                    >
                      <BrowserView>
                        <Img fixed={client.fixed} />
                      </BrowserView>
                      <MobileView>
                        <Img fluid={client.fluid} />
                      </MobileView>
                    </div>
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

export default ClientBlock
