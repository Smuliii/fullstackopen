import anecdotesService from '../services/anecdotes'
import { flashNotification } from './notificationReducer'

const initialState = []

const anecdoteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case 'VOTE_ANECDOTE':
    return state.map(anecdote => ({
      ...anecdote,
      votes: anecdote.id === payload.id ? payload.votes : anecdote.votes,
    }))

  case 'ADD_ANECDOTE':
    return state.concat([payload])

  case 'INIT_ANECDOTE':
    return payload

  default:
    return state
  }
}

const voteAnecdote = anecdote => {
  return async dispatch => {
    const updated = await anecdotesService.update(anecdote.id, { votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE_ANECDOTE',
      payload: { id: anecdote.id, votes: updated.votes },
    })
    dispatch(flashNotification(`You voted '${anecdote.content}'`))
  }
}

const addAnecdote = anecdote => {
  return async dispatch => {
    const { id, content } = await anecdotesService.add({ content: anecdote, votes: 0 })
    dispatch( {
      type: 'ADD_ANECDOTE',
      payload: {
        id,
        content,
        votes: 0,
      }
    })
    dispatch(flashNotification(`You added new anecdote '${content}'`))
  }
}

const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      payload: anecdotes
    })
  }
}

export default anecdoteReducer
export {
  voteAnecdote,
  addAnecdote,
  initAnecdotes,
}

