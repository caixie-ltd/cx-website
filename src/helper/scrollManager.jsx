import React, { Component } from "react"
import _ from "lodash"
import ScrollIndicator from "../components/scrollIndicator.jsx"
import { BrowserView, isBrowser, isMobile } from "react-device-detect"
import { connect } from "react-redux"

// import { TweenLite } from "gsap/TweenLite"

class ConnectedScrollManager extends Component {
  allowChange = true
  animation = null

  state = {
    page: null,
    pageHeight: 0,
    windowHeight: null,
    translateValue: 0,
    scrollPercentage: 0,
    isScrolling: false,
    wrapperStyle: null,
    contentStyle: null,
  }

  constructor(props) {
    super(props)

    this.contentNode = React.createRef()
  }

  componentDidMount() {
    this.setState({
      windowHeight: typeof window !== "undefined" && window.innerHeight,
    })

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.onResize)
    }
    setTimeout(this.onResize, 500)
  }

  componentDidUpdate() {
    if (!this.state.page) {
      this.setState(
        {
          page: this.props.page,
        },
        () => {
          this.setupForScroll(this.contentNode.current.scrollHeight)

          if (typeof window !== "undefined") {
            window.addEventListener(
              isBrowser ? "wheel" : "scroll",
              this.onScroll,
            )
          }
        },
      )
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let value = nextProps.jumpToScrollValue
    if (value && value !== 0 && value !== this.state.translateValue) {

      setTimeout(() => {
        this.setState({
          translateValue: value,
          scrollPercentage: _.round(value / this.state.pageHeight, 8),
        })
        this.props.updateMomentumScrollValue(value)
        this.props.updateScrollValue(value)
      }, 300)
    } else {
    }
  }

  componentWillUnmount() {
    this.allowChange = false
    cancelAnimationFrame(this.animation)

    if (typeof window !== "undefined") {
      window.removeEventListener(isBrowser ? "wheel" : "scroll", this.onScroll)
      window.removeEventListener("resize", this.onResize)
    }
    this.translateY()
  }

  translateY = () => {
    if (this.allowChange) {
      const dY = this.props.scrollValue - this.state.translateValue
      let scrollTo = this.state.translateValue

      scrollTo += dY / 8
      scrollTo = _.round(scrollTo, 2)

      this.setState({
        translateValue: scrollTo,
        scrollPercentage: _.round(scrollTo / this.state.pageHeight, 8),
      })

      this.props.updateMomentumScrollValue(scrollTo)

      if (_.round(this.props.scrollValue - scrollTo) === 0) {
        cancelAnimationFrame(this.animation)
        this.setState({
          isScrolling: false,
        })
        return
      }

      this.animation = requestAnimationFrame(this.translateY)
    }
  }

  onScroll = event => {
    if (!this.state.isScrolling) {
      this.animation = requestAnimationFrame(this.translateY)
    }
    const windowScroll = isBrowser
      ? this.props.scrollValue + event.deltaY
      : window.scrollY
    const scrollValue = _.clamp(windowScroll, 0, this.state.pageHeight)

    this.setState({
      isScrolling: true,
    })

    this.props.updateScrollValue(scrollValue)
  }

  onResize = event => {

    this.setState(
      {
        windowHeight: typeof window !== "undefined" && window.innerHeight,
      },
      () => {
        this.setupForScroll(this.contentNode.current.scrollHeight)
      },
    )
  }

  setupForScroll = height => {
    this.setState({
      pageHeight: height - this.state.windowHeight,
      wrapperStyle: {
        height: `${height}px`,
      },
      contentStyle: {
        position: isBrowser ? "fixed" : "auto",
        top: "0",
        width: "100vw",
        boxSizing: "border-box",
        zIndex: 1,
        overflow: isMobile && "hidden",
      },
    })
  }

  render() {
    return (
      <React.Fragment>
        <BrowserView>
          <div style={this.state.wrapperStyle}/>
        </BrowserView>

        <div
          style={{
            transform:
              isBrowser && `translate3d(0, -${this.state.translateValue}px, 0)`,
            willChange: "transform",
            ...this.state.contentStyle,
          }}
          ref={this.contentNode}
        >
          {this.props.children}
        </div>
        <BrowserView>
          <ScrollIndicator scrollPercentage={this.state.scrollPercentage}/>
        </BrowserView>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSymbol: state.isSymbol,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showSymbol: () => dispatch({ type: "SHOW_SYMBOL" }),
    hideSymbol: () => dispatch({ type: "SHOW_LOGO" }),
  }
}

const ScrollManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedScrollManager)

export default ScrollManager
