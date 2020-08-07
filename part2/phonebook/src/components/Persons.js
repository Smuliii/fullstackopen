import React from 'react'
import Person from './Person'

const Persons = ({ persons, handleRemove }) => (
	<ul>
		{persons.map(person => <Person key={person.name} person={person} handleRemove={handleRemove} />)}
	</ul>
)

export default Persons
