import React, { Component } from "react"
import { graphql } from "gatsby"
import posed from "react-pose"
import ScrollManager from "../helper/scrollManager.jsx"
import { connect } from "react-redux"
import { easeFunction } from "../helper/variables.jsx"
import Footer from "../components/common/footer.jsx"
import Layout from "../layout/layout.jsx"
import HeroBlock from "../components/hero/heroBlock"
import { isBrowser } from "react-device-detect"
import AboutBlock from "../components/indexBlocks/aboutBlock"
import WorkImages from "../components/work/workImages"
import WorkScroll from "../components/workScroll"
import NextUp from "../components/common/nextUp/nextUp"
import IntroBlock from "../components/indexBlocks/introBlock"
import cls from "./index.module.scss"
// import Footer from "../components/footer"

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
const projectCovers = [
  "/assets/cms-hero.png",
  "/assets/facial-hero.png",
  "/assets/vrlab-hero.png",
]

const projectData = [{
  cover: projectCovers[0],
  slug: "cmf",
  title: "采撷内容管理系统",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}, {
  cover: projectCovers[1],
  slug: "facial",
  title: "人脸识别系统",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}, {
  cover: projectCovers[2],
  slug: "vrlab",
  title: "VR 虚拟仿真实验系统",
  services: [
    "产品策略",
    "UX",
    "UI",
    "开发",
  ],
}]
class IndexPage extends Component {
  state = {
    mainNode: null,
    scrollValue: 0,
    momentumScrollValue: 0,
    jumpToScrollValue: 0,
    triggerPointWorks: 0,
    triggerPointAbout: 0,
    triggerPointIntro: 0,
    triggerPointService: 0,
    triggerPointInsights: 0,
    triggerPointFooter: 0,
    servicePage: 0,
    servicePosition: 0,
    strategyPoint: 0,
    websitePoint: 0,
    creativePoint: 0,
    windowheight: 0,
    currentProjectIndex: null,
    isSticky: false,
    onWork: false,
    worksPosition: [],
  }

  constructor(props) {
    super(props)

    this.mainNode = React.createRef()
    this.sectionWorks = React.createRef()
    this.sectionIntro = React.createRef()
    this.sectionService = React.createRef()
    this.sectionAbout = React.createRef()
    // this.sectionInsights = React.createRef()
    this.sectionNextUp = React.createRef()
    // this.sectionFooter = React.createRef()
  }

  componentDidMount() {

    this.assignTriggerPoints()

    if (typeof window !== "undefined")
      window.addEventListener("resize", this.assignTriggerPoints)

    this.setState({
      mainNode: this.mainNode.current,
    })

    if (this.props.showHomepageLoading) {
      this.initialLoadingAnimation()
    } else {
      this.props.hideSymbol()
      this.props.backgroundBlack()
    }
    this.props.backgroundWhite()
  }

  componentWillUnmount() {
    if (typeof window !== "undefined")
      window.removeEventListener("resize", this.assignTriggerPoints)

    this.props.backgroundWhite()
  }

  assignTriggerPoints = event => {
    const windowHeight = typeof window !== "undefined" && window.innerHeight
    const { momentumScrollValue } = this.state

    this.setState({
      windowHeight,
      triggerPointAbout:
        momentumScrollValue +
        this.sectionAbout.current.getBoundingClientRect().top,
      triggerPointWorks:
        momentumScrollValue +
        this.sectionWorks.current.getBoundingClientRect().top,
      triggerPointIntro:
        momentumScrollValue +
        this.sectionIntro.current.getBoundingClientRect().top,
      triggerPointNextUp:
        momentumScrollValue +
        this.sectionNextUp.current.getBoundingClientRect().top - windowHeight,
      // triggerPointFooter:
      //   momentumScrollValue +
      //   this.sectionFooter.current.getBoundingClientRect().top - windowHeight,
    })
  }

  initialLoadingAnimation = () => {
    setTimeout(() => {
      this.props.noHomepageLoading()
    }, 1000)
  }

  updateMomentumScrollValue = value => {
    this.setState({
      momentumScrollValue: value,
    })
    // if (value > this.state.triggerPointFooter + (isBrowser ? 75 : 0)) {
    //   this.props.backgroundBlack()
    // } else
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
    } else if (value > this.state.triggerPointIntro - (isBrowser ? 300 : 200)) {
      this.props.backgroundRed()
      this.setState({
        onWork: false,
        isSticky: false,
      })
    } else if (value > this.state.triggerPointAbout - (isBrowser ? 200 : 100)) {
      this.props.backgroundWhite()
    } else {
      this.props.backgroundBlack()
    }
  }

  updateScrollValue = value => {
    this.setState({
      scrollValue: value,
      jumpToScrollValue: 0,
    })
  }

  updateServicePoints = points => {
    this.setState(points)
  }
  updateProjectIndex = index => {
    this.setState({
      currentProjectIndex: index,
    })
  }
  updateWorksPosition = worksPosition => {
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

  render() {
    const homepage = this.props.data.homepageJson
    // const { edges: works } = this.props.data.allWorkJson
    // const { edges: insights } = this.props.data.allInsightJson
    // const { showHomepageLoading, theme } = this.props
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
            <div className={`${cls.pageIndex}`}>
              <section className={cls.sectionHero}>
                <HeroBlock isHome={true}/>
              </section>

              <section
                className={`${cls.sectionAbout}`}
                ref={this.sectionAbout}>
                <AboutBlock/>
              </section>
              <section
                className={`${cls.sectionIntro}`}
                ref={this.sectionIntro}
              >
                <IntroBlock data={homepage}/>
              </section>
              <section
                className={`${cls.sectionWorks}`}
                ref={this.sectionWorks}>
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
                to="/projects"
                text={`查看我们的工作`}/>
            </section>
            <section ref={this.sectionFooter}>
            <Footer/>
            </section>
            {/*<section>*/}
              {/*<Footer />*/}
            {/*</section>*/}
          </ScrollManager>
          <div style={{ display: isBrowser ? "block" : this.state.onWork ? "block" : "none" }}>
            <WorkScroll
              projects={projectData}
              onWork={this.state.onWork}
              currentIndex={this.state.currentProjectIndex}
              updateProjectIndex={this.updateProjectIndex}
              jumpTo={this.jumpTo}
              isSticky={this.state.isSticky}/>
          </div>
        </PageTransition>
      </Layout>
    )
  }
}


export const query = graphql`
    query IndexQuery {
        homepageJson {
            id
            metaData {
                title
                metaTitle
                description
                keywords
            }
            heroRibbonText
            heroHeadline
            heroDescription
            heroButtonText
            worksTitle
            worksDescription
            introRibbonText
            introText
            servicesTitle
            servicesDescription
            strategyImage {
                fixed{
                    width
                    height
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                }
            }
            strategyDescription
            websiteImage {
                fixed{
                    width
                    height
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                }
            }
            websiteDescription
            creativeImage {
                fixed{
                    width
                    height
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                }
            }
            creativeDescription
            insightsTitle
            insightsDescription
        }
        allWorkJson(limit: 4) {
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
        allInsightJson(limit: 2) {
            edges {
                node {
                    id
                    title
                    slug
                    category
                    keyImage {
                        fluid {
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
    showHomepageLoading: state.showHomepageLoading,
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

const ConnectedIndex = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage)

export default ConnectedIndex
