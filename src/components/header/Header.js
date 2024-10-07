import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '../../core/dom'
import * as actions from '../../redux/actions'
import { createHeader } from './header.template'
import { debounce } from '../../core/utils'
import { ActiveRoute } from '../../core/router/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 430)
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeExcelTitle({
      value: $target.text()
    }))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button_delete') {
      const areYouSure = confirm('Вы действительно хотите удалить эту таблицу?')
      if (areYouSure) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.type === 'button_exit') {
      ActiveRoute.navigate('')
    }
  }
}

