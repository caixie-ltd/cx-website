import React from 'react'
const THREE = require('three')
const { MeshLine, MeshLineMaterial } = require('three.meshline')
const SimplexNoise = require('simplex-noise')
const Stats = require('stats.js')

export default class HeroScene extends React.Component {
  canvas = null
  // we will cancel the requestAnimationFrame call using the frameId
  frameId = null

  componentDidMount() {
    this.initThree()
  }

  componentWillUnmount() {
    if (this.removeListeners) this.removeListeners()
  }

  initThree = () => {
    // begin mess and chaos
    let windowHalfX = window.innerWidth / 2
    let windowHalfY = window.innerHeight / 2
    let vmin = Math.min(windowHalfX, windowHalfY)
    let partCount = THREE.Math.clamp(windowHalfX * 1.5, 50, 600)
    let yScroll = window.scrollY
    let mouseX = 0
    let mouseY = 0
    let particles = []
    let range = 8 // random position range
    let xRange = 25
    let simplex = new SimplexNoise('saxonisacheeno')

    var stats = new Stats()
    stats.showPanel(2) // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild(stats.dom)

    const colorParticle = 'rgb(227, 130, 115)'
    const colorParticleCaptured = 'rgb(145, 220, 255)'
    const colorLine1 = 'rgb(145, 220, 255)'
    const colorLine2 = 'rgb(145, 220, 255)'

    // scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      20
    )
    camera.position.z = 10
    camera.position.x = 0
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: false,
      canvas: this.canvas
    })
    renderer.autoClearColor = true

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const fadeMaterial = new THREE.MeshBasicMaterial({
      color: '#041932',
      transparent: true,
      opacity: 0.9,
      blending: THREE.SubtractiveBlending
    })
    const fadePlane = new THREE.PlaneBufferGeometry(100, 100)
    const fadeMesh = new THREE.Mesh(fadePlane, fadeMaterial)

    // Put plane in front of camera
    fadeMesh.position.z = camera.position.z - 15
    // Make plane render before particles
    fadeMesh.renderOrder = -1
    scene.add(fadeMesh)

    renderer.setClearColor('#041932', 0)
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.addEventListener('mousemove', onMouseMove, false)
    window.addEventListener('resize', onWindowResize)

    this.removeListeners = () => {
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onWindowResize)
      cancelAnimationFrame(this.frameId)
    }

    // logo
    const logoGroup = new THREE.Object3D()
    let text = new THREE.MeshStandardMaterial({
      transparent: true,
      color: 0xffffff,
      opacity: 0
    })
    let logoPanel = new THREE.Mesh(new THREE.PlaneGeometry(15, 15), text)
    logoPanel.position.set(range / 2, -range / 3, -1)

    // const logoPanel2 = logoPanel.clone()
    // logoPanel2.translateZ(-1.2)
    // logoPanel2.material.opacity = 0.01
    // logoGroup.add(logoPanel2)

    const loader = new THREE.TextureLoader()

    loader.load('/logo.svg', texture => {
      logoPanel.material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.02
      })
      // logoPanel2.material = new THREE.MeshBasicMaterial({
      //   map: texture,
      //   transparent: true,
      //   opacity: 0.5
      // })
    })

    logoGroup.add(logoPanel)
    scene.add(logoGroup)

    // seekVector
    const seekVectorX = -windowHalfX / 200
    const seekVector = scene.position
      .clone()
      .add(new THREE.Vector3(seekVectorX, 0, 0))

    const Wind = () => new THREE.Vector3(-0.0001, 0, 0)

    const Vehicle = function(x, y, z, range) {
      this.origColor = colorParticle
      this.capturedColor = colorParticleCaptured
      this.geometry = new THREE.CircleGeometry(0.02, 60)
      this.material = new THREE.MeshBasicMaterial({
        color: this.origColor,
        // blending: THREE.AdditiveBlending,
        transparent: true
      })

      this.object3D = new THREE.Object3D()
      this.object3D.add(new THREE.Mesh(this.geometry, this.material))

      this.line = new THREE.Line(
        new THREE.Geometry(),
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true
        })
      )

      this.line.geometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0.1)
      )

      scene.add(this.line)

      this.pos = new THREE.Vector3(x, y, z)
      this.prevPos = new THREE.Vector3(x, y, z)
      this.vel = new THREE.Vector3(-1, THREE.Math.randFloat(-0.01, 0.01), 0)
      this.acc = new THREE.Vector3(0, 0, 0)
      this.xoff = THREE.Math.randInt(0, 100)
      this.speedReduction = 0.075
      this.desiredSeparation = 0.3
      this.disableSeekPerc = Math.random() < 0.2
      this.disableSeek = true
      this.maxSpeed = THREE.Math.randFloat(
        this.speedReduction * 0.7,
        this.speedReduction * 0.7
      )
      this.maxSpeedOrig = this.maxSpeed
      this.hasLine = Math.random() < 0.5
      // maximum magnitude

      // turning circle
      this.maxForce = THREE.Math.randFloat(0.1, 0.1)

      this.applyForce = force => this.acc.add(force)

      this.applyBehaviours = vehicles => {
        const separateForce = this.separate(vehicles)
        const seekForce = this.seek(seekVector)
        const windForce = Wind()

        seekForce.multiplyScalar(0.06 * this.pos.distanceTo(seekForce))
        separateForce.multiplyScalar(0.01)
        windForce.multiplyScalar(100)

        if (!this.disableSeek) this.applyForce(seekForce)
        this.applyForce(separateForce)
        this.applyForce(windForce)
      }

      this.seek = target => {
        const desired = new THREE.Vector3(0, 0, 0)
        desired.subVectors(target, this.pos)
        desired.setLength(this.maxSpeed)
        // Steering = desired - velocity
        const steer = new THREE.Vector3(0, 0, 0)
        steer.subVectors(desired, this.vel)
        steer.clampScalar(-this.maxForce, this.maxForce)
        return steer
      }

      this.separate = vehicles => {
        const { desiredSeparation } = this
        let sum = new THREE.Vector3(0, 0, 0)
        let count = 0
        for (let i = 0; i < vehicles.length; i++) {
          const d = this.pos.distanceTo(vehicles[i].pos)
          if (d > 0 && d < desiredSeparation) {
            // calc opposing vector
            let diff = new THREE.Vector3(0, 0, 0)
            diff.subVectors(this.pos, vehicles[i].pos)
            diff.normalize()
            diff.divideScalar(d) // weight by distance
            sum.add(diff)
            count++
          }
        }
        // Average the forces
        if (count > 0) {
          sum.divideScalar(count)
          sum.normalize()
          // sum.multiplyScalar(this.maxSpeed)

          // Steering = desired - velocity
          const steer = new THREE.Vector3()
          steer.subVectors(sum, this.vel)
          steer.clampScalar(-this.maxForce, this.maxForce)
          return steer
        } else {
          return new THREE.Vector3(0, 0, 0)
        }
      }

      this.updateDataLine = () => {
        let closestVert = new THREE.Vector3(999, 999, 999)

        // verts.forEach(vert => {
        //   closestVert = new THREE.Vector3(vert)
        // })

        if (this.captured && this.hasLine) {
          this.line.geometry.vertices[0] = seekVector
          this.line.geometry.vertices[1] = this.pos
          this.line.geometry.verticesNeedUpdate = true
          this.lineTimer += 1
          this.line.material.opacity = 0.2 - this.lineTimer / 200
          if (this.lineTimer >= 200) {
            this.line.geometry.vertices[0] = new THREE.Vector3(0, 0, 0)
            this.line.geometry.vertices[1] = new THREE.Vector3(0, 0, 0)
          }
        }
      }

      this.lineTimer = 0

      this.update = function(r, index) {
        this.prevPos.copy(this.pos)
        this.vel.add(this.acc)
        this.vel.clampScalar(-this.maxSpeed, this.maxSpeed) // limit vel to maxSpeed
        this.pos.add(this.vel)
        this.acc.set(0, 0, 0)
        this.xoff += 0.3

        this.material.opacity = this.captured ? 1 : 0.8

        this.material.color = new THREE.Color(
          this.captured ? this.capturedColor : this.origColor
        )

        this.updateDataLine()

        // bounds
        if (this.pos.x < -xRange) {
          // reset
          this.captured = false
          this.disableSeek = true
          this.pos.setX(THREE.Math.randFloat(0, xRange))
          this.pos.setY(THREE.Math.randFloat(-range, range))
          this.maxSpeed = this.maxSpeedOrig
          this.vel.setY(THREE.Math.randFloat(-0.01, 0.01))
          this.prevPos.copy(this.pos)
          this.lineTimer = 0
        }
        if (this.pos.y < -range) {
          this.pos.setY(-range)
          this.prevPos.setY(-range)
          this.vel.setY(-this.vel.y)
        }
        if (this.pos.y > range) {
          this.pos.setY(range)
          this.prevPos.setY(range)
          this.vel.setY(-this.vel.y)
        }
        if (this.pos.z < -range) {
          this.pos.setZ(-range)
          this.prevPos.setZ(-range)
          this.vel.setZ(-this.vel.z)
        }
        if (this.pos.z > range) {
          this.pos.setZ(range)
          this.prevPos.setZ(range)
          this.vel.setZ(-this.vel.z)
        }

        if (this.pos.distanceTo(seekVector) < 3) {
          this.captured = true
          this.disableSeek = false
          // this.vel.multiplyScalar(0.8)
          // this.maxSpeed = 0.04
        }

        if (this.pos.x < seekVector.x) {
          this.disableSeek = true
          this.vel.multiplyScalar(0.95)
          this.maxSpeed = 0.04
        }

        this.object3D.position.copy(this.pos)
      }
    }

    // particles
    const addVehicle = () => {
      if (particles.length > partCount) return false
      const vehicle = new Vehicle(
        THREE.Math.randFloat(-xRange, xRange),
        THREE.Math.randFloat(-range, range),
        THREE.Math.randFloat(-range, range / 2),
        range
      )
      scene.add(vehicle.object3D)
      particles.push(vehicle)
    }

    // add initial particles
    for (var i = 0; i < 200; i++) {
      addVehicle()
    }

    function onMouseMove(e) {
      mouseX = e.clientX - windowHalfX
      mouseY = e.clientY - windowHalfY
    }

    // grid
    let gridDots = []
    const gridGeometry = new THREE.CircleGeometry(0.015, 60)
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 'rgb(255,255,255)',
      transparent: true,
      opacity: 0.2
    })

    const gridGap = 0.5
    const gridRange = range * 4
    const grid = new THREE.Object3D()
    for (let i = -gridRange; i < gridRange; i += gridGap) {
      for (let j = -gridRange; j < gridRange; j += gridGap) {
        const gridDot = new THREE.Mesh(gridGeometry, gridMaterial)
        gridDot.position.setX(i)
        gridDot.position.setY(j)
        gridDot.position.setZ(0)
        grid.add(gridDot)
      }
    }

    scene.add(grid)
    // const grid2 = grid.clone()
    // grid2.translateZ(-0.2)
    // scene.add(grid2)

    const lineLength = 400

    function generateTexture() {
      const size = 50

      // create canvas
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      // get context
      const context = canvas.getContext('2d')

      // draw gradient
      context.rect(0, 0, size, size)
      const gradient = context.createLinearGradient(0, 0, size, size)
      // gradient.addColorStop(0.1, 'transparent')
      gradient.addColorStop(0, colorLine1) // light blue
      gradient.addColorStop(1, colorLine2)
      // gradient.addColorStop(0.9, 'transparent')
      context.fillStyle = gradient
      context.rotate((0 * Math.PI) / 180)
      context.fill()

      return canvas
    }

    function makeLine(geo, group) {
      const g = new MeshLine()
      g.setGeometry(geo, p => 0.03)

      const material = new MeshLineMaterial({
        map: new THREE.CanvasTexture(generateTexture()),
        useMap: true,
        // repeat: new THREE.Vector2(1, 1),
        // color: lineCol,
        // opacity: 0.7,
        transparent: true,
        // resolution: [1, 1],
        sizeAttenuation: 1,
        lineWidth: 2,
        near: camera.near,
        far: camera.far
        // blending: THREE.AdditiveBlending
        // side: THREE.DoubleSide
      })

      const mesh = new THREE.Mesh(g.geometry, material)
      mesh.frustumCulled = false
      mesh.renderOrder = -2
      group.add(mesh)
      return g
    }

    const createLineGeo = () => {
      const line = new THREE.Geometry()
      for (let i = 0; i < lineLength; i++) {
        // must initialize it to the number of positions it will keep or it will throw an error
        line.vertices.push(new THREE.Vector3(-10000, 0, 0))
      }
      return line
    }

    const updateLine = ({ seekVector, delta, elapsedTime }) => {
      const lineProgress = -lineSpeed * delta * 5
      lineGroup.position.add(new THREE.Vector3(lineProgress, 0, 0))

      const newVerticeVector = seekVector.clone()
      newVerticeVector.sub(lineGroup.position)

      lineRendered.advance(newVerticeVector)
    }

    const lineGroup = new THREE.Object3D()
    const lineRendered = makeLine(createLineGeo(), lineGroup)
    const lineSpeed = 0.4
    const lineIntensity = 4
    scene.add(lineGroup)
    const dataLineGroup = new THREE.Object3D()
    lineGroup.add(dataLineGroup)

    const updateSeekVector = ({ elapsedTime }) => {
      const perlin = simplex.noise2D(elapsedTime / 2, 1) * 6
      seekVector.setY(perlin)

      // move seekVector in at start
      const timeIn = 5
      if (elapsedTime < timeIn) {
        const distMult = 2
        let x = -timeIn * distMult + elapsedTime * distMult + seekVectorX
        seekVector.setX(x)
        dataLineGroup.position.setX(x)
      }
    }

    const clock = new THREE.Clock(true)
    let tick = 0
    let tickFreq = 0.001 // 0.05s

    // Render
    let cameraLookVector = new THREE.Vector3()

    const dataLines = []

    function addDataLine() {
      const thisGroup = new THREE.Object3D()
      this.material = new THREE.LineBasicMaterial({
        color: colorLine1,
        transparent: true
      })

      this.material.linewidth = 0.5

      this.topVector = seekVector
        .clone()
        .setX(-lineGroup.position.x)
        .add(new THREE.Vector3(0, Math.random() * 2.5 + 1, 0))

      this.bottomVectorDesired = seekVector.clone().setX(-lineGroup.position.x)

      this.bottomVector = this.topVector.clone()

      this.geometry = new THREE.Geometry()
      this.geometry.vertices.push(this.bottomVector, this.topVector)

      this.line = new THREE.Line(this.geometry, this.material)
      // this.cgeometry = new THREE.CircleGeometry(2, 12)
      // this.cmaterial = new THREE.MeshBasicMaterial({
      //   color: colorLine1,
      //   transparent: true,
      //   map: new THREE.CanvasTexture(generateTexture())
      // })
      // const circle = new THREE.Mesh(cgeometry, cmaterial)

      const scale = 0.02
      this.circle = logoPanel.clone()
      this.circle.position
        .copy(this.topVector)
        .add(new THREE.Vector3(0, scale * 7, 0))
      this.circle.scale.set(scale, scale, 1)
      this.circle.material = this.circle.material.clone()
      this.circle.renderOrder = -2
      this.line.renderOrder = -2

      thisGroup.add(this.line)
      thisGroup.add(this.circle)

      thisGroup.setOpacity = float => {
        thisGroup.opacity = float
        this.circle.material.opacity = float
        this.material.opacity = float
      }

      thisGroup.setOpacity(1)

      thisGroup.update = r => {
        this.bottomVector.lerp(this.bottomVectorDesired, 0.01)
        this.geometry.verticesNeedUpdate = true
      }

      dataLineGroup.add(thisGroup)
      // thisGroup.timestamp = clock.getElapsedTime()
      dataLines.push(thisGroup)
      setTimeout(addDataLine, Math.random() * 2000 + 1000)
    }

    // setTimeout(addDataLine, 5000)

    const sceneRender = () => {
      stats.begin()
      const delta = clock.getDelta()
      const r = clock.getElapsedTime()

      // camera
      const cameraPan = Math.sin(r * 0.4) * 0.1 - 0.025
      camera.position.x += (-(mouseX * 0.002) - camera.position.x) * 0.1
      camera.position.y += (mouseY * 0.0005 - camera.position.y) * 0.1
      camera.position.z += Math.sin(r * 1) / 300
      cameraLookVector.copy(scene.position)

      camera.lookAt(cameraLookVector)
      camera.position.z = 11 - window.innerWidth / window.innerHeight / 2

      // particles
      if (delta < 0.0333) {
        // add particles if at least 30fps
        for (let i = 0; i < 1; i++) {
          addVehicle()
        }
      }

      particles.map((particle, index) => {
        particle.applyBehaviours(particles)
        particle.update(r, index)
      })

      // Update LinePos
      // updateSeekVector({ elapsedTime: r })
      // updateLine({ seekVector, delta, elapsedTime: r })

      dataLines.forEach((dataLine, index) => {
        dataLine.update(r)
        // remove if too many
        if (dataLines.length > 3) {
          dataLines.splice(index, 1)
          dataLine.parent.remove(dataLine)
        }
      })

      renderer.render(scene, camera)
      stats.end()

      this.frameId = requestAnimationFrame(sceneRender)
    }

    sceneRender()
  }

  render() {
    return (
      <canvas
        ref={el => {
          this.canvas = el
        }}
        style={{ position: 'absolute' }}
      />
    )
  }
}

