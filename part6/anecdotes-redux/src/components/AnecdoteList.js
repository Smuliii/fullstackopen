import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const vote = (id) => {
    const anecdote = props.anecdotes.find(anecdote => anecdote.id === id)
    props.voteAnecdote(anecdote)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  let anecdotes = state.filter
    ? state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    : state.anecdotes
  anecdotes.sort((a, b) => b.votes - a.votes)

  return { anecdotes }
}

const mapDispatchToProps = {
  voteAnecdote,
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList
