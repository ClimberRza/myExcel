import { $ } from '../../core/dom'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './table.template'

export function resizeHandler(event, $root, whatIsResizing) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parentNode = $resizer.closest('[data-type="resizable"]')
    const coords = $parentNode.getCoords()
    const $resizingIndicator = $.create('div', 'resize-indicator')
    let heightAboveTable

    if (whatIsResizing === 'col') {
      $resizingIndicator.css(getColIndicatorStyle(event.clientX))
    } else {
      heightAboveTable = $root.getCoords().top
      const top = event.clientY - heightAboveTable

      $resizingIndicator.css(getRowIndicatorStyle(top))
    }

    $root.append($resizingIndicator)

    document.onmousemove = e => {
      $resizingIndicator.remove()

      if (whatIsResizing === 'col') {
        const delta = e.clientX - coords.right
        const value = coords.right + delta
        $resizingIndicator.css({ left: value + 'px' })
        $root.append($resizingIndicator)
      } else {
        const delta = e.clientY - coords.bottom
        const value = coords.bottom + delta - heightAboveTable
        $resizingIndicator.css({ top: value + 'px' })
        $root.append($resizingIndicator)
      }
    }

    document.onselectstart = (e) => {
      e.preventDefault()
    }

    document.onmouseup = (e) => {
      $resizingIndicator.remove()
      let newSize

      if (whatIsResizing === 'col') {
        const numberOfCol = $parentNode.data.col
        const cellsUnderColumn = $root
            .findAll(`[data-col="${numberOfCol}"]`)
        const delta = e.clientX - coords.right
        newSize = coords.width + delta
        const minWidth = +$parentNode.getCompStyle('min-width').slice(0, -2)

        if (newSize < minWidth) {
          newSize = minWidth
        }

        $parentNode.css({ width: newSize + 'px' })
        cellsUnderColumn.forEach(cell =>
          cell.css({ width: newSize + 'px' }))
      } else {
        const delta = e.clientY - coords.bottom
        newSize = coords.height + delta
        const minHeight = +$parentNode.getCompStyle('min-height').slice(0, -2)

        if (newSize < minHeight) {
          newSize = minHeight
        }

        $parentNode.css({ height: newSize + 'px' })
      }

      resolve({
        id: whatIsResizing === 'col' ?
        $parentNode.data.col :
        $parentNode.data.row,
        value: newSize,
        type: whatIsResizing
      })

      document.onmousemove = null
      document.onselectstart = null
      document.onmouseup = null
    }
  })
}


export function getToDefaultSize(event, $root, whatIsResizing) {
  const $resizer = $(event.target)
  const $parentNode = $resizer.closest('[data-type="resizable"]')

  if (whatIsResizing === 'col') {
    const dataCol = $parentNode.data.col
    const getToDefaultWidth = $root
        .findAll(`[data-col="${dataCol}"]`)
    getToDefaultWidth.forEach($elem => {
      $elem.css({width: DEFAULT_WIDTH + 'px'})
    })
    return {
      id: dataCol
    }
  } else {
    $parentNode.css({height: DEFAULT_HEIGHT + 'px'})
    return {
      id: $parentNode.data.row
    }
  }
}


function getColIndicatorStyle(left) {
  return {
    left: left + 'px',
    top: 0,
    bottom: 0,
    width: '2px'
  }
}

function getRowIndicatorStyle(top) {
  return {
    top: top + 'px',
    left: 0,
    right: 0,
    height: '2px'
  }
}
