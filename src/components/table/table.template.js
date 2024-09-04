const CODES = {
  A: 65,
  Z: 90
}
console.log(1)
export function createTable(rowsCount=40) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el) => createCol(el))
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

function createCol(content) {
  return `<div class="column">${content}</div>`
}

function createRow(rowNumber, content) {
  return `
    <div class='row'>
      <div class='row-info'>${rowNumber}</div>
      <div class='row-data'>${content}</div>
    </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


