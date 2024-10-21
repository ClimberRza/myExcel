import { getInitialState } from '../redux/getInitialState'
import { storage, storageName } from '../core/utils'

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getInitialState(this.name))
      }, 2000)
    })
  }
}
