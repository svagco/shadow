const { makeElement, rect } = require('@svag/lib');
const { getFilterDimensions } = require('./lib');

/**
 * Generate a blur filter for a window. Returns a shadow element as a string, as well as the `translate` property to apply to the window element as the `transform` attribute.
 * @param {ShadowOptions} options Options to generate macOS like  shadow using a blur filter.
 * @param {number} options.width The width of the window.
 * @param {number} options.height The height of the window.
 * @param {number} [options.rx=6] The `x` corner radius of a window which drops the shadow. Default `6`.
 * @param {number} [options.ry=6] The `y` corner radius of a window which drops the shadow. Default `6`.
 * @param {number} [options.offsetY=25] The offset from the top of the window. Default `25`.
 * @param {number} [options.stdDeviation=27.5] The standard deviation for the blur. It will spread twice this distance in each direction. Default `27.5`.
 */
const Shadow = (options) => {
  if (!options) throw new Error('Options must be given.')
  const {
    width,
    height,
    rx = 6,
    ry = 6,
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
      makeElement('feOffset', {
        attributes: {
          dy: offsetY,
          in: 'SourceAlpha',
          result: 'o',
        },
      }),
      makeElement('feGaussianBlur', {
        attributes: {
          stdDeviation,
          in: 'o',
          result: 'b',
        },
      }),
      makeElement('feColorMatrix', {
        attributes: {
          values: '0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0',
          in: 'b',
        },
      }),
    ],
  })
  const defs = makeElement('defs', {
    content: filter,
  })
  const body = rect({
    height,
    width,
    rx,
    ry,
    fill: 'white',
  })
  const translateX = stdDeviation * 2
  const translateY = offsetY
  const translate = `translate(${translateX}, ${translateY})`
  const shadow = makeElement('g', {
    attributes: {
      transform: translate,
      filter: 'url(#shadow)',
    },
    content: [
      defs,
      body,
    ],
  })
  return { translate, shadow, translateX, translateY }
}

/* documentary types/index.xml */
/**
 * @typedef {Object} ShadowOptions Options to generate macOS like  shadow using a blur filter.
 * @prop {number} width The width of the window.
 * @prop {number} height The height of the window.
 * @prop {number} [rx=6] The `x` corner radius of a window which drops the shadow. Default `6`.
 * @prop {number} [ry=6] The `y` corner radius of a window which drops the shadow. Default `6`.
 * @prop {number} [offsetY=25] The offset from the top of the window. Default `25`.
 * @prop {number} [stdDeviation=27.5] The standard deviation for the blur. It will spread twice this distance in each direction. Default `27.5`.
 */

module.exports=Shadow
//# sourceMappingURL=index.js.map