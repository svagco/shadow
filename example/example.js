import { writeFileSync } from 'fs'
/* start example */
import { svg, rect } from '@svag/lib'
import Shadow from '../src'

// 0. DEFINE width and height of the window and its shadow.
const width = 250
const height = 250

// 1. CREATE a shadow element.
const { translate, shadow } = Shadow({
  width,
  height,
})

// 2. CREATE a window element to place above the shadow.
const window = rect({
  transform: translate,
  width,
  height,
  rx: 6,
  ry: 6,
  stroke: 'grey',
  fill: '#FFFFFF',
})

// 3. CREATE an svg image.
const image = svg({
  content: [shadow, window],
  height: 375,
  width: 375,
  stretch: false,
})
/* end example */
console.log(image)

writeFileSync('images/shadow.svg', image)