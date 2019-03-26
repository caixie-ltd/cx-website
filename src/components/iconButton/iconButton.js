import { Component } from "react"
import cls from "./iconButton.module.scss"
import React from "react"
import InternalLink from "../../helper/links/InternalLink"
import { connect } from "react-redux"

class IconButton extends Component {
  render() {
    return (
      <InternalLink
        to={this.props.to}
        className={`
          ${this.props.classes}
          ${cls.iconButton}
          ${this.props.theme === ("black" || "red") && cls.onBlack}
          ${this.props.type === "plus" && cls.isPlus}
        `}>

        {
          this.props.type ? (this.props.type === "plus" ?

            <svg className={cls.iconButton__passive} width="47" height="46" viewBox="0 0 47 46"
                 xmlns="http://www.w3.org/2000/svg">
              <g stroke="#161517" strokeWidth="8" fill="none" fillRule="evenodd" strokeLinecap="square">
                <path d="M23.53 4.409v37.216M4.926 23.013h37.217"/>
              </g>
            </svg> :
            <svg className={cls.iconButton__passive} width="61" height="40" viewBox="0 0 61 40"
                 xmlns="http://www.w3.org/2000/svg">
              <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"/>
              </g>
            </svg>) : ""
        }
        <div className={cls.iconButton__wipeWrapper}>
          {
            this.props.type ? (this.props.type === "plus" ?
              <svg className={cls.iconButton__wipe}
                   width="47" height="46" viewBox="0 0 47 46"
                   xmlns="http://www.w3.org/2000/svg">
                <g stroke="#161517" strokeWidth="8" fill="none" fillRule="evenodd" strokeLinecap="square">
                  <path d="M23.53 4.409v37.216M4.926 23.013h37.217"/>
                </g>
              </svg>
              :
              <svg className={cls.iconButton__wipe}
                   width="61" height="40" viewBox="0 0 61 40"
                   xmlns="http://www.w3.org/2000/svg">
                <g strokeWidth="8" stroke="#161517" fill="none" fillRule="evenodd">
                  <path d="M40.03 36.859L55.342 19.84 40.03 2.828M56.716 19.84h-56"/>
                </g>
              </svg>) : ""
          }

        </div>
        {
          this.props.type ? <React.Fragment>
            <span className={cls.iconButton__label}>{this.props.label}</span>
            <span className={cls.iconButton__mobileLabel}>{this.props.label}</span></React.Fragment> : ""
        }
      </InternalLink>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.backgroundColor,
  }
}

const ConnectedScrollIndicator = connect(
  mapStateToProps,
  null,
)(IconButton)

export default ConnectedScrollIndicator
