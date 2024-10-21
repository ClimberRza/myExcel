import { $ } from '../core/dom'
import { Page } from '../core/page/Page'
import { getAllTableRecords } from '../shared/dashboard.functions'

export class DashboardPage extends Page {
  constructor(params) {
    super(params)
  }

  async getRoot() {
    const identifier = Date.now()

    const tableRecords = await getAllTableRecords('date')

    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel. Панель управления.</h1>
      </div>
      <div class="db__new">
        <div class="db__view">
          <a 
          href="#excel/${identifier}"
          class="db__create"
          >
            Новая <br/> Таблица 
          </a>
        </div>
      </div>
      <div class="db__table db__view">
       ${tableRecords}
      </div>`)
  }
}
