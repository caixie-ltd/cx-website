import React, { Component } from "react"
import Layout from "../../layout/layout"
import ScrollManager from "../../helper/scrollManager"
import posed from "react-pose"
import { easeFunction } from "../../helper/variables"
import { connect } from "react-redux"
import { graphql } from "gatsby"
import _ from "lodash"
import { isBrowser, BrowserView } from "react-device-detect"
import SectionIndicator from "../../components/common/sectionIndicator"
import cls from "./caseStudy.module.scss"
import NextUp from "../../components/common/nextUp/nextUp"

const PageTransition = posed.div({
  enter: {
    opacity: 1,
    transition: {
      ease: easeFunction(),
      duration: 500,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: easeFunction(),
      duration: 500,
    },
  },
})

class Arlo extends Component {
  state = {
    mainNode: null,
    scrollValue: 0,
    momentumScrollValue: 0,
    triggerPointCTA: 0,
    triggerPointFooter: 0,
    randomPosts: null,
  }

  constructor(props) {
    super(props)

    this.mainNode = React.createRef()
    this.sectionCTA = React.createRef()
    this.sectionFooter = React.createRef()
  }

  componentDidMount() {
    this.setState({
      mainNode: this.mainNode.current,
    })

    this.pickRandom()

    this.assignTriggerPoints()

    if (typeof window !== "undefined")
      window.addEventListener("resize", this.assignTriggerPoints)

    this.props.hideSymbol()
    this.props.backgroundWhite()
    this.props.noHomepageLoading()
  }

  assignTriggerPoints = event => {
    // const { momentumScrollValue } = this.state

    /*    this.setState({
          triggerPointFooter:
            momentumScrollValue +
            this.sectionFooter.current.getBoundingClientRect().top,
          triggerPointCTA:
            momentumScrollValue +
            this.sectionCTA.current.getBoundingClientRect().top,
        })*/
  }

  componentWillUnmount() {
    if (typeof window !== "undefined")
      window.removeEventListener("resize", this.assignTriggerPoints)
  }

  pickRandom = () => {
    const selfRemoved = _.differenceWith(
      this.props.data.next.edges,
      [{ node: this.props.data.work }],
      function(article1, article2) {
        return article1.node.id === article2.node.id
      },
    )

    this.setState(
      {
        randomPosts: _.take(_.shuffle(selfRemoved), 2),
      },
      () => {
        setTimeout(this.assignTriggerPoints, 500)
      },
    )
  }

  updateMomentumScrollValue = value => {
    this.setState({
      momentumScrollValue: value,
    })

    if (value > this.state.triggerPointFooter - (isBrowser ? 75 : 55)) {
      this.props.backgroundBlack()
    } else if (value > this.state.triggerPointCTA - (isBrowser ? 75 : 55)) {
      this.props.backgroundRed()
    } else {
      this.props.backgroundWhite()
    }
  }

  updateScrollValue = value => {
    this.setState({
      scrollValue: value,
    })
  }

  render() {
    // const page = this.props.data.work
    const { theme } = this.props
    // const { momentumScrollValue, randomPosts } = this.state

    return (
      <Layout ref={this.mainNode}>
        <PageTransition
          style={{
            backgroundColor: "#f9f9f9",
          }}
        >
          <ScrollManager
            page={this.state.mainNode}
            scrollValue={this.state.scrollValue}
            updateScrollValue={this.updateScrollValue}
            updateMomentumScrollValue={this.updateMomentumScrollValue}
          >
            <section
              className={cls.caseStudy__hero}
              style={{ backgroundColor: "#006BC2" }}>

              {/*<div className="case-study__hero__image --mobile" style={{ backgroundImage: "url(/assets/Yamaha.png)" }} />*/}
              <div
                className={`${cls.caseStudy__hero__image}`}
                style={{ backgroundImage: "url(/assets/projects/disney/case-disneyEnglish-featured.png)" }}/>
              <div className={cls.hero__pullDown}>
                <img src="/assets/pull-down-white.svg" alt="Scroll to see more."/>
              </div>
            </section>

            <section className={`${cls.csSection} ${cls.caseStudy__intro}`}>
              <div className={cls.caseStudy__intro__text}>
                <h1 className={cls.caseStudy__intro__projectName}
                    style={{ color: "#006BC2" }}>
                  拼音宝典
                </h1>
                <p className={cls.caseStudy__intro__projectDescription}>
                  迪士尼英语是华特迪士尼公司通过迪士尼全球出版部门在中国开展的一项新业务，为儿童英语学习设定了全新标准。我结合迪士尼英语品牌的特点与 VI 标准，对其 APP 进行了全新的设计创造.
                </p>
              </div>
            </section>

            <section
              // className="cs-section case-study__three-up-mobile"
              className={`${cls.csSection} ${cls.caseStudy__threeUpMobile}`}
              style={{ color: "#161517;", backgroundColor: "#f5f5f5" }}>
              {/*<div className="case-study__three-up-mobile__images">*/}
              <div className={cls.caseStudy__threeUpMobile__images}>
                <img src="/assets/projects/disney/case-disneyEnglish-1.png" alt="Case Yam Mob 2@2X"
                     className={cls.caseStudy__threeUpMobile__image}/>
                <img src="/assets/projects/disney/case-disneyEnglish-2.png" alt="Case Yam Mob 3@2X"
                     className={cls.caseStudy__threeUpMobile__image}/>
                {/*className="case-study__three-up-mobile__image"/>*/}
                <img src="/assets/projects/disney/case-disneyEnglish-3.png" alt="Case Yam Mob 6@2X"
                     className={cls.caseStudy__threeUpMobile__image}/>
                {/*className="case-study__three-up-mobile__image"/>*/}
              </div>
              {/*<p className="case-study__three-up-mobile__caption">*/}
              <p className={cls.caseStudy__threeUpMobile__caption}>
                滑动式的选项卡、色彩明亮的进度条、区域清晰的操作按钮，这些细节充分的设计，可将用户得到更流畅的操作体验，以更明确的信息反馈。
              </p>
            </section>
            <section
              className={`${cls.csSection} ${cls.caseStudy__leadIn}`}
              style={{
                color: '#161517',
                backgroundColor: '#FFFFFF'
              }}>
              <div className={cls.caseStudy__leadIn__text}>
                <h2 className={cls.caseStudy__leadIn__heading}>
                  为每个像素负责，对产品存敬畏精神
                </h2>
                <p className={cls.caseStudy__leadIn__body}/>
              </div>
            </section>
           <section
            className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}
            style={{backgroundColor: '#FFFFFF'}}>
              {/*<img className="case-study__boxed-image__image -contain" src="/assets/projects/cms/cms_stack.png"*/}
              <img className={`${cls.caseStudy__boxedImage__image}`} src="/assets/projects/disney/example-1px.jpg"
                   alt="" />
                <p className={cls.caseStudy__boxedImage__caption} style={{color: '#161517'}} >

                </p>
            </section>

            <NextUp
              to="/case-study/facial"
              background="#6C5BAE"
              isWhite={true}
              text="人脸识别系统"
            />
          </ScrollManager>
          <BrowserView>
            <SectionIndicator theme={theme}>案例展示</SectionIndicator>
          </BrowserView>
        </PageTransition>
      </Layout>
    )
  }
}

export const query = graphql`
    query {
        work: workJson(slug: {eq: "arlo"}) {
            id
            metaData {
                title
                metaTitle
                description
                keywords
                ogImage {
                    file {
                        url
                    }
                }
            }
            slug
            project
            service
            role
            headline
            description {
                description
            }
            keyImage {
                file {
                    url
                }
            }
            images {
                id
                file {
                    url
                    details {
                        image {
                            width
                            height
                        }
                    }
                }
            }
            mobileImage {
                file {
                    url
                    details {
                        image {
                            width
                            height
                        }
                    }
                }
            }
            mobileImages {
                id
                file {
                    url
                    details {
                        image {
                            width
                            height
                        }
                    }
                }
            }
        }
        next: allWorkJson {
            edges {
                node {
                    id
                    project
                    slug
                    type
                    thumbnail {
                        file {
                            url
                            fileName
                            contentType
                        }
                        description
                        fluid{
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                        }
                    }
                }
            }
        }
    }
`

const mapStateToProps = state => {
  return {
    theme: state.backgroundColor,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    backgroundBlack: () => dispatch({ type: "BACKGROUND_BLACK" }),
    backgroundWhite: () => dispatch({ type: "BACKGROUND_WHITE" }),
    backgroundRed: () => dispatch({ type: "BACKGROUND_RED" }),
    noHomepageLoading: () => dispatch({ type: "NO_HOMEPAGE_LOADING" }),
    hideSymbol: () => dispatch({ type: "SHOW_LOGO" }),
  }
}

const ConnectedWorkDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Arlo)

export default ConnectedWorkDetail
