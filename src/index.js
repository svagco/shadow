import { makeElement, rect } from '@svag/lib'
import { getFilterDimensions } from './lib'

/**
 * Generate a blur filter for a window.
 * @param {ShadowOptions} options Options to generate macOS like  shadow using a blur filter.
 * @param {number} options.width The width of the window.
 * @param {number} options.height The height of the window.
 * @param {number} [options.offsetY=25] The offset from the top of the window. Default `25`.
 * @param {number} [options.stdDeviation=27.5] The standard deviation for the blur. It will spread twice this distance in each direction. Default `27.5`.
 */
const Shadow = (options) => {
  if (!options) throw new Error('Options must be given.')
  const {
    width,
    height,
    offsetY = 25,
    stdDeviation = 27.5,
  } = options
  if (!width) throw new Error('The width must be given.')
  if (!height) throw new Error('The height must be given.')
  const dims = getFilterDimensions(width, height, stdDeviation * 2, offsetY)
  const filter = makeElement('filter', {
    attributes: {
      ...dims,
      id: 'shadow',
    },
    content: [
      `<feOffset dx="0" dy="${offsetY}" in="SourceAlpha" result="so"/>`,
      `<feGaussianBlur stdDeviation="${stdDeviation}" in="so" result="sb"/>`,
      '<feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="sb" result="sm"/>',
      makeElement('feMerge', {
        content: [
          '<feMergeNode in="sm"/>',
          '<feMergeNode in="SourceGraphic"/>',
        ],
      }),
    ],
  })
  const defs = makeElement('defs', {
    content: filter,
  })
  const body = rect({
    height: 82,
    width: 60,
    rx: 6,
    ry: 6,
    fill: 'white',
  })
  const translate = `translate(${stdDeviation * 2}, ${offsetY})`
  const shadow = makeElement('g', {
    attributes: {
      transform: translate,
      filter: 'url(#shadow)',
      fill: 'none',
    },
    content: [
      defs,
      body,
    ],
  })
  return { translate, shadow }
}

/* documentary types/index.xml */
/**
 * @typedef {Object} ShadowOptions Options to generate macOS like  shadow using a blur filter.
 * @prop {number} width The width of the window.
 * @prop {number} height The height of the window.
 * @prop {number} [offsetY=25] The offset from the top of the window. Default `25`.
 * @prop {number} [stdDeviation=27.5] The standard deviation for the blur. It will spread twice this distance in each direction. Default `27.5`.
 */

export default Shadow