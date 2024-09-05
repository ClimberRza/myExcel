import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.listeners.push('mousemove', 'mouseup')
      this.init()
    }
  }

  onMousemove(event) {
  }

  onMouseup(event) {
    this.destroy(['mousemove', 'mouseup'])
  }
}
