import React from 'react'
import Part from './Part'
import { CoursePart } from '../types'

interface Props {
	parts: CoursePart[]
}

const Content: React.FC<Props> = ({ parts }) => {
	return (
		<div>
			{parts.map(part => (
				<Part key={part.name} part={part} />
			))}
		</div>
	)
}

export default Content
