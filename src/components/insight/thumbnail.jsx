import React, { Component } from 'react'
import InternalLink from '../../helper/links/InternalLink.jsx'

import './thumbnail.css'
import VisibilityWrapper from '../../helper/visibilityWrapper.jsx'

class Thumbnail extends Component {
  state = {
    doHover: false,
  }

  hoverImage = event => {
    this.setState({
      doHover: true,
    })
  }

  leaveImage = () => {
    this.setState({
      doHover: false,
    })
  }

  render() {
    const { data, className } = this.props
    const { doHover } = this.state

    return (
      <article className={`insights-thumbnail-container ${className}`}>
        <VisibilityWrapper partialVisibility={true}>
          {({ isVisible }) => {
            return (
              <InternalLink to={`/blog/${data.slug}`}>
                <div
                  className={`image-container ${isVisible &&
                  'show'} ${doHover && 'hover'}`}
                >
                  <div className="image-wrapper">
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${data.keyImage.fluid.src})`,
                      }}
                    />
                  </div>
                </div>
                <div
                  className="label"
                  onMouseEnter={this.hoverImage}
                  onMouseLeave={this.leaveImage}
                >
                  <h4 className="type-sub5 category">{data.category}</h4>
                  <h5 className="type-h9 title">{data.title}</h5>
                </div>
              </InternalLink>
            )
          }}
        </VisibilityWrapper>
      </article>
    )
  }
}

export default Thumbnail
