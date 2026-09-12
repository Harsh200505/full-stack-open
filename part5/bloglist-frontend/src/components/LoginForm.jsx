import { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = (event) => {
    event.preventDefault()
    onLogin({ username, password })
  }

  return (
    <section className="panel auth-panel">
      <p className="eyebrow">Welcome back</p>
      <h1>Log in to application</h1>
      <form onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />

        <button className="button" type="submit">
          Login
        </button>
      </form>
    </section>
  )
}

export default LoginForm
