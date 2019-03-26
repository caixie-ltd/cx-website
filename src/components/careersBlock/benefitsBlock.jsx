import React from 'react'

import './benefitsBlock.css'
import Sparks from '../graphic/sparks'
import Parallax from '../../helper/parallax'
import { MobileView } from 'react-device-detect'
import VisibilityWrapper from '../../helper/visibilityWrapper'

const BenefitsBlock = props => {
  const { page, momentumScrollValue } = props

  return (
    <div className="benefits-block-container content-container">
      <div className="value-spark">
        <Parallax
          viewportScroll={momentumScrollValue}
          moveRange="200"
          disabledOnMobile
        >
          <Sparks type="3" />
        </Parallax>
      </div>
      <MobileView>
        <h2 className="type-h1 mobile-benefits-title">{page.benefitsTitle}</h2>
      </MobileView>

      <ul className="benefits-list">
        {page.benefits.map(value => (
          <li key={value.id}>
            <VisibilityWrapper partialVisibility={true}>
              {({ isVisible }) => {
                return (
                  <div
                    className={`animation animation-${isVisible && 'appear'}`}
                  >
                    <h3 className="type-h7 value">{value.title}</h3>
                    <div className="value-description">{value.description}</div>
                  </div>
                )
              }}
            </VisibilityWrapper>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BenefitsBlock
