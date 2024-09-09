import { $ } from '../../core/dom'

export function resizeHandler(event, $root) {
  const whatIsResizing = event.target.dataset.resize
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
    if (whatIsResizing === 'col') {
      const numberOfCol = $parentNode.data.col
      const cellsUnderColumn = $root
          .findAll(`[data-col="${numberOfCol}"]`)
      const delta = e.clientX - coords.right
      const newWidth = coords.width + delta
      const minWidth = +$parentNode.getCompStyle('min-width').slice(0, -2)

      if (newWidth < minWidth) {
        $parentNode.css({ width: minWidth + 'px' })
        cellsUnderColumn.forEach(cell =>
          cell.css({ width: minWidth + 'px' }))
      } else {
        $parentNode.css({ width: newWidth + 'px' })
        cellsUnderColumn.forEach(cell =>
          cell.css({ width: newWidth + 'px' }))
      }
    } else {
      const delta = e.clientY - coords.bottom
      const newHeight = coords.height + delta
      const minHeight = +$parentNode.getCompStyle('min-height').slice(0, -2)
      if (newHeight < minHeight) {
        $parentNode.css({ height: minHeight + 'px' })
      } else {
        $parentNode.css({ height: newHeight + 'px' })
      }
    }

    document.onmousemove = null
    document.onselectstart = null
    document.onmouseup = null
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
