const initialState = null
let notificationTimer = null

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case 'SET_NOTIFICATION':
    return payload

  case 'CLEAR_NOTIFICATION':
    return null

  default:
    return state
  }
}

const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    payload: message
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

const flashNotification = (message, timeout = 5000) => {
  return dispatch => {
    dispatch(setNotification(message))
    clearTimeout(notificationTimer)
    notificationTimer = setTimeout(() => dispatch(clearNotification()), timeout)
  }
}

export default notificationReducer
export {
  setNotification,
  clearNotification,
  flashNotification
}

