import React from 'react'

const Filter = ({ search, handleChange }) => (
	<div>
		Filter persons: <input value={search} onChange={handleChange} />
	</div>
)
export default Filter
