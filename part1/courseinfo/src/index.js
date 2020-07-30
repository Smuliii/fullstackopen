import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ data }) => (
  <p>
    {data.name} {data.exercises}
  </p>
)

const Content = ({ parts }) => {
  return (
    <div>
      <Part data={parts[0]} />
      <Part data={parts[1]} />
      <Part data={parts[2]} />
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))