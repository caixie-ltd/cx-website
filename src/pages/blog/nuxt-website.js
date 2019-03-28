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
import cls from "./blog.module.scss"
// import NextUp from "../../components/common/nextUp/nextUp"

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
            <div className={`${cls.blogArticle}`}>
              <div className={cls.blogContainer}>
                <div className={cls.blogHero}>
                  <div className={cls.blogHero__header}>
                    <div className={cls.blogHero__category}>
                      Technology
                    </div>
                    <h1 className={cls.blogHero__title}>
                      An Introduction to React Hooks
                    </h1>
                    <div className={cls.blogHero__author}>
                      <div className={cls.blogHero__authorImg}
                           style={{ backgroundImage: `url('/assets/DSC9983-1.jpg')` }}></div>
                      <div className={cls.blogHero__authorDetails}>
                        <div className={cls.blogHero__name}>William Strong</div>
                        <div className={cls.blogHero__date}>Mar 15, 2019</div>
                      </div>
                    </div>
                  </div>
                  <div className={cls.blogContent}>
                    <div className={cls.blogShare}>
                      <button className={cls.clapButton}>
                        <div className={cls.clapButton__tooltip}>1</div>
                        <div className={cls.clapButton__emoji}>
                          <span role="img" aria-label="good">👍</span>
                        </div>
                        <div className={`${cls.clapButton__sprite} ${cls.isAlternate}`}
                             style={{ backgroundPositionX: "600%" }} />
                      </button>
                      <div className={cls.blogShare__links}>
                        <a href="/#">
                          <img src="/dist/social-facebook-black.svg" alt="Share on Facebook"/>
                        </a>
                        <a href="/#">
                          <img src="/dist/social-twitter-black.svg" alt="Share on Facebook"/>
                        </a>
                        <a href="/#">
                          <img src="/dist/social-linkedin-black.svg" alt="Share on Facebook"/>
                        </a>
                      </div>
                    </div>

                    <div className={`${cls.blogBlock} ${cls.blogMarkdown}`} />
                    <div className={cls.blogFooter}>
                      <div className={cls.blogFooter__authorImg}
                           style={{ backgroundImage: `url('/assets/baisheng.png')` }}/>
                      <div className={cls.blogFooter__authorDetails}>
                        <div className={cls.blogFooter__authorName}>Baisheng</div>
                        <div className={cls.blogFooter__authorDescription}>采撷科技创始人</div>
                      </div>
                    </div>
                    <div className={cls.blogFooter__share}>
                      <div className={cls.clapButton}>12</div>
                      <button className={cls.clapButton}>
                        <div className={cls.clapButton__tooltip}>1</div>
                        <div className={cls.clapButton__emoji}>
                          <span role="img" aria-label="good">👍</span>
                        </div>
                        <div className={`${cls.clapButton__sprite} ${cls.isAlternate}`}
                             style={{ backgroundPositionX: "600%" }}></div>
                      </button>
                    </div>
                    <div className={cls.blogShare__links}>
                      <a href="/#">
                        <img src="/dist/social-facebook-black.svg" alt="Share on Facebook"/>
                      </a>
                      <a href="/#">
                        <img src="/dist/social-twitter-black.svg" alt="Share on Facebook"/>
                      </a>
                      <a href="/#">
                        <img src="/dist/social-linkedin-black.svg" alt="Share on Facebook"/>
                      </a>
                    </div>
                  </div>
                  <div className={cls.blogMore}>
                    <div className={cls.blogMore__header}>
                      接下来
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
