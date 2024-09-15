export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1).fill('').map((_, index) => index + start)
}

export function getNextSelector(key, {rowsCount, colsCount}, {row, col}) {
  const MIN_VALUE = 0
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
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
  }

  return `[data-id='${row}:${col}']`
}
