import { defaultStyles, defaultTitle } from '../constants'
import { storage } from '../core/utils'

const storageState = storage('excel-state') || {}

if (!storageState.colState) {
  storageState.colState = {}
}
if (!storageState.rowState) {
  storageState.rowState = {}
}
if (!storageState.cellsState) {
  storageState.cellsState = {}
}
if (!storageState.currentCell) {
  storageState.currentCell = '1:0'
}
if (!storageState.formulaText) {
  storageState.formulaText = ''
}
if (!storageState.currentStyles) {
  storageState.currentStyles = defaultStyles
}
if (!storageState.stylesState) {
  storageState.stylesState = {}
}
if (!storageState.excelTitle) {
  storageState.excelTitle = defaultTitle
}

export const initialState = {...storageState}
