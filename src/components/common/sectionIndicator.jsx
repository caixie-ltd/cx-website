import React from 'react'

import './sectionIndicator.css'

const SectionIndicator = props => {
  return (
    <div className={`section-indicator type-comp3 on-${props.theme}`}>
      {props.children}
    </div>
  )
}

export default SectionIndicator
