import filterReducer, { setFilter } from './filterReducer'

describe('filter reducer', () => {
  test('should set filter', () => {
    const action = setFilter('Test filter')
    const state = ''
    const newState = filterReducer(state, action)
    expect(newState).toBe('Test filter')
  })
})
