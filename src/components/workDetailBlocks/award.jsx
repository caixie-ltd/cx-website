import React from 'react'
import ExternalLink from '../../helper/links/ExternalLink'
import { Awwwards } from '../svg/assets'
import './award.css'

const Award = prop => {
  const { data } = prop

  return (
    <div className="award-container">
      <ExternalLink href={data.link} target="_blank">
        <div className="award-wrapper">
          <div className="award-label type-sub4">{data.label}</div>
          <Awwwards className="award-badge" />
        </div>
      </ExternalLink>
    </div>
  )
}

export default Award
