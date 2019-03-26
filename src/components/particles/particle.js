import state from './state'
import {getRandomFromArray, getRandomIntFromMinMax, hexToRGBA} from '../../util'

/**
 * Returns a random type between line and dot favoring dot
 * @returns {*}
 */
const getRandomParticleType = () => getRandomFromArray(
  Array(getRandomIntFromMinMax(1, 10)).fill('dot').concat(
    Array(getRandomIntFromMinMax(1, 5)).fill('line')
  )
)

/**
 * gets a random color, to favor a particular color, add more of the same colors
 * to the state array
 * @returns {*}
 */
const getRandomParticleColor = () => getRandomFromArray(state.colors)

/**
 * Returns a random diameter for a circle
 * @return {number}
 */
const getCircleDiameter = () => {
  let diameter = 0
  while (diameter < 2) {
    diameter = (Math.random() * 7) * 2
  }
  return diameter
}

class Particle {
  constructor() {
    this.type = getRandomParticleType()
    this.inBounds = true

    this.coords = {
      x: Math.round(Math.random() * state.canvas.width),
      y: Math.round(Math.random() * state.canvas.height)
    }

    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7,
      y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7
    }

    this.alpha = 0.1
    this.hex = getRandomParticleColor()
    this.color = hexToRGBA(this.hex, this.alpha)
    this.strokeWidth = 3

    switch (this.type) {
      case 'dot':
        this.diameter = this.type === 'dot' ? getCircleDiameter() : null
        break;
      case 'line':
        this.angle = Math.atan2(this.coords.y, this.coords.x)
        this.length = getRandomIntFromMinMax(10, 20)
        this.rotateSpeed = getRandomIntFromMinMax(10, 120)
        this.rotateClockwise = Math.random() < 0.5
        break;
    }
  }

  isInBounds() {
    let xx = (state.canvas.width / 2) + 5
    let yy = (state.canvas.height / 2) + 5
    let x = this.coords.x / 2
    let y = this.coords.y / 2

    this.inBounds = !((x > xx || x < 0 - 5) || (y > yy || y < 0 - 5))

    return this.inBounds
  }

  update() {
    if (this.alpha < 1) {
      this.alpha += 0.01
      this.color = hexToRGBA(this.hex, this.alpha)
    }

    this.coords.x += this.velocity.x
    this.coords.y += this.velocity.y

    if (this.type === 'line') {
      let angle = Math.PI / this.rotateSpeed
      this.angle += this.rotateClockwise ? angle : -Math.abs(angle)
    }

    return this.isInBounds()
  }

  draw() {
    state.context.lineWidth = this.strokeWidth
    state.context.strokeStyle = this.color
    state.context.save()

    switch (this.type) {
      case 'line':
        state.context.translate(this.coords.x / 2, this.coords.y / 2)
        state.context.rotate(this.angle)
        state.context.beginPath()
        state.context.moveTo(-this.length / 2, 0)
        state.context.lineTo(this.length / 2, 0)
        break;
      case 'dot':
        state.context.beginPath()
        state.context.arc(this.coords.x, this.coords.y, this.diameter, 0, Math.PI * 2, false)
        break;
    }

    state.context.stroke()
    state.context.restore()
  }
}

export default Particle
