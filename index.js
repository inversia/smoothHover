function Vec2 (x, y) {
  
  const self = {
    
    x, y,
    
    add: b => Vec2 (x + b.x, y + b.y),
    
    sub: b => self.add (b.negative ()),
    
    distance: b => self.sub (b).length (),
    
    scale: s => Vec2 (x * s, y * s),
    
    negative: () => Vec2 (-x, -y),
    
    length: () => Math.sqrt (x * x + y * y),
    
    normalize: () => self.scale (1.0 / self.length ()),
    
    rescale: l => self.normalize ().scale (l),
    
    toString: () => `Vec2(${x}, ${y})`
  }

  return self
}


const $  = document.querySelector.bind(document)

const $$ = document.querySelectorAll.bind(document)

document.addEventListener ('DOMContentLoaded', () => {  

  const container = $('.container')
  
  const numItem = container.children.length

  function rescale (x, from, to, exponent=1) {

    const t = (x - from[0]) / (from[1] - from[0])
    return to[0] + ((to[1] - to[0]) * (t ** exponent))
  } 

  document.addEventListener ('mousemove', e => {
    
    const mouse = Vec2 (e.clientX, e.clientY) // двумерный вектор, являющийся текущим положение мыши
    
    const items = $$('.container .item')

    for (const item of items){
      
      const rect    = item.getBoundingClientRect ()
      const leftTop = Vec2 (rect.left, rect.top)
      const size    = Vec2 (rect.width, rect.height)
      const center  = leftTop.add (size.scale (0.5))

      const distanceToCenter = mouse.distance (center)
      const opacity = rescale (distanceToCenter, [0, rect.width], [1, 0], 1.3)
      
      item.style.backgroundColor = `rgba(255,155,155,${opacity})`

      const gradCenter = mouse.sub (leftTop)
      const color = `rgb(255,155,155) 0, rgba(255,155,155,0.5) ${rect.width}px, transparent ${rect.width * 5}px`
      
      item.style.backgroundImage = `radial-gradient(circle at ${gradCenter.x.toFixed (2)}px ${gradCenter.y.toFixed (2)}px, ${color})`

    }
  })
})