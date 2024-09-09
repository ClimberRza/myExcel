import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No element provided for DomListener!')
    }
    this.listeners = listeners
    this.$root = $root
  }

  initDOMListeners() {
    const initListener = (listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} component`
        )
      }
      this[method] = this[method].bind(this)
      // То же самое, что addEventListener:
      this.$root.on(listener, this[method])
    }

    this.listeners.forEach(initListener)
  }

  removeDOMListeners() {
    const removeListener = (listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    }

    this.listeners.forEach(removeListener)
  }
}

function getMethodName(eventType) {
  return 'on' + capitalize(eventType)
}
