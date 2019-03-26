import React from 'react'

import './serviceIndicator.css'

const ServiceIndicator = props => {
  const { servicePosition, onService } = props

  return (
    <div className={`service-indicator ${onService && 'show'}`}>
      <ul>
        <li className={`section-name ${servicePosition === 1 && 'selected'}`} />
        <li className={`section-name ${servicePosition === 2 && 'selected'}`} />
        <li className={`section-name ${servicePosition === 3 && 'selected'}`} />
      </ul>
    </div>
  )
}

export default ServiceIndicator
