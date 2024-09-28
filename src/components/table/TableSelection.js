import { range } from '../../core/utils'
import { getNextSelector } from './table.functions'
import { defaultStyles } from '../../constants'
import * as actions from '../../redux/actions'
import { parse } from '../../core/parse'

export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  get groupIds() {
    return this.group.map($el => $el.id())
  }

  selectOne($elem, table) {
    this.current?.text(parse(this.current.data.value))

    this.clear()
    this.group.push($elem)
    this.current = $elem
    $elem.focus().addClass(TableSelection.className)
    const styles = $elem.getStyles(Object.keys(defaultStyles))
    table.$dispatch(actions.changeCurrentAction({
      id: this.current.id(),
      value: this.current.text(),
      styles
    }))
  }

  selectAnother($elem) {
    this.group.push($elem)
    $elem.focus().addClass(TableSelection.className)
  }

  selectGroup($target, $root) {
    this.clear()
    const $current = this.current
    const curretId = $current.id(true)
    const targetId = $target.id(true)
    const rows = range(curretId.row, targetId.row)
    const cols = range(curretId.col, targetId.col)
    const ids = rows.reduce((acc, row) => {
      cols.forEach((col) => acc.push(`${row}:${col}`))
      return acc
    }, [])
    ids.forEach(id => {
      const cell = $root.find(`[data-id='${id}']`)
      cell.addClass(TableSelection.className)
      this.group.push(cell)
    })
  }

  selectByKey(event, table) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const $current = this.current
      const curretId = $current.id(true)
      const $nextCell = table.$root.find(getNextSelector(
          key,
          table,
          curretId
      ))
      this.selectOne($nextCell, table)
    }
  }

  applyStyle(style) {
    this.group.forEach($el => {
      $el.css(style)
    })
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }
}
