import { svg, makeElement } from '@svag/lib'
import { writeFileSync } from 'fs'
/* start example */
import Shadow from '../src'

const shadow = Shadow({
  width: 250,
  height: 250,
})

console.log(shadow)
/* end example */

const rect = makeElement({
  name: 'rect',
  attributes: {
    filter: 'url(#shadow)',
    transform: `translate(${27.5 * 2}, ${25})`,
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    rx: 5,
    stroke: 'grey',
    'stroke-width': 2,
    fill: '#FFFFFF',
  },
})
const image = svg({
  content: `${shadow}${rect}`,
  height: 350,
  width: 350,
  stretch: false,
})
writeFileSync('images/shadow.svg', image)