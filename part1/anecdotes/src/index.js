import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRandomListItem = list => Math.floor(Math.random() * list.length)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({ title, anecdote, votes }) => (
  <div>
    <h1>{title}</h1>
    <p>{anecdote} <br/> This has {votes} votes</p>
  </div>
)

const App = ({ anecdotes = [] }) => {
  const [selected, setSelected] = useState(getRandomListItem(anecdotes))
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const randomHandler = () => setSelected(getRandomListItem(anecdotes))
  const voteHandler = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVote(newVotes)
  }

  const mostVoted = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Vote" handleClick={voteHandler} />
      <Button text="Show me another anecdote" handleClick={randomHandler} />
      <Anecdote title="Anecdote with the most votes" anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root') )