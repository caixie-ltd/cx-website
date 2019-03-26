import React, { Component } from "react"
import Layout from "../layout/layout"
// import Helmet from "react-helmet"
import { connect } from "react-redux"
import posed from "react-pose"
import { easeFunction, animations } from "../helper/variables"
import ScrollManager from "../helper/scrollManager"
// import Footer from "../components/common/footer.jsx"

// import "./work.css"
import { graphql } from "gatsby"
import { isBrowser } from "react-device-detect"
// import SectionIndicator from "../components/common/sectionIndicator"
// import WorkScroll from "../components/"
import WorkScroll from "../components/workScroll"
import WorkImages from "../components/work/workImages"
import NextUp from "../components/common/nextUp/nextUp"
import HeroBLock from "../components/hero/heroBlock"
import cls from "./projects.module.scss"

const projectCovers = [
  "/assets/chinauff-spring-hero.png",
  "/assets/vrlab-hero.png",
  "/assets/cms-hero.png",
  "/assets/podcast-hero.png",
  "/assets/pinyin-hero.png",
  "/assets/disney-english-hero.png",
  "/assets/facial-hero.png",
]

const projectData = [{
  cover: projectCovers[0],
  slug: "chinauff-spring",
  title: "老娘舅春节集福",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}, {
  cover: projectCovers[1],
  slug: "vrlab",
  title: "VR 虚拟仿真实验系统",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}, {
  cover: projectCovers[2],
  slug: "cmf",
  title: "采撷内容管理系统",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}, {
  cover: projectCovers[3],
  slug: "podcast",
  title: "育儿柚道小程序",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}, {
  cover: projectCovers[4],
  slug: "pinyin",
  title: "柚子拼音",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}, {
  cover: projectCovers[5],
  slug: "disney-english",
  title: "迪士尼英语",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}, {
  cover: projectCovers[6],
  slug: "facial",
  title: "人脸识别系统",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}]
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

class WorkPage extends Component {
  slideAnimation = animations("SLIDE")
  ariseAnimation = animations("ARISE")

  state = {
    mainNode: null,
    scrollValue: 0,
    momentumScrollValue: 0,
    onWork: false,
    isSticky: false,
    triggerPointWorks: 0,
    triggerPointFooter: 0,
    triggerPointNextUp: 0,
    currentProjectIndex: null,
    worksPosition: [],
    jumpToScrollValue: 0,
  }

  constructor(props) {
    super(props)

    this.mainNode = React.createRef()
    this.sectionNextUp = React.createRef()
    this.sectionWorks = React.createRef()
    // this.sectionFooter = React.createRef()
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
    this.props.backgroundBlack()
    this.props.noHomepageLoading()
  }

  assignTriggerPoints = event => {
    const windowHeight = typeof window !== "undefined" && window.innerHeight
    const { momentumScrollValue } = this.state

    this.setState({
      windowHeight,
      triggerPointWorks:
        momentumScrollValue +
        this.sectionWorks.current.getBoundingClientRect().top,
      triggerPointNextUp:
        momentumScrollValue +
        this.sectionNextUp.current.getBoundingClientRect().top - windowHeight,
      // triggerPointFooter:
      //   momentumScrollValue +
      //   this.sectionFooter.current.getBoundingClientRect().top - windowHeight,
    })
  }
  updateProjectIndex = index => {
    this.setState({
      currentProjectIndex: index,
    })
  }
  updateWorksPosition = worksPosition => {
    console.log(worksPosition)
    this.setState({
      worksPosition,
    })

  }
  // 跳转值处理。。。。。
  jumpTo = index => {
    this.setState({
      jumpToScrollValue: this.state.worksPosition[index],
    })
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
    // console.log(this.state.triggerPointWorks + ': works')
    // console.log('value: ' + value)
    /*    if (value > this.state.triggerPointFooter - (isBrowser ? 75 : 55)) {
          this.props.backgroundBlack()
          this.setState({
            isSticky: false,
            onWork: false,
          })
        } else */
    if (value > this.state.triggerPointNextUp + (isBrowser ? 75 : 0)) {
      this.props.backgroundWhite()
      this.setState({
        onWork: false,
        isSticky: false,
      })
    } else if (value > this.state.triggerPointWorks - (isBrowser ? 200 : 100)) {
      this.props.backgroundBlack()
      this.setState({
        onWork: true,
        isSticky: true,
      })
    } else {
      this.props.backgroundWhite()
      this.setState({
        isSticky: false,
        onWork: false,
      })
    }
  }

  updateScrollValue = value => {
    this.setState({
      scrollValue: value,
      jumpToScrollValue: 0,
    })
  }

  render() {
    // const page = this.props.data.workLandingJson
    // const works = this.props.data.allWorkJson.edges
    // const { theme } = this.props
    const { momentumScrollValue } = this.state

    return (
      <Layout ref={this.mainNode}>
        <PageTransition>
          <ScrollManager
            page={this.state.mainNode}
            scrollValue={this.state.scrollValue}
            updateScrollValue={this.updateScrollValue}
            updateMomentumScrollValue={this.updateMomentumScrollValue}
            jumpToScrollValue={this.state.jumpToScrollValue}

          >
            <div className={cls.projects}>
              <section className="hero">
                <HeroBLock
                  headline="请看，这里是我们的工作"/>
              </section>
              <section ref={this.sectionWorks}>
                <WorkImages
                  onWork={this.state.onWork}
                  momentumScrollValue={momentumScrollValue}
                  updateProjectIndex={this.updateProjectIndex}
                  currentIndex={this.state.currentProjectIndex}
                  updateScrollValue={this.updateScrollValue}
                  updateWorksPosition={this.updateWorksPosition}
                  projects={projectData}/>
              </section>
            </div>
            <section ref={this.sectionNextUp}>
              <NextUp
                to="/about"
                text={`关于采撷`}/>
            </section>
            {/*<section ref={this.sectionFooter}>*/}
            {/*<Footer/>*/}
            {/*</section>*/}
          </ScrollManager>
          <WorkScroll
            projects={projectData}
            onWork={this.state.onWork}
            currentIndex={this.state.currentProjectIndex}
            updateProjectIndex={this.updateProjectIndex}
            jumpTo={this.jumpTo}
            isSticky={this.state.isSticky}/>

        </PageTransition>
      </Layout>
    )
  }
}

export const query = graphql`
    query {
        workLandingJson {
            metaData {
                title
                metaTitle
                description
                keywords
            }
            heroRibbonText
            heroHeadline
            heroDescription
        }
        allWorkJson {
            edges {
                node {
                    id
                    order
                    slug
                    project
                    type
                    thumbnail {
                        file {
                            url
                            fileName
                            contentType
                        }
                        description
                        fluid {
                            src
                            srcSet
                            aspectRatio
                            srcWebp
                            srcSetWebp
                            sizes
                        }
                    }
                    metaData {
                        title
                        metaTitle
                        description
                        keywords
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

const ConnectedWork = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkPage)

export default ConnectedWork
