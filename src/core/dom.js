class Dom {
  constructor(selector) {
    this.$el = typeof(selector) === 'string'
    ? document.querySelector(selector)
    : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
    // return this
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return Array.from(this.$el.querySelectorAll(selector)).map(node => $(node))
  }

  css(styles = {}) {
    const props = Object.keys(styles)
    for (const prop of props) {
      this.$el.style[prop] = styles[prop]
    }
    return this
  }

  getCompStyle(prop) {
    const styles = window.getComputedStyle(this.$el)
    return styles.getPropertyValue(prop)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  remove() {
    this.$el.remove()
  }
}
// $('div').html('<h1>Test</h1>').clear()
export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes='') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
