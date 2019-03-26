import { Component } from "react"
import React from "react"
import cls from "./nextUp.module.scss"
import InternalLink from "../../../helper/links/InternalLink"
// import Particles from "../../../components/particles"
// import { isBrowser, BrowserView } from "react-device-detect"

const arrowDark = "/assets/arrow-dark.svg"
const arrowWhite = "/assets/arrow-white.svg"
export default class NextUp extends Component {
  componentDidMount() {
    // if (isBrowser) {
    //   Particles.init()
    // }
  }

  render() {
    return (
      <div
        className={cls.nextUp}
        style={{
          backgroundColor: this.props.background && this.props.background,
        }}
      >
        {/*{*/}
          {/*isBrowser ? <canvas id="canvas-particles"/> : ""*/}
        {/*}*/}
        <InternalLink
          to={this.props.to}
          style={{
            color: this.props.isWhite && "#FFF",
          }}>
          <div className={cls.nextUp__bkg}
               style={{ backgroundColor: this.props.background && this.props.background }}/>
          <div className={cls.nextUp__container}>
            <p className={cls.nextUp__heading}>接下来</p>
            <p className={cls.nextUp__whatsNext}>{this.props.text}</p>
            <img className={cls.nextUp__arrow}
                 src={this.props.isWhite ? arrowWhite : arrowDark}
                 alt="Up next."/>
          </div>
        </InternalLink>
      </div>
    )
  }
}

