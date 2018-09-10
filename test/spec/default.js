import { equal, throws } from 'zoroaster/assert'
import SnapshotContext from 'snapshot-context'
import Context from '../context'
import Shadow from '../../src'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [Context, SnapshotContext],
  'is a function'() {
    equal(typeof Shadow, 'function')
  },
  async 'throws an error when no options are given'() {
    await throws({
      fn: Shadow,
      message: 'Options must be given.',
    })
  },
  async 'throws an error when no width is given'() {
    await throws({
      fn: Shadow,
      args: [{}],
      message: 'The width must be given.',
    })
  },
  async 'throws an error when no height is given'() {
    await throws({
      fn: Shadow,
      args: [{ width: 500 }],
      message: 'The height must be given.',
    })
  },
  async 'creates a shadow with a title'(
    { SNAPSHOT_DIR }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    const { translate, shadow } = Shadow({ width: 400, height: 400 })
    equal(translate, 'translate(55, 25)')
    await test('shadow.svg', shadow)
  },
}

export default T