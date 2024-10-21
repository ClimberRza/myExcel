import { $ } from '../core/dom'

export function Loader() {
  return $.create('div', 'loadWrap').html(`<span class="loader"></span>`)
}
