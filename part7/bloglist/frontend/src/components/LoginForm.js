import React from 'react'
import { TextField, Button } from '@material-ui/core';
import Notification from './Notification'

const LoginForm = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <form className="login-form" method="post" onSubmit={handleLogin}>
      <h1>Login</h1>
      <Notification />
      <div>
        <TextField label="Username" name="username" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <TextField label="Password" type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
	  <p><Button variant="contained" color="primary" type="submit">Login</Button></p>
    </form>
  )
}

export default LoginForm
