import React, { Component } from "react"
import Layout from "../layout/layout"
import Helmet from "react-helmet"
import ScrollManager from "../helper/scrollManager"
import { easeFunction } from "../helper/variables"
import posed from "react-pose"
import { connect } from "react-redux"

import { isBrowser } from "react-device-detect"
import { graphql } from "gatsby"
import NextUp from "../components/common/nextUp/nextUp"
// import Footer from "../components/common/footer"
import { ClientsBlock } from "../components/aboutBlocks/clientsBlock"
// import ClientBlock from "../components/serviceBlocks/clientBlock"
import HeroBLock from "../components/hero/heroBlock"

import cls from "./about.module.scss"
import StatementBlock from "../components/aboutBlocks/statementBlock"

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

class About extends Component {
  state = {
    mainNode: null,
    scrollValue: 0,
    momentumScrollValue: 0,
    windowHeight: 0,
    onValues: false,
    triggerPointIntro: 0,
    triggerPointValues: 0,
    triggerPointTestimonial: 0,
    triggerPointAwards: 0,
    triggerPointStudio: 0,
    triggerPointCTA: 0,
    triggerPointFooter: 0,
    isReady: false,
  }

  constructor(props) {
    super(props)

    this.mainNode = React.createRef()
    this.sectionIntro = React.createRef()
    this.sectionValues = React.createRef()
    this.sectionTestimonial = React.createRef()
    this.sectionAwards = React.createRef()
    this.sectionStudio = React.createRef()
    this.sectionCTA = React.createRef()
    this.sectionFooter = React.createRef()
  }

  componentDidMount() {
    if (typeof window !== "undefined")
      window.addEventListener("resize", this.getTriggerPoints)

    this.getTriggerPoints()

    this.setState({
      mainNode: this.mainNode.current,
      isReady: true,
    })

    this.props.hideSymbol()
    this.props.backgroundWhite()
    this.props.noHomepageLoading()
  }

  componentWillUnmount() {
    if (typeof window !== "undefined")
      window.removeEventListener("resize", this.getTriggerPoints)

    this.props.backgroundWhite()
  }

  getTriggerPoints = () => {
    const windowHeight = typeof window !== "undefined" && window.innerHeight
    // const { momentumScrollValue } = this.state

    this.setState({
      windowHeight,
    })

    return windowHeight
  }

  updateMomentumScrollValue = value => {
    this.setState({
      momentumScrollValue: value,
    })

    if (value > this.state.triggerPointFooter - (isBrowser ? 75 : 55)) {
      this.props.backgroundBlack()
    } else if (value > this.state.triggerPointCTA) {
      this.props.backgroundRed()
    } else if (value > this.state.triggerPointValues - (isBrowser ? 75 : 55)) {
      this.props.backgroundWhite()
      this.setState({
        onValues: true,
      })
    } else if (value > this.state.triggerPointValues - 300) {
      this.setState({
        onValues: true,
      })
    } else {
      this.setState({
        onValues: false,
      })
    }
  }

  updateScrollValue = value => {
    this.setState({
      scrollValue: value,
    })
  }

  render() {
    const page = this.props.data.aboutJson

    return (
      <Layout ref={this.mainNode}>
        <Helmet>
          <html lang="en"/>
          <title>{page.metaData.metaTitle}</title>
          <meta name="description" content={page.metaData.description}/>
          <meta name="keywords" content={page.metaData.keywords}/>
          <meta property="og:title" content={page.metaData.metaTitle}/>
          <meta property="og:description" content={page.metaData.description}/>
          <meta property="og:type" content="website"/>
        </Helmet>
        <PageTransition>
          <ScrollManager
            page={this.state.mainNode}
            scrollValue={this.state.scrollValue}
            updateScrollValue={this.updateScrollValue}
            updateMomentumScrollValue={this.updateMomentumScrollValue}
          >
            <section className={cls.pageAbout}>
              <HeroBLock
                headline={page.heroHeadline}/>
              <StatementBlock/>
              <ClientsBlock/>
            </section>
            <section>
              <NextUp
                to={`/projects`}
                text={`查看我们的工作`}/>
            </section>
          </ScrollManager>
        </PageTransition>
      </Layout>
    )
  }
}

export const query = graphql`
    query {
        aboutJson {
            metaData {
                title
                metaTitle
                description
                keywords
            }
            heroHeadline
            statementRibbonText
            statementText
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

const ConnectedAbout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(About)

export default ConnectedAbout
