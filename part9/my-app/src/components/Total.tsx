import React from 'react'
import { CoursePart } from '../types'

interface Props {
	parts: CoursePart[]
}

const Total: React.FC<Props> = ({ parts }) => {
	const total = parts.reduce((carry, part) => carry + part.exerciseCount, 0)

	return (
		<p>
			Number of exercises {total}
		</p>
	)
}

export default Total
