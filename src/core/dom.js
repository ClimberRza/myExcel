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
    return this
  }

  text(text) {
    if (typeof(text) !== 'undefined') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
    return this
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

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return Array.from(this.$el.querySelectorAll(selector)).map(node => $(node))
  }

  id(parse) {
    if (parse) {
      const id = this.id().split(':')
      return {
        row: +id[0],
        col: +id[1]
      }
    }
    return this.data.id
  }

  css(styles = {}) {
    const props = Object.keys(styles)
    for (const prop of props) {
      this.$el.style[prop] = styles[prop]
    }
    return this
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  attr(attrName, value) {
    if (typeof(value) === 'string') {
      this.$el.setAttribute(attrName, value)
      return this
    }
    return this.$el.getAttribute(attrName)
  }

  focus() {
    this.$el.focus()
    return this
  }

  getCompStyle(prop) {
    const styles = window.getComputedStyle(this.$el)
    return styles.getPropertyValue(prop)
  }

  getStyles(styles = []) {
    return styles.reduce((acc, s) => {
      acc[s] = this.$el.style[s]
      return acc
    }, {})
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

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
