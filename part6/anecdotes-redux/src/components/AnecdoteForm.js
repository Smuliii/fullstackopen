import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
  const add = async e => {
    e.preventDefault()
    props.addAnecdote(e.target.content.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const connectedAnecdoteForm = connect(null, { addAnecdote })(AnecdoteForm)
export default connectedAnecdoteForm
