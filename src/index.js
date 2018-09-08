import { debuglog } from 'util'

const LOG = debuglog('@svag/shadow')

/**
 * A shadow from a window.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */
export default async function shadow(config = {}) {
  const {
    type,
  } = config
  LOG('@svag/shadow called with %s', type)
  return type
}

/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */