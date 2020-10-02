import deepFreeze from 'deep-freeze'
import anecdoteReducer, { addAnecdote, voteAnecdote } from './anecdoteReducer'

describe('anecdote reducer', () => {
  const initialState = [
    {
      content: 'Test 1',
      id: '1',
      votes: 0
    },
    {
      content: 'Test 2',
      id: '2',
      votes: 0
    },
    {
      content: 'Test 3',
      id: '3',
      votes: 0
    }
  ]

  test('should increase votes', () => {
    const action = voteAnecdote('1')
    const state = deepFreeze(initialState)
    const newState = anecdoteReducer(state, action)
    expect(newState).toEqual(expect.arrayContaining([{
      content: 'Test 1',
      id: '1',
      votes: 1,
    }]))
  })

  test('should add new anecdote to the list', () => {
    const action = addAnecdote({
      content: 'New anecdote',
      id: '4',
    })
    const state = deepFreeze(initialState)
    const newState = anecdoteReducer(state, action)
    expect(newState).toEqual(expect.arrayContaining([{
      content: 'New anecdote',
      id: action.payload.id,
      votes: 0,
    }]))
  })
})
