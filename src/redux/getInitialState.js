import { defaultStyles, defaultTitle } from '../constants'
import { storage } from '../core/utils'

export function getInitialState(params) {
  const storageState = storage('excel:' + params) || {}

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
  if (!storageState.openDate) {
    storageState.openDate = null
  }

  return {...storageState}
}

