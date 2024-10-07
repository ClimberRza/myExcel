import { $ } from '../dom'
import { ActiveRoute } from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in class Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.activePage = null
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.activePage) {
      this.activePage.destroy()
    }

    this.$placeholder.clear()

    const field = ActiveRoute.getRoute()
    const NewPage = this.routes[field]
    this.activePage = new NewPage(ActiveRoute.param)
    this.$placeholder.append(this.activePage.getRoot())

    this.activePage.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
