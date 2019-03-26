import React, { Component } from 'react'
import './headBlock.css'
import Circle from '../graphic/circle'
import Sparks from '../graphic/sparks'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'
import VisibilityWrapper from '../../helper/visibilityWrapper'
// nl2br() [1]  ，是一个函数。函数在字符串中的每个新行（\n）之前插入 HTML 换行符（<br> 或 <br />）。
import nl2br from 'react-nl2br'

const ariseAnimation = animations('ARISE')
const slideAnimation = animations('SLIDE')

class HeadBlock extends Component {
  state = {
    heroImageLoaded: false,
  }

  showHeroImage = () => {
    this.setState({
      heroImageLoaded: true,
    })
  }

  render() {
    const { page } = this.props
    const { heroImageLoaded } = this.state

    return (
      <div className="service-detail-head-block-container top-of-page">
        <VisibilityWrapper partialVisibility={true}>
          {({ isVisible }) => {
            return (
              <div className="head-block-1">
                <Circle />
                <div className="detail-spark">
                  <Sparks type="3" />
                </div>
                <div className="head-info">
                  <div className="type-h11 color-red ribbon-text">
                    <SplitText
                      initialPose="exit"
                      pose={isVisible ? 'enter' : 'exit'}
                      charPoses={slideAnimation}
                    >
                      Services
                    </SplitText>
                  </div>

                  <div className="detail-info">
                    <h2 className="type-h3 project">
                      <SplitText
                        initialPose="exit"
                        pose={isVisible ? 'enter' : 'exit'}
                        charPoses={ariseAnimation}
                      >
                        {page.title}
                      </SplitText>
                    </h2>
                    <div className="mobile-hero-image-container">
                      <div
                        className={`head-image-wrapper ${heroImageLoaded &&
                        'appear'}`}
                      >
                        <div
                          className="head-image"
                          style={{
                            backgroundImage: `url(${page.headImage.file.url})`,
                          }}
                        />
                        <img
                          src={page.headImage.file.url}
                          alt=""
                          onLoad={this.showHeroImage}
                          style={{
                            display: 'none',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="head-image-container">
                  <div
                    className={`head-image-wrapper ${heroImageLoaded &&
                    'appear'}`}
                  >
                    <div
                      className="head-image"
                      style={{
                        backgroundImage: `url(${page.headImage.file.url})`,
                      }}
                    />
                    <img
                      src={page.headImage.file.url}
                      alt=""
                      onLoad={this.showHeroImage}
                      style={{
                        display: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          }}
        </VisibilityWrapper>
        <div className="head-block-2 content-container">
          <VisibilityWrapper partialVisibility={true}>
            {({ isVisible }) => {
              return (
                <div className="headline">
                  <h3 className="type-h6 headline-title">
                    <SplitText
                      initialPose="exit"
                      pose={isVisible ? 'enter' : 'exit'}
                      charPoses={ariseAnimation}
                    >
                      {page.headline}
                    </SplitText>
                  </h3>

                  <p className={`animation animation-${isVisible && 'appear'}`}>
                    {nl2br(page.headDescription)}
                  </p>
                </div>
              )
            }}
          </VisibilityWrapper>
        </div>
      </div>
    )
  }
}

export default HeadBlock
