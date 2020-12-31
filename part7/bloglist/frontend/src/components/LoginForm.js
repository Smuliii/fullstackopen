import React from 'react'
import Notification from './Notification'

const LoginForm = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <form className="login-form" method="post" onSubmit={handleLogin}>
      <h2>Login</h2>
      <Notification />
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
