import React from 'react'
import Parallax from '../../helper/parallax'
import Thumbnail from '../work/thumbnail'

import './worksBlock.css'

const WorksBlock = props => {
  const { posts, momentumScrollValue } = props

  return (
    <div className="service-works-block-container">
      <div className="content-container">
        <h2 className="type-h1 service-works-title">Recent work</h2>
        <div className="works-list">
          {posts.map((work, index) => {
            if (index % 2 === 1) {
              return (
                <Parallax
                  key={work.node.id}
                  viewportScroll={momentumScrollValue}
                  moveRange="200"
                  disabledOnMobile
                >
                  <Thumbnail data={work.node} className="even" />
                </Parallax>
              )
            } else {
              return <Thumbnail key={work.node.id} data={work.node} />
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default WorksBlock
