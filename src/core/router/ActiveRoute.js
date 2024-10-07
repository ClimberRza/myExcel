export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }

  static get param() {
    return this.path.split('/')[1]
  }

  static getRoute() {
    if (this.path.includes('excel')) {
      return 'excel'
    }
    return 'dashboard'
  }

  static navigate(path = '') {
    window.location.hash = path
  }
}
