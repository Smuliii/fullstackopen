import React from 'react'

const PersonForm = ({ name, number, handleNameChange, handleNumberChange, handleSubmit }) => (
	<form onSubmit={handleSubmit}>
		<div>
			Name: <input value={name} onChange={handleNameChange} />
		</div>
		<div>
			Number: <input value={number} onChange={handleNumberChange} />
		</div>
		<div>
			<button type="submit">Add</button>
		</div>
	</form>
)

export default PersonForm
