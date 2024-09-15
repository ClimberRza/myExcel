import { range } from './table.functions'
import { getNextSelector } from './table.functions'

export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  selectOne($elem, table) {
    this.clear()
    this.group.push($elem)
    this.current = $elem
    $elem.focus().addClass(TableSelection.className)
    table.$emit('table:current-change', this.current.text())
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

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }
}
