export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Уведомляем наблюдателей, если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener =>
      listener(...args)
    )
    return true
  }

  // Подписываемся на уведомления, добавляем наблюдателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== fn)
    }
  }
}
