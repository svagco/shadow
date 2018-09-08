import { equal, throws } from 'zoroaster/assert'
import SnapshotContext from 'snapshot-context'
import Context from '../context'
import shadow from '../../src'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [Context, SnapshotContext],
  'is a function'() {
    equal(typeof shadow, 'function')
  },
  async 'throws an error when no options are given'() {
    await throws({
      fn: shadow,
      message: 'Options must be given.',
    })
  },
  async 'throws an error when no width is given'() {
    await throws({
      fn: shadow,
      args: [{}],
      message: 'The width must be given.',
    })
  },
  async 'throws an error when no height is given'() {
    await throws({
      fn: shadow,
      args: [{ width: 500 }],
      message: 'The height must be given.',
    })
  },
  async 'creates a shadow with a title'(
    { SNAPSHOT_DIR }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    const t = shadow({ width: 400, height: 400 })
    await test('shadow.svg', t)
  },
}

export default T