
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 0.005
const friction = 0.99

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.opacity = 1
  }

  draw() {
    c.save()
    c.globalAlpha = this.opacity
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y

    //gravity
    this.velocity.y *= friction
    this.velocity.x *= friction

    this.velocity.y += gravity

    this.opacity -= .002
  }
}

// Implementation
let particles
function init() {
  particles = []


}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height)


  particles.forEach((particle, i) => {

    if (particle.opacity > 0) {

      particle.update()
    } else {
      particles.splice(i, 1)
    }


  })
}

init()
animate()

addEventListener('click', (event) => {

  mouse.x = event.clientX
  mouse.y = event.clientY


  const particleCount = 1000

  const angleIncrement = Math.PI * 2 / particleCount

  const power = 10

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(
      mouse.x,
      mouse.y,
      3,
      `hsl(${Math.random() * 360}, 90%, 50% )`,
      {
        x: Math.cos(angleIncrement * i) * Math.random() * power,
        y: Math.sin(angleIncrement * i) * Math.random() * power
      }))
  }
})