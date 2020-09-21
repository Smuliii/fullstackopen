const initialState = ''

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case 'SET_FILTER':
    return payload

  default:
    return state
  }
}

const setFilter = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default filterReducer
export {
  setFilter,
}

