const CODES = {
  A: 65,
  Z: 90
}

export function createTable(rowsCount=40) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el) => toColumn(el))
      .join('')

  rows.push(createRow('', cols))

  for (let i=1; i<=rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')

    rows.push(createRow(i, cells))
  }

  return rows.join('')
}

function createCell() {
  return `<div class="cell" contenteditable></div>`
}

function toColumn(content) {
  return `
  <div class="column">
  ${content}
  <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(rowNumber, content) {
  const resize = rowNumber
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''

  return `
    <div class='row'>
      <div class='row-info'>
      ${rowNumber || ''}
      ${resize}
      </div>
      <div class='row-data'>${content}</div>
    </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


