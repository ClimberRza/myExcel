/**
 * @jest-environment jsdom
 */
import { Router } from './Router'
import { Page } from '../Page'

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboardPage'
    return root
  }
}

class ExcelPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'excelPage'
    return root
  }
}

describe('Router:', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('router should render DashboardPage', () => {
    expect($root.innerHTML).toBe('<div>dashboardPage</div>')
  })
})
