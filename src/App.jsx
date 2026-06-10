import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
// import ForgotPassword from './pages/ForgotPassword'

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

  return (
    <Routes>
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      <Route
        path="/"
        element={token ? <Dashboard token={token} userName={userName} onLogout={handleLogout} /> : <AuthPage onLogin={handleLogin} />}
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}


export default App

