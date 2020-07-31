import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ name, value }) => <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ({ stats }) => {
  const allValues = stats.map(item => <Statistic key={item.name} name={item.name} value={item.value} />)
  const total = stats.reduce((sum, item) => sum + item.value, 0)
  const average = total ? stats.reduce((sum, item) => sum + (item.value * item.score), 0) / total : 0
  const positive = total ? stats.filter(item => item.score > 0).reduce((sum, item) => sum + item.value, 0) / total * 100 : 0

  if (!total) {
    return (
      <div>No feedback yet!</div>
    )
  }

  return (
    <table>
      <tbody>
        {allValues}
        <Statistic name="Total" value={total} />
        <Statistic name="Average" value={average} />
        <Statistic name="Positive" value={positive + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setFeedback = (set, val) => set(val + 1)
  const stats = [
    {
      name: 'Good',
      value: good,
      score: 1,
    },
    {
      name: 'Neutral',
      value: neutral,
      score: 0,
    },
    {
      name: 'Bad',
      value: bad,
      score: -1,
    },
  ]

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={() => setFeedback(setGood, good)} />
      <Button text="Neutral" handleClick={() => setFeedback(setNeutral, neutral)} />
      <Button text="Bad" handleClick={() => setFeedback(setBad, bad)} />

      <h1>Statistics</h1>
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))