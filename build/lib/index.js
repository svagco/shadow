const ceil = n => {
  const r = Math.ceil(n)
  return r
}

/**
 * Get appropriate dimensions for the blur drawing area. By default, they are set to x=-10% y=-10% width=120% height=120% but in some cases the blur will be more than that, therefore need to set manually.
 * @param {number} w Width of the image to have blur.
 * @param {number} h Height of the image to have blur.
 * @param {number} b2 Double blur standard deviation (how much the blur is spreading out from the image).
 * @param {number} blurOffsetY How much blur is offset from top.
 * @see https://stackoverflow.com/questions/6555600/gaussian-blur-cutoff-at-edges
 */
       const getFilterDimensions = (w, h, b2, blurOffsetY) => {
  const wf = b2 / w // Percent of blur to width
  const hf = b2 / h // Percent of blur to height
  const oyf = blurOffsetY / h // Percent of margin-top to height

  const fx = getPercent(wf)
  const fy = getPercent(Math.min(oyf, hf))

  const fw = 100 + (fx * 2)
  const fh = 100 + (getPercent(hf + oyf)) + fy

  const attrs = [
    `x="-${fx}%"`,
    `y="-${fy}%"`,
    `width="${fw}%"`,
    `height="${fh}%"`,
  ]
  const s = attrs.join(' ')
  return s
}

const getPercent = (x) => {
  return ceil(x * 100)
}


module.exports.getFilterDimensions = getFilterDimensions
//# sourceMappingURL=index.js.map