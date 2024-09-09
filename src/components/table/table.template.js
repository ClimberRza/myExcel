const CODES = {
  A: 65,
  Z: 90
}

export function createTable(rowsCount = 40) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el, index) => toColumn(el, index))
      .join('')

  rows.push(createRow('', cols))

  for (let i = 0; i < rowsCount; i++) {
    const rowNumber = i + 1
    const cells = new Array(colsCount)
        .fill('')
        .map((_el, index) => createCell(index, rowNumber))
        .join('')

    rows.push(createRow(rowNumber, cells))
  }

  return rows.join('')
}

function createCell(index, number) {
  return `<div class="cell" 
  contenteditable 
  data-col=${index}
  data-row=${number}
  ></div>`
}

function toColumn(content, index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">
  ${content}
  <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(rowNumber, content) {
  const resizeDiv = rowNumber
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''

  const isResizable = rowNumber ? 'data-type="resizable"' : ''

  const dataRow = rowNumber ? `data-row="${rowNumber}"` : ''

  return `
    <div class='row' ${dataRow} ${isResizable}>
      <div class='row-info'>
      ${rowNumber || ''}
      ${resizeDiv}
      </div>
      <div class='row-data'>${content}</div>
    </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


