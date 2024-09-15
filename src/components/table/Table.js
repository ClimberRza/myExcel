import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isCell, shouldResize } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable.call(this)
  }

  init() {
    super.init()
    this.selection.selectOne(this.$root.find('[data-id="0:0"]'), this)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        this.selection.selectAnother($target)
      } else if (event.ctrlKey) {
        // Prevent focus on clicked cell
        event.preventDefault()
        this.selection.selectGroup($target, this.$root)
      } else {
        this.selection.selectOne($target, this)
      }
    }
  }

  onKeydown(event) {
    this.selection.selectByKey(event, this)
  }

  onInput(event) {
    const text = event.target.textContent
    this.$emit('table:current-change', text)
  }
}
