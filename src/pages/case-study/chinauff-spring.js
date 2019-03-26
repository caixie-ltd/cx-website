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
            style={{ backgroundColor: "#D7262F" }}>

              <div className={`${cls.caseStudy__hero__image}`} style={{ backgroundImage: "url(/assets/case-chinauffSpring-featured.png)" }} />
              <div className={cls.hero__pullDown}>
                <img src="/assets/pull-down-white.svg" alt="Scroll to see more."/>
              </div>
            </section>

            <section className={`${cls.csSection} ${cls.caseStudy__intro}`}>
              <div className={cls.caseStudy__intro__text}>
                <h1 className={cls.caseStudy__intro__projectName}
                    style={{ color: "#D7262F" }}>
                  老娘舅春节集福
                </h1>
                <p className={cls.caseStudy__intro__projectDescription}>
                  与第三方业务公司合作，为客户定制春节集福活动系统,
                  支持高并发、分布部署。基于 Nodejs\MySql\Redis\Traefix\NuxtJS 等技术。
                </p>
              </div>
            </section>

            <section
              className={`${cls.csSection} ${cls.caseStudy__threeUpMobile}`}
              style={{ color: "#161517;", backgroundColor: "#FFF" }}>
              <div className={cls.caseStudy__boxedImage__images}>
                <img src="/assets/case-chinauffSpring-4.png" alt=""
                     className={cls.caseStudy__threeUpMobile__image}/>
                <img src="/assets/case-chinauffSpring-5.png" alt=""
                     className={cls.caseStudy__threeUpMobile__image}/>
                <img src="/assets/case-chinauffSpring-6.png" alt=""
                     className={cls.caseStudy__threeUpMobile__image}/>
              </div>
              <p className={cls.caseStudy__threeUpMobile__caption}>
                社交化活跃、互动性实足的游戏形式。
              </p>
            </section>
            <section
              className={`${cls.csSection} ${cls.caseStudy__threeUpMobile}`}
              style={{ color: "#161517;"}}>
              <div className={cls.caseStudy__boxedImage__images}>
                <img src="/assets/case-chinauffSpring-1.png" alt=""
                     className={cls.caseStudy__threeUpMobile__image}/>
                <img src="/assets/case-chinauffSpring-2.png" alt=""
                     className={cls.caseStudy__threeUpMobile__image}/>
                <img src="/assets/case-chinauffSpring-3.png" alt=""
                     className={cls.caseStudy__threeUpMobile__image}/>
              </div>
              <p className={cls.caseStudy__threeUpMobile__caption}>
                线上线下结合，拉新与落地一气合成。
              </p>
            </section>

            <section
              className={`${cls.csSection} ${cls.caseStudy__leadIn}`}
              style={{
                color: '#161517',
                backgroundColor: '#EEE'
              }}>
              <div className={cls.caseStudy__leadIn__text}>
                <h2 className={cls.caseStudy__leadIn__heading}>
                  后台管理系统
                </h2>
                <p className={cls.caseStudy__leadIn__body}>
                  管理系统中，完善的包含游戏规则、优惠卷发放、微信会员验证、卡劵兑换、礼品线下扫码、用户管理、运营数据等，
                </p>
              </div>
            </section>
            <section
              className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}
              style={{backgroundColor: '#EEE'}}>
              <img className={`${cls.caseStudy__boxedImage__image}`} src="/assets/case-chinauffSpring-admin.png"
                   alt="" />
              <p className={cls.caseStudy__boxedImage__caption} style={{color: '#161517'}} >

              </p>
            </section>

            <NextUp
              to="/case-study/cmf"
              background="#75C0C0"
              isWhite={true}
              text="采撷内容框架系统"
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
