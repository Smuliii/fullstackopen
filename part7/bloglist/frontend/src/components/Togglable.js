import React, { useImperativeHandle, useState } from 'react'
import { Button } from '@material-ui/core';

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
    <div className="togglable-container">
      <div className="togglable-content" style={{ display: !visible ? 'none' : '' }}>
        {children}
        <Button variant="outlined" className="togglable-hide" onClick={() => toggleVisibility()}>{labelHide}</Button>
      </div>
      <div style={{ display: visible ? 'none' : '' }}>
        <Button variant="outlined" className="togglable-show" onClick={() => toggleVisibility()}>{labelShow}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
