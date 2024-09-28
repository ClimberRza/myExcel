import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template'
import { getToDefaultSize, resizeHandler } from './table.resize'
import { deleteCellContnent, isCell, isResizer } from './table.functions'
import { TableSelection } from './TableSelection'
import { parse } from '../../core/parse';
import * as actions from '../../redux/actions'
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
    return createTable.call(this, 45, this.store.getState())
  }

  init() {
    super.init()
    const initialCellId = this.store.getState().currentCell
    this.selection.selectOne(this.$root
        .find(`[data-id="${initialCellId}"]`), this)

    this.$on('formula:input', text => {
      const test = parse(text)
      this.selection.current
          .attr('data-value', text)
          .text(test)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyleAction({
        ids: this.selection.groupIds,
        value
      }))
    })
  }

  async tableResize(event) {
    const whatIsResizing = event.target.dataset.resize
    try {
      if (event.shiftKey) {
        const data = getToDefaultSize(event, this.$root, whatIsResizing)
        data['type'] = whatIsResizing
        this.$dispatch(actions.resizeRemoveAction(data))
      } else {
        const data = await resizeHandler(event, this.$root, whatIsResizing)
        this.$dispatch(actions.resizeAction(data))
      }
    } catch (err) {
      console.warn(err.message)
    }
  }

  onMousedown(event) {
    if (isResizer(event)) {
      this.tableResize(event)
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

    if (event.key === 'Delete') {
      deleteCellContnent(this, actions)
    }
  }

  onInput(event) {
    const text = $(event.target).text()
    this.selection.current.attr('data-value', text)
    this.$dispatch(actions.cellDataAction({
      id: this.selection.current.id(),
      value: text
    }))
  }
}
