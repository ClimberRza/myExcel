import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '../../core/dom'
import * as actions from '../../redux/actions'
import { createHeader } from './header.template'
import { debounce } from '../../core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 430)
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  onInput(e) {
    const $target = $(e.target)
    this.$dispatch(actions.changeExcelTitle({
      value: $target.text()
    }))
  }
}
