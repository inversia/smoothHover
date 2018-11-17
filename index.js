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
    const mouseX = e.clientX
    const containerSize = container.offsetWidth
    const itemSize = containerSize / numItem
//     const center = Math.floor(itemSize/2)

    for (const item of items){
      
      const rect = item.getBoundingClientRect ()
      const center = Vec2 (rect.left, rect.top).add(Vec2 (rect.width, rect.height).scale (0.5))

//       const itemCenter       = item.offsetLeft + (itemSize / 2.4)
//       const distanceToCenter = Math.abs (mouseX - itemCenter)
      
      const distanceToCenter = mouse.distance (center)
      

//       item.innerText = distanceToCenter.toFixed(2)

      const opacity = rescale (distanceToCenter, [0, itemSize], [1, 0], 1.3)

      item.style.backgroundColor = `rgba(255,155,155,${opacity})`

    }
  })

})