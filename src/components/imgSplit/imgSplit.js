import React, { Component } from "react"
import cls from "./imgSplit.module.scss"
// import InternalLink from "../../helper/links/InternalLink"
import IconButton from "../iconButton/iconButton"

export default class ImgSplit extends Component {

  render() {
    return (
      <div className={`${cls.imgSplit} ${cls.isVisible}`}>
        <div
          className={`${cls.imgSplit__photo}`}
          style={{ backgroundImage: `url('${this.props.img}')` }}/>
        <div className={cls.imgSplit__container}>
          <div className={cls.imgSplit__text}>
            <h2 className={cls.imgSplit__heading}>
              {this.props.heading}
            </h2>
            <p className={cls.imgSplit__body}>
               <span>
                 {this.props.body}
               </span>
            </p>
            {this.props.children}
            <p></p>
            <IconButton
              to={this.props.ctaTo}
              text={this.props.ctaText}/>
          </div>
        </div>
      </div>
    )
  }
}
