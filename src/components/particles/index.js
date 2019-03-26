import state from './state'
import Particle from './particle'

let maxParticles = 0

const update = () => {
  maxParticles = window.innerWidth <= 768 ? 20 : 50

  if (state.particles.length < maxParticles) {
    for (let i = state.particles.length; i < maxParticles; i++) {
      state.particles.push(new Particle)
    }
  }

  state.particles = state.particles.filter(particle => particle.update())
  state.context.clearRect(0, 0, state.canvas.width, state.canvas.height)
  state.particles.forEach(particle => particle.draw())

  requestAnimationFrame(update)
}

const updateCanvasSize = () => {
  let width = state.canvas.parentNode.offsetWidth
  let height = state.canvas.parentNode.offsetHeight

  state.canvas.width = width * 2
  state.canvas.height = height * 2
  state.canvas.style.width = width + 'px'
  state.canvas.style.height = height + 'px'
}

export default {
  views: ['home'],
  init() {
    state.canvas = document.querySelector('#canvas-particles')
    state.context = state.canvas.getContext('2d')
    updateCanvasSize()
    update()

    let resizing

    window.addEventListener('resize', () => {
      if (resizing) return

      resizing = setTimeout(() => {
        resizing = null
        updateCanvasSize()
      })
    }, true)
  }
}
