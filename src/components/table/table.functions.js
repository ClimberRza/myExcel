export function isResizer(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function getNextSelector(key, {rowsCount, colsCount}, {row, col}) {
  const MIN_COLS = 0
  const MIN_ROWS = 1
  const MAX_COLS = colsCount - 1
  const MAX_ROWS = rowsCount - 1
  switch (key) {
    case 'ArrowDown':
    case 'Enter':
      row = row + 1 > MAX_ROWS ? MAX_ROWS : row + 1
      break
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_COLS ? MAX_COLS : col + 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_ROWS ? MIN_ROWS : row - 1
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_COLS ? MIN_COLS : col - 1
      break
  }

  return `[data-id='${row}:${col}']`
}

export function deleteCellContnent(table, actions) {
  table.selection.current.text('')
  table.$dispatch(actions.cellDataAction({
    id: table.selection.current.id(),
    value: ''
  }))
}
