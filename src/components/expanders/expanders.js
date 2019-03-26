import React, { Component } from "react"
import classes from "./expanders.module.scss"

export default class Expanders extends Component {

  render() {
    return (
      <div className={classes.expandersContainer}>
        {this.props.children}
      </div>
    )
  }
}
