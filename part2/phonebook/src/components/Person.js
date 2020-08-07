import React from 'react'

const Person = ({ person, handleRemove }) => (
	<li>{person.name} {person.number} <button data-person={person.id} onClick={handleRemove}>Delete</button></li>
)

export default Person
