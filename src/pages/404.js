import React, { Component } from "react"
import Layout from "../layout/layout.jsx"
import posed from "react-pose"
import { easeFunction, animations } from "../helper/variables.jsx"
import ScrollManager from "../helper/scrollManager.jsx"
import Helmet from "react-helmet"
import { connect } from "react-redux"

import "./404.css"
import ExternalLink from "../helper/links/ExternalLink.jsx"
import CustomButton from "../components/button/button.jsx"
// import Circle from '../components/graphic/circle.jsx'
import SplitText from "react-pose-text"
// import Sparks from '../components/graphic/sparks.jsx'
import { MobileView, BrowserView } from "react-device-detect"
// import { graphql } from "gatsby"

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

class NotFound extends Component {
  slideAnimation = animations("SLIDE")
  ariseAnimation = animations("ARISE")

  state = {
    mainNode: null,
    scrollValue: 0,
    momentumScrollValue: 0,
  }

  constructor(props) {
    super(props)

    this.mainNode = React.createRef()
  }

  componentDidMount() {
    this.setState({
      mainNode: this.mainNode.current,
    })

    this.props.hideSymbol()
    this.props.backgroundBlack()
    this.props.noHomepageLoading()
    this.props.hideScrollLabel()
  }

  componentWillUnmount() {
    this.props.showScrollLabel()
  }

  updateMomentumScrollValue = value => {
    this.setState({
      momentumScrollValue: value,
    })
  }

  updateScrollValue = value => {
    this.setState({
      scrollValue: value,
    })
  }

  render() {
    // const page = this.props.data.contentfulNotFound
    // const { theme } = this.props

    return (
      <Layout ref={this.mainNode}>
        <Helmet>
          {/*<html lang="en"/>*/}
          {/*<title>{page.metaData.metaTitle}</title>*/}
          {/*<meta name="description" content={page.metaData.description}/>*/}
          {/*<meta name="keywords" content={page.metaData.keywords}/>*/}
        </Helmet>
        <PageTransition>
          <ScrollManager
            page={this.state.mainNode}
            scrollValue={this.state.scrollValue}
            updateScrollValue={this.updateScrollValue}
            updateMomentumScrollValue={this.updateMomentumScrollValue}
          >
            <section className="section-404 color-white">
              <div className="content-container">
                <div className="column">
                  <h2 className="type-h11 color-red ribbon-text">
                    <SplitText
                      initialPose="exit"
                      pose="enter"
                      withParent={false}
                      charPoses={this.slideAnimation}
                    >
                      对不起
                      {/*{page.ribbonText}*/}
                    </SplitText>
                  </h2>
                  <h1 className="type-bg1 msg-404">
                    <SplitText
                      initialPose="exit"
                      pose="enter"
                      withParent={false}
                      charPoses={this.ariseAnimation}
                    >
                      404
                    </SplitText>
                  </h1>
                  <MobileView>
                    <div className="mobile-message">
                      <p className="message">我们未能找到您所访问的页面</p>
                    </div>
                  </MobileView>
                  <ExternalLink
                    href="#"
                    onClick={event => {
                      event.preventDefault()

                      if (typeof window !== "undefined") window.history.back(-1)
                    }}
                  >
                    <CustomButton theme="white" animate="true">
                      返回
                    </CustomButton>
                  </ExternalLink>
                </div>
                <div className="column">
                  <BrowserView>
                    <p className="message">我们未能找到您所访问的页面</p>
                  </BrowserView>
                </div>
              </div>
            </section>
          </ScrollManager>
        </PageTransition>
      </Layout>
    )
  }
}

// export const query = graphql`
//     query NotFoundQuery{
//         contentfulNotFoundJson {
//             metaData {
//                 title
//                 metaTitle
//                 description
//                 keywords
//             }
//             ribbonText
//             message
//         }
//
//     }
// `
//
const mapStateToProps = state => {
  return {
    theme: state.backgroundColor,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    backgroundBlack: () => dispatch({ type: "BACKGROUND_BLACK" }),
    backgroundWhite: () => dispatch({ type: "BACKGROUND_WHITE" }),
    noHomepageLoading: () => dispatch({ type: "NO_HOMEPAGE_LOADING" }),
    hideSymbol: () => dispatch({ type: "SHOW_LOGO" }),
    showScrollLabel: () => dispatch({ type: "SHOW_SCROLL_LABEL" }),
    hideScrollLabel: () => dispatch({ type: "HIDE_SCROLL_LABEL" }),
  }
}

const Connected404 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotFound)

export default Connected404
