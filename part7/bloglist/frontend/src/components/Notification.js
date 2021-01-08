import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab';

const Notification = () => {
	const notification = useSelector(state => state.notification);

	if (!notification?.message) {
		return null
	}

	return (
		<Alert severity={notification.error ? 'error' : 'success'}>{notification.message}</Alert>
	)
}

export default Notification
