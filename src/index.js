import { getFilterDimensions } from './lib'

/**
 * Generate a blur filter for a window.
 * @param {BlurOptions} options Options to generate macOS like blur.
 * @param {number} [options.offsetY=25] The offset from the top of the window. Default `25`.
 * @param {number} options.width The width of the window.
 * @param {number} options.height The height of the window.
 * @param {number} [options.stdDeviation=27.5] The standard deviation for the blur. It will spread twice this distance in each direction. Default `27.5`.
 */
const shadow = (options) => {
  const {
    width,
    height,
    offsetY = 25,
    stdDeviation = 27.5,
  } = options
  const dims = getFilterDimensions(width, height, stdDeviation * 2, offsetY)
  return `<defs>
  <filter ${dims} id="shadow">
    <feOffset dx="0" dy="${offsetY}" in="SourceAlpha" result="so"/>
    <feGaussianBlur stdDeviation="${stdDeviation}" in="so" result="sb"/>
    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"   type="matrix" in="sb" result="sm"/>
    <feMerge>
      <feMergeNode in="sm"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>`
}

/* documentary types/index.xml */
/**
 * @typedef {Object} BlurOptions Options to generate macOS like blur.
 * @prop {number} [offsetY=25] The offset from the top of the window. Default `25`.
 * @prop {number} width The width of the window.
 * @prop {number} height The height of the window.
 * @prop {number} [stdDeviation=27.5] The standard deviation for the blur. It will spread twice this distance in each direction. Default `27.5`.
 */

export default shadow