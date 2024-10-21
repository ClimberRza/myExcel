import { $ } from '../dom'
import { ActiveRoute } from './ActiveRoute'
import { Loader } from '../../components/loader'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in class Router')
    }

    this.loader = new Loader()
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

  async changePageHandler() {
    if (this.activePage) {
      this.activePage.destroy()
    }

    this.$placeholder.clear().append(this.loader)

    const field = ActiveRoute.getRoute()
    const NewPage = this.routes[field]
    this.activePage = new NewPage(ActiveRoute.param)
    const root = await this.activePage.getRoot()

    this.$placeholder.clear().append(root)

    this.activePage.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
