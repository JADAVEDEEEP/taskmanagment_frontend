import { useState } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || 'User')

  function handleLogin({ token: nextToken, userName: nextUserName }) {
    localStorage.setItem('token', nextToken)
    localStorage.setItem('userName', nextUserName)
    setToken(nextToken)
    setUserName(nextUserName)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    setToken('')
    setUserName('User')
  }

  if (!token) {
    return <AuthPage onLogin={handleLogin} />
  }

  return <Dashboard token={token} userName={userName} onLogout={handleLogout} />
}

export default App
