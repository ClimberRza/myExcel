import { ExcelComponent } from '@core/ExcelComponent'
import * as actions from '../../redux/actions'
import { $ } from '../../core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['formulaText'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false">
      </div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    const initialText = this.store.getState().formulaText
    this.$formula.text(initialText)
  }

  storeChanged(changes) {
    this.$formula.text(changes.formulaText || '')
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$emit('formula:input', text)
    this.$dispatch(actions.changeFormulaAction({
      id: this.store.getState().currentCell,
      value: $(event.target).text()
    }))
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
