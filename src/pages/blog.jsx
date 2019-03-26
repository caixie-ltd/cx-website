import React, { Component } from "react"
import Layout from "../layout/layout"
// import Helmet from "react-helmet"
import ScrollManager from "../helper/scrollManager"
// import Circle from "../components/graphic/circle"
import { easeFunction, animations } from "../helper/variables"
import posed from "react-pose"
import { connect } from "react-redux"
// import { graphql } from "gatsby"
import { BrowserView } from "react-device-detect"
import SectionIndicator from "../components/common/sectionIndicator"

import cls from "./blog.module.scss"
import HeroBLock from "../components/hero/heroBlock"
// import InternalLink from "../helper/links/InternalLink"
import BlogGrid from "../components/blogBlocks/blogGrid"
import NextUp from "../components/common/nextUp/nextUp"

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

class Blog extends Component {
  slideAnimation = animations("SLIDE")
  ariseAnimation = animations("ARISE")

  state = {
    mainNode: null,
    scrollValue: 0,
    momentumScrollValue: 0,
    triggerPointFooter: 0,
  }

  constructor(props) {
    super(props)

    this.mainNode = React.createRef()
    this.sectionFooter = React.createRef()
  }

  componentDidMount() {
    this.setState({
      mainNode: this.mainNode.current,
    })

    this.assignTriggerPoints()

    if (typeof window !== "undefined")
      window.addEventListener("resize", this.assignTriggerPoints)

    this.props.hideSymbol()
    this.props.backgroundWhite()
    this.props.noHomepageLoading()
  }

  assignTriggerPoints = event => {
    // const { momentumScrollValue } = this.state

    // this.setState({
    //   triggerPointFooter:
    //     momentumScrollValue +
    //     this.sectionFooter.current.getBoundingClientRect().top,
    // })
  }

  componentWillUnmount() {
    if (typeof window !== "undefined")
      window.removeEventListener("resize", this.assignTriggerPoints)

    this.props.backgroundWhite()
  }

  updateMomentumScrollValue = value => {
    this.setState({
      momentumScrollValue: value,
    })

    // if (value > this.state.triggerPointFooter - (isBrowser ? 75 : 55)) {
    //   this.props.backgroundBlack()
    // } else {
    this.props.backgroundWhite()
    // }
  }

  updateScrollValue = value => {
    this.setState({
      scrollValue: value,
    })
  }

  render() {
    // const page = this.props.data.insightsLandingJson
    // const insights = this.props.data.allInsightJson.edges
    const { theme } = this.props
    // const { momentumScrollValue } = this.state

    return (
      <Layout ref={this.mainNode}>
        <PageTransition>
          <ScrollManager
            page={this.state.mainNode}
            scrollValue={this.state.scrollValue}
            updateScrollValue={this.updateScrollValue}
            updateMomentumScrollValue={this.updateMomentumScrollValue}
          >
            <div className={cls.blog}>
              <HeroBLock
                headline="我们的见解与思考!"/>
              <section className={cls.blogListing}>
                <BlogGrid
                  articles={[{
                    id: 1,
                    slug: "nuxt",
                    category: "技术",
                    title: "用 Nuxtjs 写个单页面应用",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 2,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 3,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 4,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 5,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 6,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 7,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 8,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 9,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }, {
                    id: 10,
                    slug: "nuxt",
                    category: "技术",
                    title: "Nuxt 做项目",
                    snippet: "Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。",
                    authorImg: "/assets/baisheng.jpeg",
                    authorName: "佰晟",
                    date: "2019-01-02",
                  }]}
                />
              </section>
            </div>

            {/*
            <div className="content-container page-insights-landing top-of-page">
              <div className="insights-list">
                {insights.map((insight, index) => {
                  if (index % 2 === 1) {
                    return (
                      <Parallax
                        viewportScroll={momentumScrollValue}
                        moveRange="200"
                        key={insight.node.id}
                        disabledOnMobile
                      >
                        <Thumbnail data={insight.node} className="even"/>
                      </Parallax>
                    )
                  } else {
                    return (
                      <Thumbnail key={insight.node.id} data={insight.node}/>
                    )
                  }
                })}
              </div>
            </div>
            */}
            {/*<section ref={this.sectionFooter}>*/}
            {/*<Footer/>*/}
            {/*</section>*/}
            <NextUp
              to="/projects"
              text="我们的工作"/>
          </ScrollManager>
          <BrowserView>
            <SectionIndicator theme={theme}>
              {/*{page.heroRibbonText}*/}
            </SectionIndicator>
          </BrowserView>
        </PageTransition>
      </Layout>
    )
  }
}

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

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blog)

export default ConnectedBlog
