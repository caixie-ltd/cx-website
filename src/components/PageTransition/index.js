import React, { Component } from "react"
import injectSheet from "react-jss"
import { connect } from "react-redux"
import { TweenMax, Power4, Power3 } from "gsap"
import HTMLParser from "react-html-parser"
import ButtonIcon from "../../components/ButtonIcon"
import SplitText from "../../vendors/SplitText.min"
import actions from "../../actions/"
import style from "./style"

/**
 * PageTransition
 * @class PageTransition
 * @example
 * <PageTransition />
 */
class PageTransition extends Component {
  componentWillMount() {
    this.resetStatus()

    this.opt = {
      speed: 1,
    }

    if (this.props.content["/products"] === undefined) {
      this.props.getProdsPage("/products")
      this.props.getProducts("products")
    }
  }

  componentDidMount() {
    const { classes } = this.props
    this.$ = {
      root: this.node,
      transition: this.node.getElementsByClassName(classes.transition),
      pittogramma: this.node.getElementsByClassName(classes.pittogramma),
      sterlingLogo: this.node.getElementsByClassName(classes.sterlingLogo),
      logo: this.node.getElementsByClassName(classes.logo),
      enterBtn: this.node.getElementsByClassName(classes.enterBtn),
      firstTime: this.node.getElementsByClassName(classes.firstTime),
      payoff: this.node.getElementsByClassName(classes.payoff),
      clickSound: document.getElementById("clickSound"),
    }

    if (this.props.first === true) {
      this.events()
      TweenMax.set(this.$.root, {
        zIndex: 200,
      })
      TweenMax.set(this.$.transition, {
        left: 0,
      })

      this.splitPayoff = new SplitText(this.$.payoff, { type: "words, chars" })

      TweenMax.set([this.$.sterlingLogo, this.$.logo, this.$.enterBtn], {
        alpha: 0,
      })

      TweenMax.set(this.splitPayoff.words, {
        overflow: "hidden",
      })

      TweenMax.set(this.splitPayoff.chars, {
        y: "100%",
        skewY: "10deg",
      })

      TweenMax.to([this.$.sterlingLogo, this.$.logo], 1, {
        alpha: 1,
        ease: Power3.easeIn,
        delay: 0.5,
      })

      TweenMax.staggerTo(this.splitPayoff.chars, 1, {
        y: "0%",
        skewY: "0deg",
        ease: Power3.easeInOut,
        delay: 1,
      }, 0.015)

      TweenMax.to(this.$.enterBtn, 1, {
        alpha: 1,
        ease: Power3.easeIn,
        delay: 2,
      })

      // DEBUG
      // this.$.enterBtn[0].click()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.play !== prevProps.play) {
      if (this.props.play) {
        this.in()
      } else {
        this.incrementStatus()
      }
    }

    if (this.state.status !== prevState.status) {
      if (this.state.status === 2) {
        this.out()
      }

      if (window.location.href.indexOf("privacy") !== -1) {
        this.out()
      }
    }
  }

  in() {
    const { transition, pittogramma } = this.$

    // this.setWidth()
    TweenMax.set(this.node, { display: "block" })
    TweenMax.set(transition, { left: "-100%" })

    TweenMax.set(pittogramma, {
      rotationY: "-72deg",
    })

    if (this.props.audio) {
      setTimeout(() => {
        this.$.clickSound.play()
      }, 200)
    }

    TweenMax.to(transition, this.opt.speed, {
      delay: 0.4,
      left: "0%",
      ease: Power4.easeInOut,
      onComplete: () => {
        window.scrollTo(0, 0)
        this.incrementStatus()
      },
    })

    // RIMUOVO PITTOGRAMMA
    TweenMax.to(pittogramma, this.opt.speed, {
      delay: 0.6,
      alpha: 1,
      rotationY: "0deg",
      x: "-50%",
      y: "-50%",
      ease: Power4.easeInOut,
    })

    TweenMax.to(transition, (this.opt.speed / 2), {
      delay: 0.4,
      skewX: "15deg",
      ease: Power4.easeIn,
      onComplete: () => {
        TweenMax.to(transition, (this.opt.speed / 2), {
          skewX: "0deg",
          ease: Power4.easeOut,
        })
      },
    })
  }

  out() {
    const { transition, pittogramma } = this.$

    TweenMax.set(transition, {
      left: "0%",
      skewX: "0deg",
    })

    TweenMax.to(pittogramma, this.opt.speed / 1.2, {
      alpha: 0,
      rotationY: "72deg",
      x: "-50%",
      y: "-50%",
      ease: Power4.easeInOut,
    })

    TweenMax.to(transition, this.opt.speed, {
      left: "100%",
      ease: Power4.easeInOut,
      onComplete: () => {
        this.resetStatus()
        TweenMax.set(this.node, { display: "none" })
      },
    })

    TweenMax.to(transition, (this.opt.speed / 2), {
      skewX: "-15deg",
      ease: Power4.easeIn,
      onComplete: () => {
        TweenMax.to(transition, (this.opt.speed / 2), {
          skewX: "0deg",
          ease: Power4.easeOut,
        })
      },
    })
  }

  events() {
    if (this.$.firstTime[0] !== undefined) {
      this.$.enterBtn[0].addEventListener("click", () => {
        this.$.clickSound.play()
        TweenMax.to(this.$.firstTime[0], 1, {
          alpha: 0,
          onComplete: () => {
            this.out()
            this.props.setLoadingFirst(false)
          },
        })
        this.props.setAudioTo(!this.props.audio)
      })
    }
  }

  incrementStatus() {
    this.setState({
      status: this.state.status + 1,
    })
  }

  resetStatus() {
    this.setState({
      status: 0,
    })
  }


  renderFirstTime() {
    const { classes } = this.props


    return (
      <div className={classes.firstTime}>
        <svg className={classes.sterlingLogo}>
          <use xlinkHref="#sterling-logo"/>
        </svg>
        <svg className={classes.logo}>
          <use xlinkHref="#logo"/>
        </svg>
        <div className={classes.payoff}>
          Over 40 years of trusted quality<br/>in the pharmaceutical industry
        </div>
        <div className={`${classes.enterBtn} enterBtn`}>
          <ButtonIcon
            className="cta"
            status={this.props.transition}
            data={{
              icon: "arrow-right",
            }}
            border
            effect="magnetic"
          />
          <span>Enter</span>
        </div>
        <div className={classes.cookieLaw}>
          {HTMLParser(this.props.string.cookies_short_text)}
        </div>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root} ref={(node) => {
        this.node = node
      }}>
        <div className={classes.wrap}>
          <div className={classes.transition}/>
          <div className={classes.pittogramma}>
            <svg className={classes.sterlingLogo}>
              <use xlinkHref="#sterling-logo"/>
            </svg>
          </div>
          {this.props.loadingFirst ? this.renderFirstTime() : ""}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  loadingState: state.loading.incremental,
  loadingFirst: state.loading.firstLoad,
  audio: state.audio.to,
  content: state.page.pages,
  string: state.language.string,
})

const mapDispatchToProps = dispatch => ({
  updateLoading: (index) => {
    dispatch(actions.loading.setStatus(index))
  },
  setLoadingFirst: (state) => {
    dispatch(actions.loading.setFirstLoad(state))
  },
  getPage: (index) => {
    dispatch(actions.page.getDataPage(index))
  },
  getProducts: (cpt, index) => {
    dispatch(actions.page.getListCPT(cpt, index))
  },
  getProdsPage: (index) => {
    dispatch(actions.page.getDataPage(index))
  },
  setAudioTo: (value) => {
    dispatch(actions.audio.setAudioTo(value))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(style)(PageTransition))

