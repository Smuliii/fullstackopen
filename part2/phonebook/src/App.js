import React, { useState, useEffect } from 'react'
import PersonService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = () => {
    PersonService.get().then(data => setPersons(data))
  }

  const addPerson = e => {
    e.preventDefault()

    const personData = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`Replace old number with a new one for ${existingPerson.name}?`)) {
        PersonService.update(existingPerson.id, personData).then(data => {
          setPersons(persons.map(person => person.id === data.id ? data : person))
          setNewName('')
          setNewNumber('')
          flashNotification(`Number was updated: ${existingPerson.number} -> ${data.number}`)
        })
      }
      return
    }

    PersonService.add(personData).then(data => {
      setPersons(persons.concat(data))
      setNewName('')
      setNewNumber('')
      // Refresh search
      setSearch(search)
      flashNotification(`New person added: ${data.name}`)
    })
  }

  const flashNotification = (message, error = false) => {
    setNotification({ message, error })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = e => {
    setSearch(e.target.value)
  }

  const handleRemove = e => {
    const id = Number(e.target.dataset.person)
    const person = persons.find(person => person.id === id)
    const updatePersonsList = () => setPersons(persons.filter(person => person.id !== id))

    if (!person) {
      updatePersonsList()
      return
    }

    if (window.confirm(`Remove person ${person.name}?`)) {
      PersonService.remove(id).then(() => {
        flashNotification(`Person removed: ${person.name}`)
      }).catch(() => {
        flashNotification(`Person has already been remove from the server: ${person.name}`, true)
      }).finally(() => updatePersonsList())
    }
  }

  const shownPersons = search
    ? persons.filter(person => new RegExp(search, 'i').test(person.name))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter search={search} handleChange={handleSearchChange} />
			<h2>Add new person</h2>
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} handleRemove={handleRemove} />
    </div>
  )
}

export default App