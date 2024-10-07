import { defaultTitle } from '../../constants'

export function createHeader(state) {
  const title = state.excelTitle || defaultTitle
  return `
    <input type="text" value="${title}" class="input" />
          <div>
            <div data-type="button_delete" class="button">
              <i data-type="button_delete" class="material-icons">
                delete
              </i>  
            </div>
            <div data-type="button_exit" class="button">
              <i data-type="button_exit" class="material-icons">
                exit_to_app
              </i>
            </div>  
          </div>
        `
}
