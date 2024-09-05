import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners=[]) {
    if (!$root) {
      throw new Error('No element provided for DomListener!')
    }
    this.listeners = listeners
    this.$root = $root
  }

  initDOMListeners() {
    console.log('initDomListeners')
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} component`
        )
      }
      this[method] = this[method].bind(this)
      // То же самое, что addEventListener:
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners(removingArr) {
    const removeListener = (listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    }

    if (!removingArr.length) {
      this.listeners.forEach(removeListener)
    } else {
      // eslint-disable-next-line max-len
      console.log(this.listeners.filter(listener => removingArr.includes(listener)))
      // eslint-disable-next-line max-len
      this.listeners = this.listeners.filter(listener => !removingArr.includes(listener))
      console.log(this.listeners)
    }
  }
}

function getMethodName(eventType) {
  return 'on' + capitalize(eventType)
}
