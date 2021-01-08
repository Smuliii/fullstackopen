import React from 'react'
import { assertNever } from '../utils'
import { CoursePart } from '../types'

interface Props {
	part: CoursePart
}

const Part: React.FC<Props> = ({ part }) => {
	switch (part.name) {
		case 'Fundamentals':
			return (
				<div>
					<p>name: {part.name}</p>
					<p>description: {part.description}</p>
					<p>exerciseCount: {part.exerciseCount}</p>
				</div>
			)

		case 'Using props to pass data':
			return (
				<div>
					<p>name: {part.name}</p>
					<p>exerciseCount: {part.exerciseCount}</p>
					<p>groupProjectCount: {part.groupProjectCount}</p>
				</div>
			)

		case 'Deeper type usage':
			return (
				<div>
					<p>name: {part.name}</p>
					<p>description: {part.description}</p>
					<p>exerciseCount: {part.exerciseCount}</p>
					<p>exerciseSubmissionLink: {part.exerciseSubmissionLink}</p>
				</div>
			)

		case 'Final test':
			return (
				<div>
					<p>name: {part.name}</p>
					<p>description: {part.description}</p>
					<p>exerciseCount: {part.exerciseCount}</p>
					<p>dueDate: {part.dueDate}</p>
				</div>
			)

		default:
			return assertNever(part)
	}
}

export default Part
