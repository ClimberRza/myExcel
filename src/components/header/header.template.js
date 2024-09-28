import { defaultTitle } from '../../constants'

export function createHeader(state) {
  const title = state.excelTitle || defaultTitle
  return `
    <input type="text" value="${title}" class="input" />
          <div>
            <div class="button">
              <i class="material-icons">
                delete
              </i>  
            </div>
            <div class="button">
              <i class="material-icons">
                exit_to_app
              </i>
            </div>
          </div>
        `
}
