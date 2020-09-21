const initialState = null

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

const clearNotification = message => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
export {
  setNotification,
  clearNotification
}

