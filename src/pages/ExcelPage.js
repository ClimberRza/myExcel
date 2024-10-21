import { Page } from '../core/page/Page'
import { createStore } from '../core/store/createStore'
import { rootReducer } from '../redux/rootReducer'
import { Header } from '../components/header/Header'
import { Excel } from '../components/excel/Excel'
import { Toolbar } from '../components/toolbar/Toolbar'
import { Formula } from '../components/formula/Formula'
import { Table } from '../components/table/Table'
import { LocalStorageClient } from '../shared/LocalStorageClient'
import { StateProcessor } from '../core/page/StateProcessor'

export class ExcelPage extends Page {
  constructor(params) {
    super(params)
    this.storeSub = null
    this.processor = new StateProcessor(
        new LocalStorageClient(params)
    )
  }

  async getRoot() {
    const initialState = await this.processor.get()
    const store = createStore(rootReducer, initialState)

    this.storeSub = store.subscribe(this.processor.listen)

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
    this.storeSub.unsubscribe()
  }
}
