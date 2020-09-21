import notificationReducer, { clearNotification, setNotification } from './notificationReducer'

describe('notification reducer', () => {
  test('should set new notification', () => {
    const action = setNotification('Message')
    const state = null
    const newState = notificationReducer(state, action)
    expect(newState).toBe('Message')
  })
  test('should clear notification', () => {
    const action = clearNotification()
    const state = 'Message'
    const newState = notificationReducer(state, action)
    expect(newState).toBe(null)
  })
})
