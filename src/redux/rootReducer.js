import { defaultStyles } from '../constants'
import { isEqual } from '../core/utils'
import {
  TABLE_RESIZE,
  TABLE_RESIZE_REMOVE,
  TABLE_CELL_DATA,
  CHANGE_CURRENT_CELL,
  CHANGE_FORMULA_TEXT,
  APPLY_STYLE,
  CHANGE_EXCEL_TITLE,
  SET_TABLE_DATE
} from './types'

export function rootReducer(state, action) {
  if (action.type === '__INIT__') {
    return state
  }
  const payload = action.payload
  const resizeField = (payload.type === 'col' ? 'colState' : 'rowState') || ''
  const id = payload.id
  const value = payload.value

  function saveCellValue(state, id, value) {
    if (!value) {
      delete state.cellsState[id]
    } else {
      state.cellsState[id] = value
    }
  }

  switch (action.type) {
    case TABLE_RESIZE:
      state[resizeField][id] = value
      return {...state}
    case TABLE_RESIZE_REMOVE:
      delete state[resizeField][id]
      return {...state}
    case TABLE_CELL_DATA:
      state.formulaText = value
      saveCellValue(state, id, value)
      return {...state}
    case CHANGE_CURRENT_CELL:
      state.currentCell = id
      state.formulaText = value
      state.currentStyles = payload.styles
      return {...state}
    case CHANGE_FORMULA_TEXT:
      state.formulaText = value
      state.cellsState[id] = value
      return {...state}
    case APPLY_STYLE:
      const [styleName, styleValue] = Object.entries(payload.value)[0]
      const ids = payload.ids
      if (isEqual(payload.value[styleName], defaultStyles[styleName])) {
        ids.forEach(id => {
          delete state.stylesState[id][styleName]
          if (!Object.keys(state.stylesState[id]).length) {
            delete state.stylesState[id]
          }
        })
      } else {
        ids.forEach(id => {
          state.stylesState[id] = {
            ...state.stylesState[id],
            [styleName]: styleValue
          }
        })
      }
      state.currentStyles[styleName] = styleValue
      return {...state}
    case CHANGE_EXCEL_TITLE:
      state.excelTitle = value
      return {...state}
    case SET_TABLE_DATE:
      state.openDate = payload
      return {...state}
    default:
      return state
  }
}
