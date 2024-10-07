export class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('"getRoot method should be implemented"')
  }

  afterRender() {

  }

  destroy() {

  }
}
