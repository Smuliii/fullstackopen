import React from 'react'

const Notification = ({ notification }) => {
	if (!notification?.message) {
		return null
	}

	const color = notification.error ? 'red' : 'green'
	const styles = {
		border: `3px ${color} solid`,
		padding: 10,
		margin: '0 0 20px',
		maxWidth: 500,
	}

	return (
		<div style={styles}>{notification.message}</div>
	)
}

export default Notification
