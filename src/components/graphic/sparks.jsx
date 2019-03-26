import React, { Component } from "react"
import { TweenMax } from "gsap"
import { easeFunction } from "../../helper/variables.jsx"
import _ from "lodash"

class Sparks extends Component {
  PIXI = null
  PixiPlugin = null

  state = {
    app: null,
    circle: null,
    x: 0,
    y: 0,
    sparks: [],
    types: {
      spark1: [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 0 },
        { x: 3, y: 4 },
        { x: 2, y: 0 },
        { x: 5, y: 1 },
        { x: 6, y: 2 },
        { x: 4, y: 2, color: 0xff4c2b },
        { x: 5, y: 3 },
      ],
      spark2: [
        { x: 5, y: 1 },
        { x: 6, y: 2 },
        { x: 4, y: 2, color: 0xff4c2b },
        { x: 5, y: 3 },
        // { x: 1, y: 0 },
        // { x: 1, y: 1 },
        // { x: 2, y: 1 },
        // { x: 1, y: 2 },
        // { x: 3, y: 2 },
        // { x: 0, y: 3 },
        // { x: 2, y: 3, color: 0xff4c2b },
        // { x: 3, y: 3 },
        // { x: 3, y: 4 },
        // { x: 4, y: 4 },
      ],
      spark3: [

        { x: 11, y: 1, color: 0x111111 },
        { x: 12, y: 1, color: 0x111111 },
        { x: 13, y: 1, color: 0x111111 },
        { x: 14, y: 1, color: 0x111111 },
        { x: 15, y: 1, color: 0x111111 },
        { x: 16, y: 1, color: 0x111111 },
        { x: 17, y: 1, color: 0x111111 },
        { x: 18, y: 1, color: 0x111111 },

        { x: 4, y: 2, color: 0x111111 },
        { x: 8, y: 2, color: 0x111111 },
        { x: 9, y: 2, color: 0x111111 },
        { x: 10, y: 2, color: 0x111111 },
        { x: 11, y: 2, color: 0x111111 },
        { x: 12, y: 2, color: 0x111111 },
        { x: 13, y: 2, color: 0x111111 },
        { x: 14, y: 2, color: 0x111111 },
        { x: 15, y: 2, color: 0x111111 },
        { x: 16, y: 2, color: 0x111111 },
        { x: 17, y: 2, color: 0x111111 },
        { x: 18, y: 2, color: 0x111111 },

        { x: 5, y: 3, color: 0x111111 },
        { x: 6, y: 3, color: 0x111111 },
        { x: 7, y: 3, color: 0x111111 },
        { x: 8, y: 3, color: 0x111111 },
        { x: 9, y: 3, color: 0x111111 },
        { x: 10, y: 3, color: 0x111111 },
        { x: 11, y: 3, color: 0x111111 },
        { x: 12, y: 3, color: 0x111111 },
        { x: 13, y: 3, color: 0x111111 },
        { x: 14, y: 3, color: 0x111111 },
        { x: 15, y: 3, color: 0x111111 },
        { x: 16, y: 3, color: 0x111111 },
        { x: 17, y: 3, color: 0x111111 },
        { x: 18, y: 3, color: 0x111111 },

        { x: 1, y: 4, color: 0x111111 },
        { x: 2, y: 4, color: 0x111111 },
        { x: 4, y: 4, color: 0x111111 },
        { x: 5, y: 4, color: 0x111111 },
        { x: 6, y: 4, color: 0x111111 },
        { x: 7, y: 4, color: 0x111111 },
        { x: 8, y: 4, color: 0x111111 },
        { x: 9, y: 4, color: 0x111111 },
        { x: 10, y: 4, color: 0x111111 },
        { x: 11, y: 4, color: 0x111111 },
        { x: 12, y: 4, color: 0x111111 },
        { x: 13, y: 4, color: 0x111111 },
        { x: 15, y: 4, color: 0x111111 },
        { x: 16, y: 4, color: 0x111111 },
        { x: 17, y: 4, color: 0x111111 },
        { x: 18, y: 4, color: 0x111111 },

        { x: 1, y: 5, color: 0x111111 },
        { x: 2, y: 5, color: 0x111111 },
        { x: 3, y: 5, color: 0x111111 },
        { x: 5, y: 5, color: 0x111111 },
        { x: 6, y: 5, color: 0x111111 },
        { x: 7, y: 5, color: 0x111111 },
        { x: 8, y: 5, color: 0x111111 },
        { x: 9, y: 5, color: 0x111111 },
        { x: 10, y: 5, color: 0x111111 },
        { x: 11, y: 5, color: 0x111111 },
        { x: 12, y: 5, color: 0x111111 },
        { x: 13, y: 5, color: 0x111111 },
        { x: 14, y: 5, color: 0x111111 },
        { x: 15, y: 5, color: 0x111111 },
        { x: 16, y: 5, color: 0x111111 },
        { x: 17, y: 5, color: 0x111111 },
        { x: 18, y: 5, color: 0x111111 },

        { x: 2, y: 6, color: 0x111111 },
        { x: 3, y: 6, color: 0x111111 },
        { x: 4, y: 6, color: 0x111111 },
        { x: 5, y: 6, color: 0x111111 },
        { x: 6, y: 6, color: 0x111111 },
        { x: 7, y: 6, color: 0x111111 },
        { x: 8, y: 6, color: 0x111111 },
        { x: 9, y: 6, color: 0x111111 },
        { x: 11, y: 6, color: 0x111111 },
        { x: 12, y: 6, color: 0x111111 },
        { x: 13, y: 6, color: 0x111111 },
        { x: 14, y: 6, color: 0x111111 },
        { x: 15, y: 6, color: 0x111111 },
        { x: 16, y: 6, color: 0x111111 },
        { x: 17, y: 6, color: 0x111111 },
        { x: 18, y: 6, color: 0x111111 },

        { x: 3, y: 7, color: 0x111111 },
        { x: 5, y: 7, color: 0x111111 },
        { x: 6, y: 7, color: 0x111111 },
        { x: 8, y: 7, color: 0x111111 },
        { x: 9, y: 7, color: 0x111111 },
        { x: 10, y: 7, color: 0x111111 },
        { x: 11, y: 7, color: 0x111111 },
        { x: 12, y: 7, color: 0x111111 },
        { x: 13, y: 7, color: 0x111111 },
        { x: 14, y: 7, color: 0x111111 },
        { x: 15, y: 7, color: 0x111111 },
        { x: 16, y: 7, color: 0x111111 },
        { x: 17, y: 7, color: 0x111111 },
        { x: 18, y: 7, color: 0x111111 },

        { x: 5, y: 8, color: 0x111111 },
        { x: 6, y: 8, color: 0x111111 },
        { x: 7, y: 8, color: 0x111111 },
        { x: 8, y: 8, color: 0x111111 },
        { x: 9, y: 8, color: 0x111111 },
        { x: 10, y: 8, color: 0x111111 },
        { x: 11, y: 8, color: 0x111111 },
        { x: 12, y: 8, color: 0x111111 },
        { x: 14, y: 8, color: 0x111111 },
        { x: 15, y: 8, color: 0x111111 },
        { x: 16, y: 8, color: 0x111111 },
        { x: 17, y: 8, color: 0x111111 },
        { x: 18, y: 8, color: 0x111111 },

        { x: 5, y: 9, color: 0x111111 },
        { x: 6, y: 9, color: 0x111111 },
        { x: 7, y: 9, color: 0x111111 },
        { x: 8, y: 9, color: 0x111111 },
        { x: 9, y: 9, color: 0x111111 },
        { x: 11, y: 9, color: 0x111111 },
        { x: 12, y: 9, color: 0x111111 },
        { x: 13, y: 9, color: 0x111111 },
        { x: 15, y: 9, color: 0x111111 },
        { x: 16, y: 9, color: 0x111111 },
        { x: 17, y: 9, color: 0x111111 },
        { x: 18, y: 9, color: 0x111111 },

        { x: 11, y: 10, color: 0x111111 },
        { x: 12, y: 10, color: 0x111111 },
      ],
    },
    lineLength: 2.5,
  }

  constructor(props) {
    super(props)

    this.decoration = React.createRef()

    if (typeof window !== "undefined") {
      this.PIXI = require("pixi.js")
      this.PixiPlugin = require("gsap/PixiPlugin")
    }
  }

  componentDidMount() {
    this.PIXI.utils.skipHello()

    this.setState(
      {
        app: new this.PIXI.Application(200, 200, {
          transparent: true,
          resolution: window.devicePixelRatio,
          autoResize: true,
        }),
        circle: new this.PIXI.Graphics(),
      },
      () => this.startAnimation(),
    )
  }

  startAnimation = () => {
    const { app } = this.state

    let sparks = [...this.state.sparks]

    this.decoration.current.appendChild(app.view)

    _.forEach(this.state.types["spark" + this.props.type], prop => {
      const spark = this.createSpark({ ...prop })
      sparks.push(spark)
      app.stage.addChild(spark)
      this.animateSpark(spark)
    })

    this.setState({
      sparks: sparks,
    })
  }

  createSpark = data => {
    const spark = new this.PIXI.Graphics()
    const color = data.color
      ? data.color
      : this.props.defaultGray
        ? 0xdcdcdc
        : 0xffffff

    spark.lineStyle(1, color)
    spark.moveTo(-this.state.lineLength, 0)
    spark.lineTo(this.state.lineLength, 0)
    spark.moveTo(0, -this.state.lineLength)
    spark.lineTo(0, this.state.lineLength)
    spark.endFill()

    spark.x = data.x * 12 + 4
    spark.y = data.y * 12 + 4

    return spark
  }

  animateSpark = spark => {
    TweenMax.fromTo(
      spark,
      0.95,
      {
        pixi: {
          alpha: 0,
        },
      },
      {
        pixi: {
          alpha: 1,
        },
        delay: (this.props.showHomepageLoading ? 1.7 : 0.5) + Math.random(),
        ease: easeFunction("type_fourth"),
      },
    )
  }

  render() {
    return (
      <div
        style={{
          pointerEvents: "none",
        }}
        ref={this.decoration}
        className={this.props.className}
      />
    )
  }
}

export default Sparks
