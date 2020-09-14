import React, { useImperativeHandle, useState } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const {
    children,
    labelShow = 'Show',
    labelHide = 'Hide',
  } = props
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={{ display: !visible ? 'none' : '' }}>
        {children}
        <button onClick={() => toggleVisibility()}>{labelHide}</button>
      </div>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={() => toggleVisibility()}>{labelShow}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
