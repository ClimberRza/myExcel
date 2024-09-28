export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      isActive: state.textAlign === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      isActive: state.textAlign === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      isActive: state.textAlign === 'right',
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      isActive: state.fontWeight === '600',
      value: {fontWeight: state.fontWeight === '600' ? 'normal' : '600'}
    },
    {
      icon: 'format_italic',
      isActive: state.fontStyle === 'italic',
      value: {fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underlined',
      isActive: state.textDecoration === 'underline',
      value: {textDecoration: state.textDecoration === 'underline'
        ? 'none' : 'underline'}
    }
  ]

  return buttons.map(toButton).join('')
}

function toButton(button) {
  const meta = `
  data-type="toolbar-btn"
  data-value=${JSON.stringify(button.value)}
  `

  return `
        <div
        class="button ${button.isActive ? 'active' : ''}"
        ${meta}
        >
          <i class="material-icons" ${meta}>
            ${button.icon}
          </i>  
        </div>
        `
}
