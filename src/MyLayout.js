import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import ReactGA from 'react-ga'
import Sound from 'react-sound'
import CookieBanner from 'react-cookie-banner'
import Header from './components/Header/'
import Nav from './components/Nav/'
// import NavPreview from './components/NavPreview/'
import PageTransition from './components/PageTransition/'
import actions from './actions/'
import constants from './constants'
import devMode from './utils/devmode'
/**
 * Layout
 * @class Layout
 * @param {String} [pathname] - Current url pathname
 * @param {Function} [setPushState] - set push state and dispatch action for react router
 * @example
 * <Layout
 *   pathname="/test"
 * />
 * @extends Component
 */
class Layout extends Component {
  static setDefaultStateLink() {
    // questo creava problemi con ie11
    // const links = document.querySelectorAll('.nav a')
    // links.forEach((value) => {
    //   value.classList.remove('current')
    // })
  }
  // componentWillMount() {
  //   this.setState({
  //     aboveTheFold: false,
  //   })
  // }

  componentWillMount() {
    this.setState({
      nav: false,
      navMobile: false,
      loaded: false,
      // scrollIcon: 'entered',
      isheaderMixBlend: false,
    })
    this.setStylePage()
    // this.update = this.update.bind(this)
    this.endAnimation = this.endAnimation.bind(this)
    this.setLoadingState = this.setLoadingState.bind(this)
    this.setTitlePrimary = this.setTitlePrimary.bind(this)
    this.setMainNav()
  }


  componentDidMount() {
    this.events()
    this.fireTracking()
    // this.update()
    this.props.onRef(this)
    this.tempPageTitle = this.props.pageTitle

    this.appHeight()

    this.$ = {
      clickSound: document.getElementById('clickSound'),
    }

    this.$.clickSound.volume = 1
  }


  componentDidUpdate(prevProps) {
    if (this.props.pathname !== prevProps.pathname) {
      // Layout.setDefaultStateLink()
      // this.setCurrentStateLink()
      // window.scrollTo(0, 0)
      this.setStylePage()
      this.fireTracking()
      this.props.setNavOpen(false)
      this.props.setLoading(true)
      this.props.setLoadingFirst(false)
    }
    if (this.props.mainNav !== prevProps.mainNav) {
      this.setMainNav()
    }
    if (this.props.mobileNav !== prevProps.mobileNav) {
      this.setMobileNav()
    }
    if (this.props.loading.status !== prevProps.loading.status) {
      if (!this.props.loading.status && !this.state.loaded) {
        if (!this.props.loading.firstLoad) {
          this.setLoadingState()
        }
        this.setStylePage()
      }
    }
    if (this.props.navOpen !== prevProps.navOpen) {
      if (this.props.navOpen) {
        this.tempPageTitle = this.props.pageTitle.value
        // window.console.log('setPageTitleValue navOpen --> ', this.props.strings.menu_title)
        this.props.setPageTitleValue(this.props.strings.menu_title)
      } else {
        // window.console.log('setPageTitleValue navOpen close --> ', this.tempPageTitle)
        this.props.setPageTitleValue(this.tempPageTitle)
      }
    }
    if (prevProps.audio !== this.props.audio) {
      this.setAmbientSound()
    }


    if (prevProps.loadingFirst !== this.props.loadingFirst && this.props.loadingFirst === false) {
      if ((!devMode) && (constants.config.GA_CODE !== '')) {
        ReactGA.initialize(constants.config.GA_CODE)
        ReactGA.ga('set', 'anonymizeIp', true)
      }
    }
  }


  setTitlePrimary(string) {
    this.props.setTitle(string)
  }


  setStylePage() {
    this.isHome = false
    this.isheaderMixBlend = false
    if ((this.props.pathname === '/') || ((window.pathSite) && (this.props.pathname === `/${window.pathSite}`))) {
      this.isHome = true
    }
  }


  setLoadingState() {
    if (!this.props.loading.status && !this.state.loaded) {
      this.setState({
        loaded: true,
      })
      this.props.setLoadingFirst(false)
    }
  }


  setMainNav() {
    if (this.props.mainNav !== undefined && this.props.mainNav.length > 0) {
      this.setState({
        nav: this.props.mainNav,
      })
      if (this.props.mobileNav === undefined || this.props.mobileNav.length === 0) {
        this.setState({
          navMobile: this.props.mainNav,
        })
      }
    }
  }


  setMobileNav() {
    if (this.props.mobileNav !== undefined && this.props.mobileNav.length > 0) {
      this.setState({
        navMobile: this.props.mobileNav,
      })
    }
  }


  getNav() {
    if (this.state.nav) {
      return (
        <Nav
          onRef={ref => (this.nav = ref)}
          data={this.state.nav}
          dataMobile={this.state.navMobile}
          dataLang={this.props.langs}
          open={this.props.navOpen}
          setNavOpen={this.props.setNavOpen}
          mediaQueryKey={this.props.mediaQueryKey}
          dataFooterNav={this.props.strings.footer_nav_link}
        >
          {/* (this.props.mediaQueryKey > 1) ? (
            <NavPreview
              data={this.state.nav[2].child}
              btnLink={{
                label: this.props.strings.all_collections,
                link: this.props.strings.archive_collections,
              }}
            />
            ) : false */}
        </Nav>
      )
    }
    return false
  }


  getCookies() {
    if (this.props.strings.cookies_info_url !== undefined) {
      return (
        <CookieBanner
          message={this.props.strings.cookies_short_text}
          cookie={this.props.strings.cookies_id}
          link={{
            msg: this.props.strings.cookies_info_label,
            url: this.props.strings.cookies_info_url,
          }}
          buttonMessage={this.props.strings.cookies_btn_text}
          dismissOnScroll={false}
          disableStyle={true}
        />
      )
    }
    return null
  }


  setAmbientSound() {
    if (this.props.audio === true) {
      return 'PLAYING'
    }
    return 'PAUSED'
  }


  // eslint-disable-next-line class-methods-use-this
  appHeight() {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    doc.style.setProperty('height', `${window.innerHeight}px`)
  }


  events() {
    window.addEventListener('mouseenter', (e) => {
      window.mouse = {
        x: e.pageX || 0,
        y: e.pageY || 0,
      }
    })
    window.addEventListener('mousemove', (e) => {
      window.mouse = {
        x: e.pageX || 0,
        y: e.pageY || 0,
      }
    })
    window.addEventListener('resize', this.appHeight)
    return this
  }


  endAnimation() {
    this.props.setAnimation(false)
  }


  fireTracking() {
    if ((!devMode) && (constants.config.GA_CODE !== '') && this.props.loadingFirst === false) {
      ReactGA.pageview(this.props.pathname)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  clickSound() {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <audio id="clickSound">
        <source src={constants.config.CLICK_MP3} type="audio/mpeg" />
      </audio>
    )
  }


  update() {
    if (this.pageTransition !== undefined) {
      this.pageTransition.update()
    }
    if (this.nav !== undefined) {
      this.nav.update()
    }
    if (this.header !== undefined) {
      this.header.update()
    }
  }


  render() {
    return (
      <div className="content-root">
        <Header
          onRef={ref => (this.header = ref)}
          show={this.state.loaded}
          pathname={this.props.pathname}
          setNavOpen={this.props.setNavOpen}
          setPointerHover={this.props.setPointerHover}
          navOpen={this.props.navOpen}
          mediaQueryKey={this.props.mediaQueryKey}
          dataSearchBlock={{
            label: `${this.props.strings.search}`,
          }}
          dataBtnBurger={{
            label: `${this.props.strings.menu}`,
            labelClose: `${this.props.strings.generic_close}`,
          }}
          dataLang={this.props.langs}
          mixBlend={this.state.isheaderMixBlend}
        />
        {this.getNav()}
        {/* <ScrollIcon status={this.state.scrollIcon} label={this.props.strings.scroll_down} /> */}
        <PageTransition
          play={this.props.loading.status}
          first={this.props.loading.firstLoad}
          data={this.props.strings.loader_string}
          checkLoaded={this.setLoadingState}
          updateTitle={this.setTitlePrimary}
          inAnimation={this.props.title.animation}
          onRef={ref => (this.pageTransition = ref)}
        />
        {this.props.children}

        <Sound
          url={constants.config.AUDIO_MP3}
          playStatus={this.setAmbientSound()}
          loop={true}
          volume={40}
        />
        {this.clickSound()}
        <canvas id="webgl_home" />
        <svg id="svgSprite">
          <symbol
            id="eye"
            viewBox="0 0 45 30"
          >
            <path
              fillRule="evenodd"
              d="M42.527,18.308 C41.199,19.903 39.692,21.496 38.026,22.988 C33.154,27.350 27.934,30.000 22.500,30.000 C17.066,30.000 11.846,27.350 6.974,22.989 C5.308,21.497 3.800,19.904 2.472,18.309 C1.670,17.346 0.003,15.000 0.003,15.000 C0.003,15.000 1.670,12.654 2.472,11.691 C3.799,10.097 5.308,8.504 6.974,7.012 C11.846,2.651 17.066,-0.000 22.500,-0.000 C27.934,-0.000 33.154,2.651 38.026,7.012 C39.692,8.503 41.199,10.097 42.527,11.691 C43.330,12.654 44.997,14.999 44.997,14.999 C44.997,14.999 43.330,17.345 42.527,18.308 ZM35.345,9.988 C31.140,6.224 26.761,4.000 22.500,4.000 C18.239,4.000 13.860,6.224 9.655,9.988 C8.144,11.340 5.136,14.760 4.947,15.000 C5.137,15.240 5.341,15.491 5.559,15.754 C6.769,17.206 8.144,18.660 9.655,20.012 C13.860,23.775 18.239,26.000 22.500,26.000 C26.761,26.000 31.140,23.775 35.345,20.012 C36.855,18.660 39.862,15.240 40.053,15.000 C39.862,14.760 36.855,11.340 35.345,9.988 ZM22.500,22.000 C18.622,22.000 15.479,18.865 15.479,15.000 C15.479,11.134 18.622,8.000 22.500,8.000 C26.378,8.000 29.521,11.134 29.521,15.000 C29.521,18.865 26.378,22.000 22.500,22.000 ZM22.500,12.000 C20.838,12.000 19.491,13.343 19.491,15.000 C19.491,16.656 20.838,18.000 22.500,18.000 C24.161,18.000 25.509,16.656 25.509,15.000 C25.509,13.343 24.161,12.000 22.500,12.000 Z"
            />
          </symbol>
          <symbol
            id="bullet"
            viewBox="0 0 12 13"
          >
            <path
              d="M9.340,8.715 L4.932,9.896 L1.706,6.669 L2.887,2.262 L7.294,1.081 L10.521,4.307 L9.340,8.715 Z"
            />
          </symbol>
          <symbol
            id="logo"
            viewBox="0 0 87 15"
          >
            <path
              fillRule="evenodd"
              d="M80.908,6.951 L86.516,6.951 L86.516,13.771 L84.324,13.771 L84.324,11.776 C83.712,13.278 82.152,14.028 80.374,14.028 C76.899,14.028 74.312,11.197 74.312,7.015 C74.312,2.854 77.057,0.001 80.552,0.001 C84.146,0.001 86.220,2.146 86.476,5.556 L84.067,5.664 C83.909,3.669 82.685,2.361 80.611,2.361 C78.340,2.361 76.879,4.184 76.879,7.015 C76.879,9.910 78.380,11.755 80.809,11.755 C82.566,11.755 83.850,10.661 84.205,8.945 L80.908,8.945 L80.908,6.951 ZM64.477,4.248 L64.477,13.771 L62.186,13.771 L62.186,0.259 L64.635,0.259 L70.520,9.267 L70.520,0.259 L72.811,0.259 L72.811,13.771 L70.836,13.771 L64.477,4.248 ZM57.624,0.259 L60.093,0.259 L60.093,13.771 L57.624,13.771 L57.624,0.259 ZM47.099,0.259 L49.567,0.259 L49.567,11.541 L56.143,11.541 L56.143,13.771 L47.099,13.771 L47.099,0.259 ZM45.558,13.771 L43.030,13.771 C42.774,13.406 42.616,12.484 42.517,10.983 C42.418,9.460 41.786,8.774 40.364,8.774 L37.442,8.774 L37.442,13.771 L35.013,13.771 L35.013,0.259 L40.641,0.259 C43.820,0.259 45.380,1.868 45.380,4.377 C45.380,6.414 44.156,7.594 42.635,7.808 C44.057,8.109 44.788,9.010 44.926,10.597 C45.084,12.591 45.143,13.278 45.558,13.771 ZM42.931,4.570 C42.931,3.219 42.102,2.425 40.305,2.425 L37.442,2.425 L37.442,6.672 L40.305,6.672 C42.102,6.672 42.931,6.028 42.931,4.570 ZM24.072,0.259 L33.195,0.259 L33.195,2.489 L26.501,2.489 L26.501,5.771 L31.754,5.771 L31.754,7.980 L26.501,7.980 L26.501,11.541 L33.373,11.541 L33.373,13.771 L24.072,13.771 L24.072,0.259 ZM18.562,13.771 L16.094,13.771 L16.094,2.489 L11.690,2.489 L11.690,0.259 L23.025,0.259 L23.025,2.489 L18.562,2.489 L18.562,13.771 ZM7.720,5.985 C10.169,6.479 11.314,7.744 11.314,9.932 C11.314,12.591 9.201,14.028 6.397,14.028 C3.198,14.028 0.888,12.227 0.888,8.967 L3.159,8.860 C3.257,10.961 4.659,11.905 6.397,11.905 C7.938,11.905 8.925,11.240 8.925,10.103 C8.925,9.074 8.174,8.688 6.871,8.409 L4.502,7.937 C2.566,7.551 1.223,6.393 1.223,4.162 C1.223,1.631 3.060,0.001 5.963,0.001 C9.221,0.001 11.058,1.824 11.097,4.827 L8.826,4.913 C8.747,3.069 7.641,2.103 5.943,2.103 C4.482,2.103 3.652,2.811 3.652,3.969 C3.652,4.956 4.304,5.299 5.429,5.535 L7.720,5.985 Z"
            />
          </symbol>

          <symbol
            id="sterling-logo"
            viewBox="0 0 80 80"
          >
            <path d="m72 62.6c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z" />
            <path d="m72 46.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m40 71c-0.5 0-1 0.4-1 1 0 0.5 0.4 1 1 1 0.5 0 1-0.4 1-1 0-0.5-0.5-1-1-1z" />
            <path d="m40 63.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8 0.5 0 0.8-0.4 0.8-0.8 0-0.5-0.3-0.8-0.8-0.8z" />
            <path d="m72 58.8c-0.7 0-1.2 0.6-1.2 1.2 0 0.7 0.6 1.2 1.2 1.2s1.2-0.6 1.2-1.2c0-0.7-0.5-1.2-1.2-1.2z" />
            <path d="m72 54.8c-0.7 0-1.2 0.6-1.2 1.2s0.6 1.2 1.2 1.2 1.2-0.6 1.2-1.2-0.5-1.2-1.2-1.2z" />
            <path d="m72 50.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m40 67.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8 0.5 0 0.8-0.4 0.8-0.8 0-0.5-0.3-0.8-0.8-0.8z" />
            <path d="m40 43.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m40 59.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m36 67.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8s0.8-0.4 0.8-0.8c0-0.5-0.3-0.8-0.8-0.8z" />
            <path d="m40 39.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m40 55.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m40 51.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.6-0.2 0.6-0.6 0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m40 47.4c-0.3 0-0.6 0.2-0.6 0.6s0.2 0.6 0.6 0.6c0.3 0 0.6-0.2 0.6-0.6s-0.3-0.6-0.6-0.6z" />
            <path d="m64 54.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m64 51c-0.5 0-1 0.4-1 1s0.4 1 1 1c0.5 0 1-0.4 1-1s-0.5-1-1-1z" />
            <path d="m36 71.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8s0.8-0.4 0.8-0.8c0-0.5-0.3-0.8-0.8-0.8z" />
            <circle cx="64" cy="48" r="1" />
            <path d="m64 58.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m64 43.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8 0.5 0 0.8-0.4 0.8-0.8 0-0.5-0.3-0.8-0.8-0.8z" />
            <path d="m64 66.8c-0.7 0-1.2 0.6-1.2 1.2 0 0.7 0.6 1.2 1.2 1.2s1.2-0.6 1.2-1.2c0-0.7-0.5-1.2-1.2-1.2z" />
            <circle cx="64" cy="64" r="1.2" />
            <path d="m68 66.6c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z" />
            <path d="m68 50.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m64 39.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8c0.5 0 0.8-0.4 0.8-0.8s-0.3-0.8-0.8-0.8z" />
            <path d="m68 47c-0.5 0-1 0.4-1 1s0.4 1 1 1 1-0.4 1-1-0.5-1-1-1z" />
            <path d="m68 54.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m68 43c-0.5 0-1 0.4-1 1 0 0.5 0.4 1 1 1s1-0.4 1-1c0-0.5-0.5-1-1-1z" />
            <path d="m68 58.8c-0.7 0-1.2 0.6-1.2 1.2 0 0.7 0.6 1.2 1.2 1.2s1.2-0.6 1.2-1.2c0-0.7-0.5-1.2-1.2-1.2z" />
            <path d="m68 62.8c-0.7 0-1.2 0.6-1.2 1.2s0.6 1.2 1.2 1.2 1.2-0.6 1.2-1.2-0.5-1.2-1.2-1.2z" />
            <path d="m28 71.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m24 63.4c-0.3 0-0.6 0.2-0.6 0.6s0.2 0.6 0.6 0.6c0.3 0 0.6-0.2 0.6-0.6s-0.3-0.6-0.6-0.6z" />
            <path d="m24 67.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.6-0.2 0.6-0.6 0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m28 59.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.6-0.2 0.6-0.6 0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m20 67.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6s0.6-0.2 0.6-0.6c0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m24 55.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <circle cx="24" cy="72" r=".7" />
            <path d="m28 55.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m28 51.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <circle cx="24" cy="60" r=".4" />
            <path d="m20 63.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m20 59.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m20 71.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6s0.6-0.2 0.6-0.6c0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m16 63.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m16 71.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.6-0.2 0.6-0.6 0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m16 67.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m12 67.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m64 70.6c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z" />
            <path d="m36 43.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m32 71.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8s0.8-0.4 0.8-0.8c0-0.5-0.3-0.8-0.8-0.8z" />
            <circle cx="36" cy="48" r=".4" />
            <circle cx="36" cy="52" r=".6" />
            <circle cx="36" cy="60" r=".7" />
            <path d="m32 67.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m36 55.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6s0.6-0.2 0.6-0.6c0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m32 63.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m32 47.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m28 63.4c-0.3 0-0.6 0.2-0.6 0.6s0.2 0.6 0.6 0.6c0.3 0 0.6-0.2 0.6-0.6s-0.3-0.6-0.6-0.6z" />
            <circle cx="36" cy="64" r=".7" />
            <path d="m28 67.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m32 51.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m32 59.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.6-0.2 0.6-0.6 0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m32 55.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.6-0.2 0.6-0.6 0-0.3-0.3-0.6-0.6-0.6z" />
            <circle cx="44" cy="40" r=".4" />
            <path d="m56 70.8c-0.7 0-1.2 0.6-1.2 1.2 0 0.7 0.6 1.2 1.2 1.2 0.7 0 1.2-0.6 1.2-1.2 0-0.7-0.5-1.2-1.2-1.2z" />
            <path d="m56 66.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <circle cx="52" cy="64" r="1" />
            <path d="m56 59c-0.5 0-1 0.4-1 1s0.4 1 1 1c0.5 0 1-0.4 1-1s-0.5-1-1-1z" />
            <path d="m52 66.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m52 59c-0.5 0-1 0.4-1 1s0.4 1 1 1 1-0.4 1-1-0.5-1-1-1z" />
            <path d="m56 62.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m56 55c-0.5 0-1 0.4-1 1s0.4 1 1 1c0.5 0 1-0.4 1-1s-0.5-1-1-1z" />
            <path d="m52 31.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m52 55.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8c0.5 0 0.8-0.4 0.8-0.8s-0.3-0.8-0.8-0.8z" />
            <path d="m52 39.4c-0.3 0-0.6 0.2-0.6 0.6s0.2 0.6 0.6 0.6 0.6-0.2 0.6-0.6-0.3-0.6-0.6-0.6z" />
            <path d="m52 35.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6s0.6-0.2 0.6-0.6c0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m52 51.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8c0.5 0 0.8-0.4 0.8-0.8s-0.3-0.8-0.8-0.8z" />
            <path d="m52 47.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m52 43.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m56 51.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8c0.5 0 0.8-0.4 0.8-0.8s-0.3-0.8-0.8-0.8z" />
            <circle cx="72" cy="24" r=".7" />
            <path d="m72 19.4c-0.3 0-0.6 0.2-0.6 0.6s0.2 0.6 0.6 0.6 0.6-0.2 0.6-0.6-0.3-0.6-0.6-0.6z" />
            <path d="m72 15.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6s0.6-0.2 0.6-0.6c0-0.3-0.3-0.6-0.6-0.6z" />
            <circle cx="68" cy="28" r=".7" />
            <path d="m56 0h-32c-13.3 0-24 10.7-24 24v32c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-32c0-13.3-10.7-24-24-24zm20 27.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8v2.3c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8v2.3c-0.5 0-1 0.4-1 1h-2.2c0-0.5-0.4-0.8-0.8-0.8s-0.8 0.4-0.8 0.8h-2.3c0-0.5-0.4-0.8-0.8-0.8-0.5 0-0.8 0.4-0.8 0.8h-2.5c0-0.4-0.3-0.7-0.7-0.7s-0.7 0.3-0.7 0.7h-2.6c0-0.4-0.3-0.7-0.7-0.7s-0.7 0.3-0.7 0.7h-2.8c0-0.3-0.2-0.6-0.6-0.6-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.5-0.2 0.6-0.5 1 0 1.9 0.1 2.8 0.3 0.1 0.2 0.3 0.4 0.6 0.4 0.2 0 0.3-0.1 0.5-0.2 2.5 0.6 4.8 1.6 6.9 3-0.1 0.1-0.2 0.3-0.2 0.5 0 0.5 0.4 0.8 0.8 0.8 0.3 0 0.5-0.1 0.6-0.3 1 0.8 1.9 1.7 2.8 2.7-0.2 0.1-0.4 0.4-0.4 0.7 0 0.5 0.4 1 1 1 0.2 0 0.4-0.1 0.6-0.2 1.3 1.9 2.2 3.9 2.8 6.2-0.4 0.2-0.6 0.6-0.6 1.1 0 0.6 0.5 1.1 1 1.2 0.1 0.5 0.1 1 0.2 1.5-0.7 0-1.2 0.6-1.2 1.2s0.5 1.2 1.2 1.2c0 0.5-0.1 0.9-0.1 1.4-0.7 0.1-1.2 0.7-1.2 1.4 0 0.5 0.3 1 0.7 1.2-0.5 2-1.4 4-2.5 5.7-0.2-0.2-0.5-0.2-0.8-0.2-0.8 0-1.4 0.6-1.4 1.4 0 0.4 0.2 0.8 0.5 1.1-0.6 0.7-1.3 1.4-2.1 2.1-0.3-0.3-0.6-0.5-1.1-0.5-0.8 0-1.4 0.6-1.4 1.4 0 0.3 0.1 0.6 0.2 0.8-1.7 1.1-3.6 2-5.7 2.5-0.2-0.4-0.7-0.7-1.2-0.7-0.7 0-1.3 0.5-1.4 1.2-0.5 0.1-0.9 0.1-1.4 0.1 0-0.7-0.6-1.2-1.2-1.2-0.7 0-1.2 0.6-1.2 1.2h-1.5c0-0.7-0.6-1.2-1.2-1.2s-1.2 0.6-1.2 1.2h-1.7c0-0.6-0.5-1.1-1.1-1.1s-1.1 0.5-1.1 1.1h-1.8c0-0.6-0.5-1.1-1.1-1.1s-1.1 0.5-1.1 1.1h-1.9c0-0.5-0.4-1-1-1-0.5 0-1 0.4-1 1h-2c0-0.5-0.4-1-1-1s-1 0.4-1 1h-2.2c0-0.5-0.4-0.8-0.8-0.8s-0.8 0.4-0.8 0.8h-2.3c0-0.5-0.4-0.8-0.8-0.8s-0.8 0.4-0.8 0.8h-2.5c0-0.4-0.3-0.7-0.7-0.7s-0.7 0.3-0.7 0.7c-0.9 0-1.8-0.1-2.7-0.3-0.1-0.2-0.3-0.4-0.6-0.4-0.2 0-0.3 0.1-0.5 0.2-2.6-0.6-5.1-1.7-7.2-3.3 0.1-0.1 0.1-0.2 0.1-0.2 0-0.2-0.2-0.4-0.4-0.4-0.1 0-0.3 0.1-0.3 0.2-4.8-3.8-7.8-9.5-7.8-15.9v-12h20c-11 0-20-9-20-20s9-20 20-20h32c6.4 0 12.1 3 15.8 7.7-0.1 0.1-0.2 0.2-0.2 0.3 0 0.2 0.2 0.4 0.4 0.4 0.1 0 0.2 0 0.2-0.1 1.5 2.1 2.7 4.6 3.3 7.2-0.1 0.1-0.2 0.3-0.2 0.5 0 0.3 0.2 0.5 0.4 0.6l0.3 2.7c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7v2.5z" />
            <path d="m56 47.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8c0.5 0 0.8-0.4 0.8-0.8s-0.3-0.8-0.8-0.8z" />
            <path d="m72 31.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8s0.8-0.4 0.8-0.8c0-0.5-0.3-0.8-0.8-0.8z" />
            <circle cx="72" cy="28" r=".7" />
            <path d="m60 31.4c-0.3 0-0.6 0.2-0.6 0.6s0.2 0.6 0.6 0.6c0.3 0 0.6-0.2 0.6-0.6s-0.3-0.6-0.6-0.6z" />
            <circle cx="68" cy="32" r=".7" />
            <path d="m56 43.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m56 39.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m64 31.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m68 23.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6s0.6-0.2 0.6-0.6c0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m68 19.4v0c-0.3-6.3-5.6-11.4-12-11.4-6.6 0-12 5.4-12 12 0 6.4 5.1 11.7 11.5 12 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.6-0.2 0.6-0.6 6.2-0.3 11.2-5.2 11.4-11.4 0.3 0 0.6-0.2 0.6-0.6s-0.4-0.6-0.7-0.6z" />
            <path d="m44 43.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6s0.6-0.2 0.6-0.6c0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m44 55.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m44 35.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <circle cx="68" cy="12" r=".4" />
            <path d="m44 51.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m60 70.8c-0.7 0-1.2 0.6-1.2 1.2 0 0.7 0.6 1.2 1.2 1.2 0.7 0 1.2-0.6 1.2-1.2 0-0.7-0.5-1.2-1.2-1.2z" />
            <circle cx="60" cy="40" r=".7" />
            <path d="m44 47.4c-0.3 0-0.6 0.2-0.6 0.6s0.2 0.6 0.6 0.6 0.6-0.2 0.6-0.6-0.3-0.6-0.6-0.6z" />
            <path d="m68 15.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m60 51c-0.5 0-1 0.4-1 1s0.4 1 1 1c0.5 0 1-0.4 1-1s-0.5-1-1-1z" />
            <path d="m60 66.8c-0.7 0-1.2 0.6-1.2 1.2 0 0.7 0.6 1.2 1.2 1.2 0.7 0 1.2-0.6 1.2-1.2 0-0.7-0.5-1.2-1.2-1.2z" />
            <path d="m60 43.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8 0.5 0 0.8-0.4 0.8-0.8 0-0.5-0.3-0.8-0.8-0.8z" />
            <path d="m60 47.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8c0.5 0 0.8-0.4 0.8-0.8s-0.3-0.8-0.8-0.8z" />
            <path d="m60 55c-0.5 0-1 0.4-1 1s0.4 1 1 1c0.5 0 1-0.4 1-1s-0.5-1-1-1z" />
            <path d="m60 62.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m60 58.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m52 70.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
            <path d="m48 51.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m48 55.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8 0.8-0.4 0.8-0.8-0.3-0.8-0.8-0.8z" />
            <path d="m44 59.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8 0.8-0.4 0.8-0.8-0.3-0.8-0.8-0.8z" />
            <path d="m48 67c-0.5 0-1 0.4-1 1 0 0.5 0.4 1 1 1s1-0.4 1-1c0-0.5-0.5-1-1-1z" />
            <path d="m48 43.4c-0.3 0-0.6 0.2-0.6 0.6 0 0.3 0.2 0.6 0.6 0.6 0.3 0 0.6-0.2 0.6-0.6 0-0.3-0.3-0.6-0.6-0.6z" />
            <path d="m48 59.2c-0.5 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8 0.8-0.4 0.8-0.8-0.3-0.8-0.8-0.8z" />
            <path d="m48 63c-0.5 0-1 0.4-1 1 0 0.5 0.4 1 1 1s1-0.4 1-1c0-0.5-0.5-1-1-1z" />
            <path d="m48 47.3c-0.4 0-0.7 0.3-0.7 0.7s0.3 0.7 0.7 0.7 0.7-0.3 0.7-0.7-0.3-0.7-0.7-0.7z" />
            <path d="m44 67c-0.5 0-1 0.4-1 1 0 0.5 0.4 1 1 1s1-0.4 1-1c0-0.5-0.5-1-1-1z" />
            <path d="m44 71c-0.5 0-1 0.4-1 1 0 0.5 0.4 1 1 1s1-0.4 1-1c0-0.5-0.5-1-1-1z" />
            <path d="m44 63.2c-0.5 0-0.8 0.4-0.8 0.8 0 0.5 0.4 0.8 0.8 0.8s0.8-0.4 0.8-0.8c0-0.5-0.3-0.8-0.8-0.8z" />
            <path d="m48 35.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m48 31.6c-0.2 0-0.4 0.2-0.4 0.4s0.2 0.4 0.4 0.4 0.4-0.2 0.4-0.4-0.2-0.4-0.4-0.4z" />
            <path d="m48 39.4c-0.3 0-0.6 0.2-0.6 0.6s0.2 0.6 0.6 0.6c0.3 0 0.6-0.2 0.6-0.6s-0.3-0.6-0.6-0.6z" />
            <path d="m48 70.9c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z" />
          </symbol>
        </svg>
        {/* {this.getCookies()} */}
      </div>
    )
  }
}


Layout.defaultProps = {
  pageTitle: '',
  mainNav: undefined,
}


const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  navOpen: state.nav.open,
  loading: state.loading,
  loadingFirst: state.loading.firstLoad,
  mainNav: state.nav.main_menu,
  mobileNav: state.nav.mobile,
  mediaQueryKey: state.mediaQuery.key,
  strings: state.language.string,
  langs: state.language.sites,
  title: state.page.title,
  pageTitle: state.page.pageTitle,
  audio: state.audio.to,
})


const mapDispatchToProps = dispatch => ({
  setPushState: (state) => { dispatch(push(state)) },
  setNavOpen: (state) => { dispatch(actions.nav.setOpen(state)) },
  setPointerHover: (state) => { dispatch(actions.pointer.setHover(state)) },
  getMedia: () => { dispatch(actions.page.getMedia()) },
  setLoading: (state) => { dispatch(actions.loading.setStatus(state)) },
  setLoadingFirst: (state) => { dispatch(actions.loading.setFirstLoad(state)) },
  setAnimation: (index) => { dispatch(actions.page.setTitleAnimation(index)) },
  setTitle: (index) => { dispatch(actions.page.setTitleValue(index)) },
  setPageTitleValue: (string) => { dispatch(actions.page.setPageTitleValue(string)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

