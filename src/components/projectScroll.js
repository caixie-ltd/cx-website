import { TimelineMax } from "gsap/TimelineMax"
import { $, $$, $on, anchorScroll, debounce } from "../helper/help"
import { Power4 } from "gsap/TweenLite"
import Sticky from "./sticky"
import { Component } from "react"
// import Layout from "../pages/project"
import React from "react"
import { isBrowser } from "react-device-detect"
import { connect } from "react-redux"
// import _ from "lodash"
import "./vincit-projects.css"
import { CustomEase } from "../gsap-bonus/CustomEase"

const projectStyle = {
  visibility: "inherit",
  opacity: 1,
  transform: "matrix(1, 0, 0, 1, 0, 0)",
}

// style="visibility: inherit; opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);"
const styleBgs = [
  { backgroundImage: "url('/assets/Yamaha.png')" },
  { backgroundImage: "url('/assets/KLG_LaptopHero.png')" },
  { backgroundImage: "url('/assets/Metso-Hero.png')" },
  { backgroundImage: "url('/assets/case-kcrw-featured.png')" },
  { backgroundImage: "url('/assets/ST_Hero_Dup.png')" },
  { backgroundImage: "url('/assets/RTN_Search_Hero.png')" },
  { backgroundImage: "url('/assets/superoperator-hero.png')" },
  { backgroundImage: "url('/assets/Framery-Hero.png')" },
  { backgroundImage: "url('/assets/Yepzon-Hero.png')" },
]

class ConnectedProjectScroll extends Component {
  constructor(props) {
    super(props)
    // self.projects = $$(".work__project")
    // self.imageContainers = $$(".work__image-container")
    // self.images = $$(".work__image")
    // self.dots = $$(".dots__dot-container")
    // self.wiper = $(".work__wiper")
    // self.dash = $(".dots__dash")
    // self.activeDot = $(".dots__active-dot")
    this.allProjects = React.createRef()
    // this.sectionProjects = React.createRef()
    // this.imageContainers = React.createRef()
    // this.images = React.createRef()
    // this.images = $$(document, ".work__image")
    // this.images = []
    // this.images.current
    // this.images = $$(document, ".work__image")
    // this.dots = React.createRef()
    // this.wiper = React.createRef()
    // this.dash = React.createRef()
    // this.activeDot = React.createRef()
    // this.mainNode = React.createRef()
    // this.sectionWorks = React.createRef()
    // this.sectionIntro = React.createRef()
    // this.sectionService = React.createRef()
    // this.sectionInsights = React.createRef()
    // this.sectionFooter = React.createRef()
  }

  state = {
    prevDotIndex: null,
    prevDotPosition: 0,
    currentAnimation: null,
    scrolled: 0,
    windowHalfHeight: 0,
    viewportCenter: 0,
    pageHeight: 0,
    windowHeight: null,
    translateValue: 0,
    scrollPercentage: 0,
    isScrolling: false,
  }

  componentDidMount() {
    this.projects = $$(document, ".work__project")
    this.wiper = $(this.allProjects.current, ".work__wiper")

    this.imageContainers = $$(this.allProjects.current, ".work__image-container")
    this.images = $$(this.allProjects.current, ".work__image")
    this.dots = $$(this.allProjects.current, ".dots__dot-container")
    this.dash = $(this.allProjects.current, ".dots__dash")
    this.activeDot = $(document, ".dots__active-dot")
    // this.imageContainers = $$(this.allProjects.current, ".work__image-container")
    // this.images = $$(this.allProjects.current, ".work__image")
    // this.dots = $$(this.allProjects.current, ".dots__dot-container")
    // this.wiper = $(this.allProjects.current, ".work__wiper")
    this.bigWiggleEase = CustomEase.create("custom", "M0,0 C0,0.872 0,1.3 0.2,1.3 0.33,1.3 0.309,0.85 0.414,0.85 0.498,0.85 0.506,1.061 0.6,1.062 0.672,1.062 0.69,0.952 0.748,0.952 0.783,0.952 0.835,1.022 0.887,1.024 0.932,1.024 0.976,1 1,1")

    this.calculateValues()

    if (this.state.prevDotIndex === null) {
      if (!(this.viewportCenter < this.firstTop)) {
        this.setState({
          prevDotIndex: this.imageContainers.length + 1,
        })
        // this.state.prevDotIndex = this.imageContainers.length + 1
      }
    }
    this.toggleActive()
    // console.log(this.state.prevDotIndex)
    if (typeof window !== "undefined") {
      window.addEventListener(
        isBrowser ? "wheel" : "scroll",
        this.onScroll,
      )
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.onResize)
    }

    // $on(this.dots, "click", (event) => {
    //   event.preventDefault()
    //   console.log(this)
    //   const arrival = this.getAttribute("href")
    //   anchorScroll(arrival)
    // })

    $on(this.dots, "click", function(event) {
      event.preventDefault()
      console.log(this)
      const arrival = this.getAttribute("href")
      anchorScroll(arrival)

    })
    $on(window, "scroll", this.onScroll)
    $on(window, "resize", this.onResize)
  }

  render() {
    const {isSticky} = this.props
    return (
      <div className="all-projects" ref={this.allProjects}>
        <section className="work bkg-fade" data-bkg="#161517">
          <div className={`work__sticky-wrapper ${isSticky && '-is-sticky'}`}>
            <div className="work__sticky-projects">
              <div className="work__projects">
                <div className="work__wiper"></div>


                <div className="work__project work__project--hidden">
                  <h2 className="work__name">
                    老娘舅春节集福活动 H5 App
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">策略</li>
                    <li className="work__service">UX</li>
                    {/*<li className="work__service">UI</li>*/}
                    <li className="work__service">运维</li>
                    <li className="work__service">开发</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/yamaha-watercraft-apps"
                     className="work__study-button project-link icon-button -on-black"
                     style={styleBgs[0]}>
                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>


                <div className="work__project work__project--hidden">
                  <h2 className="work__name">
                    采撷内容工厂云服务
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">策略</li>
                    <li className="work__service">UX</li>
                    <li className="work__service">UI</li>
                    <li className="work__service">开发</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/kelloggs"
                     className="work__study-button project-link icon-button -on-black"
                     style={styleBgs[1]}>

                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>


                <div className="work__project work__project--hidden" style={projectStyle}>
                  <h2 className="work__name">
                    互联网教育系统
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">产品策略</li>
                    <li className="work__service">UX</li>
                    <li className="work__service">UI</li>
                    <li className="work__service">开发</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/metso-metrics-service"
                     className="work__study-button project-link icon-button -on-black"
                     style={styleBgs[2]}>
                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>


                <div className="work__project work__project--hidden">
                  <h2 className="work__name">
                    育儿柚道 小程序
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">UI</li>
                    <li className="work__service">UX</li>
                    <li className="work__service">开发</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/kcrw-app"
                     className="work__study-button project-link icon-button -on-black"
                     style={styleBgs[3]}>

                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>


                <div className="work__project work__project--hidden">
                  <h2 className="work__name">
                    柚子拼音 H5 APP
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">UX</li>
                    <li className="work__service">UI</li>
                    <li className="work__service">Web 开发</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/stitch-and-tie"
                     className="work__study-button project-link icon-button -on-black"
                     style={styleBgs[4]}>

                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>


                <div className="work__project work__project--hidden">
                  <h2 className="work__name">
                    College Confidential Search
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">Web Development</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/college-search"
                     className="work__study-button project-link icon-button -on-black"
                     style={styleBgs[5]}>

                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>


                <div className="work__project work__project--hidden">
                  <h2 className="work__name">
                    迪士尼英语
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">UX</li>
                    <li className="work__service">UI</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/superoperator-app"
                     className="work__study-button project-link icon-button -on-black">
                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>


                <div className="work__project work__project--hidden">
                  <h2 className="work__name">
                    Framery Configurator &amp; App
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">UX</li>
                    <li className="work__service">UI</li>
                    <li className="work__service">Web Development</li>
                    <li className="work__service">Software Development</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/framery-configurator-app"
                     className="work__study-button project-link icon-button -on-black"
                     style={styleBgs[6]}>

                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>


                <div className="work__project work__project--hidden">
                  <h2 className="work__name">
                    Yepzon App
                  </h2>
                  <ul className="work__services">
                    <li className="work__service">UX</li>
                    <li className="work__service">UI</li>
                    <li className="work__service">Software Development</li>
                  </ul>


                  <a href="https://www.vincit.com/case-study/yepzon-app"
                     className="work__study-button project-link icon-button -on-black">
                    <svg className="icon-button__passive" width="61" height="40" viewBox="0 0 61 40"
                         xmlns="http://www.w3.org/2000/svg">
                      <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                        <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                      </g>
                    </svg>
                    <div className="icon-button__wipe-wrapper">
                      <svg className="icon-button__wipe" width="61" height="40" viewBox="0 0 61 40"
                           xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                          <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"></path>
                        </g>
                      </svg>
                    </div>
                    <span className="icon-button__label">Case Study</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="work__sticky-progress">
              <div className="work__progress">
                <div className="dots">
                  <div className="dots__active-dot"></div>
                  <div className="dots__dash"></div>
                  <a href="#yamaha-watercraft-apps" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">老娘舅春节集福</span>
                  </a>
                  <a href="#kelloggs-experience-guidelines" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">采撷内容工厂云服务</span>
                  </a>
                  <a href="#metso-metrics-service" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">育儿柚道小程序</span>
                  </a>
                  <a href="#kcrw-app" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">柚子拼音 H5</span>
                  </a>
                  <a href="#stitch-tie-e-commerce" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">迪士尼英语 APP</span>
                  </a>
                  <a href="#college-confidential-search" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">College Confidential Search</span>
                  </a>
                  <a href="#superoperator-app" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">Superoperator App</span>
                  </a>
                  <a href="#framery-configurator-app" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">Framery Configurator &amp; App</span>
                  </a>
                  <a href="#yepzon-app" className="dots__dot-container no-barba">
                    <div className="dots__dot"></div>
                    <span className="dots__label">Yepzon App</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="work__images">
            <div className="work__background-transition"></div>
            <div id="yamaha-watercraft-apps" className="work__image-container">
              <a className="project-link work__image"
                 href="https://www.vincit.com/case-study/yamaha-watercraft-apps" title="Yamaha Watercraft Apps"
                 data-bkgcolor="#ff0000"
                 style={styleBgs[0]}></a>
            </div>
            <div id="kelloggs-experience-guidelines" className="work__image-container">
              <a className="project-link work__image "
                 href="https://www.vincit.com/case-study/kelloggs" title="Kellogg's Experience Guidelines"
                 data-bkgcolor="#df0033"
                 style={styleBgs[1]}></a>
            </div>
            <div id="metso-metrics-service" className="work__image-container">
              <a className="project-link work__image responsive-1285896683 -visible"
                 href="https://www.vincit.com/case-study/metso-metrics-service" title="Metso Metrics Service"
                 data-bkgcolor="#37c976"
                 style={styleBgs[2]}></a>
            </div>
            <div id="kcrw-app" className="work__image-container">
              <a className="project-link work__image responsive-1801326770"
                 href="https://www.vincit.com/case-study/kcrw-app" title="KCRW App" data-bkgcolor="#5ac2d0"
                 style={styleBgs[3]}></a>
            </div>
            <div id="stitch-tie-e-commerce" className="work__image-container">
              <a className="project-link work__image responsive-907877781"
                 href="https://www.vincit.com/case-study/stitch-and-tie" title="Stitch &amp; Tie e-Commerce"
                 data-bkgcolor="#dec069"
                 style={styleBgs[4]}></a>
            </div>
            <div id="college-confidential-search" className="work__image-container">
              <a className="project-link work__image responsive-567268347"
                 href="https://www.vincit.com/case-study/college-search" title="College Confidential Search"
                 data-bkgcolor="#4aa7c7"
                 style={styleBgs[5]}></a>
            </div>
            <div id="superoperator-app" className="work__image-container">
              <a className="project-link work__image responsive-358521722"
                 href="https://www.vincit.com/case-study/superoperator-app" title="Superoperator App"
                 data-bkgcolor="#cc2b33"
                 style={styleBgs[6]}></a>
            </div>
            <div id="framery-configurator-app" className="work__image-container">
              <a className="project-link work__image responsive-1746617026"
                 href="https://www.vincit.com/case-study/framery-configurator-app"
                 title="Framery Configurator &amp; App" data-bkgcolor="#000000"
                 style={styleBgs[7]}></a>
            </div>
            <div id="yepzon-app" className="work__image-container">
              <a className="project-link work__image responsive-1616794566"
                 href="https://www.vincit.com/case-study/yepzon-app" title="Yepzon App" data-bkgcolor="#f3342f"
                 style={styleBgs[8]}></a>
            </div>
          </div>
        </section>
      </div>
    )
  }

  onScroll = event => {
    this.animation = requestAnimationFrame(this.toggleActive)
    // this.props.updateScrollValue(scrollValue)
  }

  onResize() {
    debounce((canCreateDiscussions) => {
      this.calculateValues()
      this.toggleActive()
    }, 200)
  }

  destroy() {
    // $off(window, "scroll", this.onScroll)
    // $off(window, "resize", this.onResize)
  }

  calculateValues() {
    // let self = this.data
    const options = this.imageContainers[0].getBoundingClientRect()
    // console.log("options..." + options.top)
    this.scrolled = window.pageYOffset
    this.windowHalfHeight = window.innerHeight / 2
    this.viewportCenter = this.scrolled + this.windowHalfHeight
    this.firstTop = options.top + this.scrolled
    this.containerHeight = options.height
    this.dotHeight = parseFloat(window.getComputedStyle(this.dots[0]).height)
    this.firstDotTop = this.dots[0].offsetTop


  }

  toggleActive = () => {
    // let self = this.data
    this.scrolled = window.pageYOffset
    this.viewportCenter = this.scrolled + this.windowHalfHeight
    // console.log(this.projects)
    this.images.forEach((canCreateDiscussions, i) => {
      if (this.state.prevDotIndex !== i &&
        this.viewportCenter > this.firstTop + i * this.containerHeight
        && this.viewportCenter < this.firstTop + (i + 1) * this.containerHeight) {
        this.images.forEach((canCreateDiscussions, i) => {
          this.projects[i].classList.add("work__project--hidden")
          this.images[i].classList.remove("-visible")
        })
        this.projects[i].classList.remove("work__project--hidden")
        this.animateProjects(this.projects[i])
        this.animateDots(i)
        this.images[i].classList.add("-visible")
        // this.state.prevDotIndex = i
        this.setState({
          prevDotIndex: i,
        })
      }
    })
  }

  animateProjects(actsh) {
    const id = this.projects[this.state.prevDotIndex]
    if (this.state.currentAnimation) {
      const seekBackToTime = this.state.currentAnimation.totalDuration()
      this.state.currentAnimation.seek(seekBackToTime, false)
    }
    const timeline = new TimelineMax({
      force3D: true,
      onComplete: () => {
        this.state.currentAnimation = null
      },
    })

    timeline.to(this.wiper, .01, {
      transformOrigin: "100% 100%",
    }, 0).to(actsh, .01, {
      autoAlpha: 0,
    }, 0)
    if (id) {
      timeline.to(id, .2, {
        y: -22,
        autoAlpha: 0,
        scale: .98,
        ease: Power4.easeOut,
      }, 0)

      timeline.to(this.wiper, .2, {
        scaleY: 1,
        ease: Power4.easeOut,
      }, 0).to(this.wiper, .01, {
        transformOrigin: "0 0",
        ease: Power4.easeOut,
      }, "+=0").to(this.wiper, .3, {
        scaleY: 0,
        ease: Power4.easeOut,
      }, "+=0").fromTo(actsh, .8, {
        autoAlpha: 0,
        y: 22,
        scale: 1.01,
        ease: Power4.easeOut,
      }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: Power4.easeOut,
      }, "-=.3")
      this.state.currentAnimation = timeline
    }
  }

  animateDots(index) {
    // const options = this.state
    const timeline = new TimelineMax({
      force3D: true,
    })
    console.log("animate dots")
    const y = this.firstDotTop + this.dotHeight * (index + .5)
    const subHeight = this.state.prevDotPosition > y ? 15 : -15
    console.log(subHeight)
    // timeline.to
    timeline.to(this.dash, .1, {
      y: y,
      ease: Power4.easeOut,
    }, 0).to(this.dash, .05, {
      scaleY: 2,
      ease: Power4.easeOut,
    }, 0).to(this.dash, .05, {
      scaleY: .5,
      ease: Power4.easeOut,
    }, .03).to(this.activeDot, .1, {
      scale: 0,
      ease: Power4.easeOut,
    }, 0).to(this.activeDot, 0, {
      y: y + subHeight,
    }, .03).to(this.activeDot, .2, {
      y: y,
      ease: this.bigWiggleEase,
    }, .05).to(this.activeDot, .2, {
      scaleY: 1,
      ease: this.bigWiggleEase,
    }, .05).to(this.activeDot, .1, {
      scaleX: 1,
      ease: Power4.easeOut,
    }, .05)
    this.setState({
      prevDotPosition: y,
    })
    // this.state.prevDotPosition = y
  }

  setup() {
    this.projectScrollAnimations = new ProjectScroll()
    this.projectScrollAnimations.init()
    this.stickyProjects = new Sticky({
      el: ".work__sticky-wrapper",
      parent: ".work",
    })
  }

  teardown() {
    this.stickyProjects.destroy()
    this.projectScrollAnimations.destroy()
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

const ProjectScroll = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedProjectScroll)

export default ProjectScroll
