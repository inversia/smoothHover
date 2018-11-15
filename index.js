const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const container = $('.container')
const numItem = container.children.length


function rescale (x, from, to) {
  const t = (x - from[0]) / (from[1] - from[0])
  return to[0] + ((to[1] - to[0]) * t)
} 

container.addEventListener ('mousemove', e => {
  const items = $$('.container .item')
  const mouseX = e.clientX
  const containerSize = container.offsetWidth
  const itemSize = containerSize / numItem
  const center = Math.floor(itemSize/2)
  const itemCurrentPos = mouseX % itemSize
  const normItemCurrentPos = rescale(itemCurrentPos, [0, itemSize], [0,1])
  const currentItem = 0; //высчитай
  
  console.log(normItemCurrentPos)
  
  console.log('items = ' + items)
  
  
  for (const i of items){
    i.style.opacity = normItemCurrentPos * 3  
    i.style.backgroundColor = 'red'
  }

  //   items.style.animation = 'sizeChange 0.4s ease-in-out'
  
})

