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
              style={{ backgroundColor: "#3AA2FA" }}>

              {/*<div className="case-study__hero__image --mobile" style={{ backgroundImage: "url(/assets/Yamaha.png)" }} />*/}
              <div
                className={`${cls.caseStudy__hero__image}`}
                style={{ backgroundImage: "url(/assets/case-vrlab-featured.png)" }}/>
              <div className={cls.hero__pullDown}>
                <img src="/assets/pull-down-white.svg" alt="Scroll to see more."/>
              </div>
            </section>

            <section className={`${cls.csSection} ${cls.caseStudy__intro}`}>
              <div className={cls.caseStudy__intro__text}>
                <h1 className={cls.caseStudy__intro__projectName}
                    style={{ color: "#3AA2FA" }}>
                  首都师范大学 VR 虚拟仿真实验系统
                </h1>
                <p className={cls.caseStudy__intro__projectDescription}>
                  本项目基于首都师范大学的教学需求,依托教师科研和产业化成果转化而设计开发。系统包括心理学实验的多个步骤，
                  解决项目实际教学中周期长、耗材昂贵，学生实际操作机会少的难题。
                </p>
              </div>
            </section>

            <section
              className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}
              style={{ backgroundColor: "#f7f7f8" }}>
              {/*<img className="case-study__boxed-image__image -contain" src="/assets/projects/cms/cms_stack.png"*/}
              <img className={`${cls.caseStudy__boxedImage__image}`} src="/assets/case-vrlab-1.png"
                   alt=""/>

              <p className={cls.caseStudy__boxedImage__caption} style={{ colo: "#161517" }}>
                实验展示实验数据。
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
                     backgroundImage: `url('/assets/case-vrlab-2.png')`,
                   }}/>
              <p className={cls.caseStudy__boxedImage__caption} style={{ color: "#161517" }}>
                两种角色，老师、学生系统登录
              </p>
            </section>

            <section
              className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}
              style={{
                background: "#fff",
              }}>
              <div className={`${cls.caseStudy__boxedImage__image} ${cls.isCover}`}
                   style={{
                     backgroundImage: `url('/assets/case-vrlab-3.png')`,
                   }}/>
              <p className={cls.caseStudy__boxedImage__caption} style={{ color: "#161517" }}>
                学员的实验数据管理中心
              </p>
            </section>
            <section
              className={`${cls.csSection} ${cls.caseStudy__leadIn}`}
              style={{
                color: "#161517",
                background: "#efefef",
              }}>
              <div className={cls.caseStudy__leadIn__text}>
                <h2 className={cls.caseStudy__leadIn__heading}>
                  后台管理系统，完善的VR仿真实验数据和用户管理
                </h2>
                <p className={cls.caseStudy__leadIn__body}/>
              </div>
            </section>
            <section
              className={`${cls.csSection} ${cls.caseStudy__boxedImage}`}
              style={{
                background: "#efefef",
              }}>
              <div className={`${cls.caseStudy__boxedImage__image} ${cls.isCover}`}
                   style={{
                     backgroundImage: `url('/assets/case-vrlab-4.png')`,
                   }}/>
              <p className={cls.caseStudy__boxedImage__caption} style={{ color: "#161517" }}/>
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
