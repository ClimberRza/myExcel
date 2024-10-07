import { Page } from '../core/Page'
import { createStore } from '../core/createStore'
import { rootReducer } from '../redux/rootReducer'
import { getInitialState } from '../redux/getInitialState'
import { debounce, storage, storageName } from '../core/utils'
import { Header } from '../components/header/Header'
import { Excel } from '../components/excel/Excel'
import { Toolbar } from '../components/toolbar/Toolbar'
import { Formula } from '../components/formula/Formula'
import { Table } from '../components/table/Table'

export class ExcelPage extends Page {
  constructor(params) {
    super(params)
  }

  getRoot() {
    const initialState = getInitialState(this.params)
    const store = createStore(rootReducer, initialState)

    const storeListener = debounce(state => {
      storage(storageName(this.params), state)
    }, 430)

    store.subscribe(storeListener)

    this.excel = new Excel({
      components: [
        Header,
        Toolbar,
        Formula,
        Table
      ],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
