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
              style={{ backgroundColor: "#75C0C0" }}>

              {/*<div className="case-study__hero__image --mobile" style={{ backgroundImage: "url(/assets/Yamaha.png)" }} />*/}
              <div
                className={`${cls.caseStudy__hero__image}`}
                style={{ backgroundImage: "url(/assets/projects/cms/cms-cover.png)" }}/>
              <div className={cls.hero__pullDown}>
                <img src="/assets/pull-down-white.svg" alt="Scroll to see more."/>
              </div>
            </section>

            <section className={`${cls.csSection} ${cls.caseStudy__intro}`}>
              <div className={cls.caseStudy__intro__text}>
                <h1 className={cls.caseStudy__intro__projectName}
                    style={{ color: "#74C0C0" }}>
                  采撷内容框架系统
                </h1>
                <p className={cls.caseStudy__intro__projectDescription}>
                  这个一套基于 Nodejs、Java 架构，自主研发的内容框架系统，可应于：电子商务平台、网络商城、资讯网站、图片站、下载站等一些基于内容管理的网络应用，全端支持 PC、手机端、微信公众平台、小程序，有完整的插件系统、API系统，模块化开发机制便于灵活扩展和二次开发
                </p>
              </div>
            </section>

           <section
            className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}
            style={{backgroundColor: '#f7f7f8'}}>
              {/*<img className="case-study__boxed-image__image -contain" src="/assets/projects/cms/cms_stack.png"*/}
              <img className={`${cls.caseStudy__boxedImage__image}`} src="/assets/projects/cms/cms_stack.png"
                   alt="" />

                <p className={cls.caseStudy__boxedImage__caption} style={{colo: '#161517'}} >
                  多种业务场景应用
                </p>
            </section>
            <section
              className={`${cls.csSection} ${cls.caseStudy__fullTextBlock}`}
              style={{ backgroundColor: "#161517" }}>
              <p
                className={cls.caseStudy__fullTextBlock__text}
                style={{ color: "#ffffff" }}>
                基于这套基础内容管理框架系统，可以快速构建与内容管理相关的业务系统，我们已用这套系统服务了众多客户和产出了多种类型的业务系统。
              </p>
            </section>
            <section
              className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}>
              <div className={`${cls.caseStudy__boxedImage__image} ${cls.isCover}`}
                style={{
                    backgroundImage: `url('/assets/projects/cms/cms_case.jpg')`
                }}></div>
              <p className={cls.caseStudy__boxedImage__caption} style={{color: '#161517'}} >
                电商站管理系统
              </p>
            </section>

            <section
              className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}
              style={{
                background: '#dfdfdf'
              }}>
              <div className={`${cls.caseStudy__boxedImage__image} ${cls.isCover}`}
                   style={{
                     backgroundImage: `url('/assets/projects/cms/cms_team1.jpg')`
                   }}></div>
              <p className={cls.caseStudy__boxedImage__caption} style={{color: '#161517'}} >
                内容协作系统
              </p>
            </section>
            <section
              className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}
              style={{
                background: '#FFF'
              }}>
              <div className={`${cls.caseStudy__boxedImage__image} ${cls.isCover}`}
                   style={{
                     backgroundImage: `url('/assets/projects/cms/cms_picker3.jpg')`
                   }}></div>
              <p className={cls.caseStudy__boxedImage__caption} style={{color: '#161517'}} >
                多站点管理系统
              </p>
            </section>

            <NextUp
              to="/case-study/podcast"
              background="#2BA246"

              isWhite={true}
              text="育儿柚道"
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
