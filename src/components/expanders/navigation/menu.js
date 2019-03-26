import React, { Component } from "react"
import cls from "./menu.module.scss"
import Contact from "./contact"
import { TimelineMax, SteppedEase, Power4 } from "gsap"
import posed from "react-pose"
// import { easeFunction } from "../../../helper/variables"

const Cover = posed.div({
  active: {
    x: 0,
    transition: {
      duration: 0,
    },
  },
  inactive: {
    x: "100vw",
    transition: {
      duration: 0,
      delay: 850,
    },
  },
})
/*
const CoverBackground = posed.div({
  active: {
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 2000,
      ease: easeFunction("type_third"),
    },
  },
  inactive: {
    scaleX: 0,
    scaleY: 0,
    x: ({ clickOutX }) => clickOutX,
    y: ({ clickOutY }) => clickOutY,
    transition: {
      duration: 850,
      ease: easeFunction("type_fourth"),
    },
  },
})
*/

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.isActive = false
    this.menuRef = React.createRef()
    this.menuExpanderRef = React.createRef()
    this.expanderOriginalW = null
  }

  componentDidMount() {
    this.menu = this.menuRef.current
    this.menuTimeline = new TimelineMax({
      paused: true,
    })
    this.menuTimeline.to(this.menu, .6, {
      backgroundPosition: "-1560px 0",
      ease: SteppedEase.config(26),
    })
  }

  menuAnimation = event => {
    if (this.isActive) {
      this.menuTimeline.reverse()
      this.isActive = false
    } else {
      this.menuTimeline.play(0, false)
      this.isActive = true
    }
  }

  beforeExpand = () => {
    // nav zIndex = '9999'
    TimelineMax.staggerFrom(cls.menuLink, 1, {
      y: 55,
      autoAlpha: 0,
      ease: Power4.easeOut,
    }, .05, 0).from(`${cls.menu} ${cls.office}`, .6, {
      y: 55,
      autoAlpha: 0,
      ease: Power4.easeOut,
    }, 0)
  }

  afterCollapse = () => {
    // nav zIndex = ""
  }

  render() {
    // const {theme, active, onMenuClick, data, clickOutX, clickOutY} = this.props
    const {active} = this.props
    return (
      <React.Fragment>
        <Cover pose={active ? "active" : "inactive"}>
          <div className={cls.menuToggle}
               onClick={this.menuAnimation}
               ref={this.menuRef}
          />
          <div className={cls.menuExpander}
               ref={this.menuExpanderRef}/>
          <div className={cls.menu}>
            <div className={cls.menuContent}>
              <div className={cls.menuLinks}>
                <a className={`${cls.menuLink} ${cls.hasProjects}`} href="/projects">
                  Projects
                  <span className={cls.menuProjectCount}>9</span></a>
                <a className={cls.menuLink} href="/about">About</a>
                <a className={cls.menuLink} href="/careers">Careers</a>
                <a className={cls.menuLink} href="/blog">Blog</a>
              </div>
              <div className={cls.menuContactContainer}>
                <div className={cls.offices}>
                  <div className={cls.office}>
                    <p className={cls.city}>Orange County</p>
                    <p className={cls.address}>
                      300 Spectrum Center Drive,
                      Suite 1110,
                      Irvine CA 92618
                    </p>
                  </div>
                  <div className={cls.office}>
                    <p className={cls.city}>Palo Alto</p>
                    <p className={cls.address}>
                      470 Ramona St,
                      Palo Alto CA 94301
                    </p>
                  </div>
                  <div className={cls.office}>
                    <p className={cls.city}>Helsinki</p>
                    <p className={cls.address}>
                      Mikonkatu 15 A, 00100 Helsinki
                    </p>
                    <p className={cls.address}>
                      Kuortaneenkatu, 2 00510 Helsinki
                    </p>
                  </div>
                  <div className={cls.office}>
                    <p className={cls.city}>Tampere</p>
                    <p className={cls.address}>
                      Visiokatu 1, 33720 Tampere
                    </p>
                  </div>
                  <div className={cls.office}>
                    <p className={cls.city}>Turku</p>
                    <p className={cls.address}>
                      Helsinginkatu 15, 20500 Turku
                    </p>
                  </div>
                  <div className={cls.office}>
                    <p className={cls.city}>Switzerland</p>
                    <p className={cls.address}>
                      Chemin du Signal 11, CH-1807 Blonay, Switzerland <br/>
                      +41 79 407 6044
                    </p>
                  </div>
                </div>
                <Contact/>
              </div>
            </div>
          </div>
        </Cover>
      </React.Fragment>

    )
  }
}
