import {
  TABLE_RESIZE,
  TABLE_RESIZE_REMOVE,
  TABLE_CELL_DATA,
  CHANGE_CURRENT_CELL,
  CHANGE_FORMULA_TEXT,
  APPLY_STYLE,
  CHANGE_EXCEL_TITLE
} from './types'

// Action creators
export function resizeAction(data) {
  return {
    type: TABLE_RESIZE,
    payload: data
  }
}

export function resizeRemoveAction(data) {
  return {
    type: TABLE_RESIZE_REMOVE,
    payload: data
  }
}

export function cellDataAction(data) {
  return {
    type: TABLE_CELL_DATA,
    payload: data
  }
}

export function changeCurrentAction(data) {
  return {
    type: CHANGE_CURRENT_CELL,
    payload: data
  }
}

export function changeFormulaAction(data) {
  return {
    type: CHANGE_FORMULA_TEXT,
    payload: data
  }
}

export function applyStyleAction(data) {
  return {
    type: APPLY_STYLE,
    payload: data
  }
}

export function changeExcelTitle(data) {
  return {
    type: CHANGE_EXCEL_TITLE,
    payload: data
  }
}
