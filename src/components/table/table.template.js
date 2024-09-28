import { defaultStyles } from '../../constants'
import { camelToDash } from '../../core/utils'
import { parse } from '../../core/parse'

/* eslint-disable no-invalid-this */
const CODES = {
  A: 65,
  Z: 90
}

export const DEFAULT_WIDTH = 120
export const DEFAULT_HEIGHT = 24

let colSizes = {}
let rowSizes = {}
let cellsState = {}
let stylesState = {}

export function createTable(rowsCount = 40, state = {}) {
  colSizes = state.colState || {}
  rowSizes = state.rowState || {}
  cellsState = state.cellsState || {}
  stylesState = state.stylesState || {}

  this.rowsCount = rowsCount
  const colsCount = CODES.Z - CODES.A + 1
  this.colsCount = colsCount
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

function createCell(col, row) {
  const id = `${row}:${col}`
  const widthStyle = getWidthStyle(col)
  const stylesFromState = getStylesFromState(id, stylesState)
  let resultStyles = stylesFromState

  if (widthStyle) {
    resultStyles += ' ' + widthStyle
  }

  const value = cellsState[id] || ''
  return `<div 
    class="cell"
    contenteditable 
    data-col="${col}"
    data-id="${row}:${col}"
    data-value="${value}"
    data-type="cell"
    style="${resultStyles}"
  >
  ${parse(value)}
  </div>`
}

function toColumn(content, index) {
  const widthStyle = getWidthStyle(index)
  let styleAttribute = ''
  if (widthStyle) {
    styleAttribute = `style="${widthStyle}"`
  }
  return `<div 
    class="column" 
    data-type="resizable" 
    data-col="${index}"
    ${styleAttribute} 
    >
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

  const styleAttribute = getHeightStyleAttribute(rowNumber)

  return `
    <div 
      class='row'
      ${dataRow} 
      ${isResizable}
      ${styleAttribute}
    >
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

function getStylesFromState(cellId, state) {
  const cellState = state[cellId]
  if (!cellState) {
    return Object.keys(defaultStyles).map(key =>
      `${camelToDash(key)}: ${defaultStyles[key]};`
    ).join(' ')
  }
  // {textDecoration: 'underline'} замена
  const newProperties = {...defaultStyles, ...cellState}
  return Object.keys(newProperties).map(key =>
    `${camelToDash(key)}: ${newProperties[key]};`
  ).join(' ')
}

function getWidthStyle(colId) {
  const widthValue = colSizes[colId]
  if (widthValue) {
    return `width: ${widthValue}px;`
  }
  return ''
}

function getHeightStyleAttribute(dataId) {
  const heigthValue = rowSizes[dataId]
  let styleAttribute = ''
  if (heigthValue) {
    styleAttribute = `style="height: ${heigthValue}px;"`
  }
  return styleAttribute
}
