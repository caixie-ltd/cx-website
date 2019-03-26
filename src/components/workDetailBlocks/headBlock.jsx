import React, { Component } from 'react'
import './headBlock.css'
import Circle from '../graphic/circle'
import Sparks from '../graphic/sparks'
import SplitText from 'react-pose-text'
import { animations } from '../../helper/variables'
import VisibilityWrapper from '../../helper/visibilityWrapper'
import Award from './award'
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
      <div className="work-detail-head-block-container top-of-page">
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
                      案例展示
                    </SplitText>
                  </div>

                  <div className="detail-info">
                    <h2 className="type-h3 project">
                      <SplitText
                        initialPose="exit"
                        pose={isVisible ? 'enter' : 'exit'}
                        charPoses={ariseAnimation}
                      >
                        {page.project}
                      </SplitText>
                    </h2>
                    <div className="mobile-hero-image-container">
                      {page.awards !== undefined && (
                        <Award data={page.awards} />
                      )}
                      <div
                        className={`head-image-wrapper ${heroImageLoaded &&
                        'appear'}`}
                      >
                        <div
                          className={`head-image ${this.props.doCover &&
                          'cover'}`}
                          style={{
                            backgroundImage: `url(${page.keyImage.file.url})`,
                          }}
                        />
                        <img
                          src={page.keyImage.file.url}
                          alt=""
                          onLoad={this.showHeroImage}
                          style={{
                            display: 'none',
                          }}
                        />
                      </div>
                    </div>
                    <div className="detail-service">
                      <h3
                        className={`type-sub4 detail-title animation animation-${isVisible &&
                        'appear'}`}
                      >
                        提供的服务
                      </h3>
                      <p
                        className={`type-sub3 color-gray animation animation-${isVisible &&
                        'appear'}`}
                      >
                        {page.service}
                      </p>
                    </div>
                    <div className="detail-role">
                      <h3
                        className={`type-sub4 detail-title animation animation-${isVisible &&
                        'appear'}`}
                      >
                        工作内容
                      </h3>
                      <ul
                        className={`roles type-sub3 color-gray animation animation-${isVisible &&
                        'appear'}`}
                      >
                        {page.role.map((role, index) => (
                          <li key={index}>{role}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="head-image-container">
                  <div
                    className={`head-image-wrapper ${heroImageLoaded &&
                    'appear'}`}
                  >
                    <div
                      className={`head-image ${this.props.doCover && 'cover'}`}
                      style={{
                        backgroundImage: `url(${page.keyImage.file.url})`,
                      }}
                    />
                    <img
                      src={page.keyImage.file.url}
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
                  <h3 className="type-h1 headline-title">
                    <SplitText
                      initialPose="exit"
                      pose={isVisible ? 'enter' : 'exit'}
                      charPoses={ariseAnimation}
                    >
                      {page.headline}
                    </SplitText>
                  </h3>

                  <p className={`animation animation-${isVisible && 'appear'}`}>
                    {nl2br(page.description.description)}
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
