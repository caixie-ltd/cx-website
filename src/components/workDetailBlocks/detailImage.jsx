import React, { Component } from 'react'
import VisibilityWrapper from '../../helper/visibilityWrapper'

class DetailImage extends Component {
  state = {
    loaded: false,
  }

  onLoaded = () => {
    this.setState({
      loaded: true,
    })
  }

  render() {
    const { data, noSwipe } = this.props
    const { loaded } = this.state

    return (
      <div
        style={{
          maxWidth: `${data.details.image.width}px`,
          margin: '0 auto',
        }}
      >
        <VisibilityWrapper partialVisibility={true}>
          {({ isVisible }) => {
            return (
              <div
                className={`detail-image-wrapper ${isVisible &&
                loaded &&
                'appear'} ${noSwipe && 'no-swipe'}`}
              >
                <div
                  style={{
                    paddingTop: `${(data.details.image.height /
                      data.details.image.width) *
                    100}%`,
                  }}
                />
                <img src={data.url} alt="" onLoad={this.onLoaded} />
              </div>
            )
          }}
        </VisibilityWrapper>
      </div>
    )
  }
}

export default DetailImage
