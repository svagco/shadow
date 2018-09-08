import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import shadow from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof shadow, 'function')
  },
  async 'calls package without error'() {
    await shadow()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await shadow({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T