import { useState } from 'react'
import AuthVisual from '../components/auth/AuthVisual'
import Spinner from '../components/common/Spinner'
import Toast from '../components/common/Toast'
import { apiRequest } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  password: '',
}

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function validateForm() {
    if (mode === 'register' && form.name.trim().length < 2) {
      return 'Name required hai.'
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return 'Valid email enter karo.'
    }

    if (form.password.length < 6) {
      return 'Password minimum 6 characters ka hona chahiye.'
    }

    return ''
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      if (mode === 'register') {
        await apiRequest('/userapi/post-user', {
          method: 'POST',
          body: JSON.stringify(form),
        })
        setMode('login')
        setForm(initialForm)
        setSuccess('Account created successfully. Ab login karo.')
        return
      }

      const data = await apiRequest('/userapi/login-user', {
        method: 'POST',
        body: JSON.stringify({ email: form.email, password: form.password }),
      })

      onLogin({
        token: data.token,
        userName: data.user?.name || form.email.split('@')[0],
      })
    } catch (apiError) {
      setError(apiError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="brand-mark">
          <span></span>
          <span></span>
        </div>
        <h1>{mode === 'login' ? 'Welcome Back !' : 'Sign Up'}</h1>
        <p>{mode === 'login' ? 'Please enter your details' : 'Create your account to manage every task'}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Name
              <input
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Enter your name"
              />
            </label>
          )}

          <label>
            Email Address
            <input
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="name@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder="Minimum 6 characters"
            />
          </label>

          {mode === 'login' && (
            <div className="auth-row">
              <label className="check-line">
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="link-button">
                Forgot Password?
              </button>
            </div>
          )}

          {error && <p className="form-error">{error}</p>}
          <Toast message={success} />

          <button className="primary-button" type="submit" disabled={loading}>
            {loading && <Spinner small />}
            {mode === 'login' ? 'Login' : 'Create Account'} <span>-&gt;</span>
          </button>
        </form>

        <p className="terms">By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        <button className="switch-auth" type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </button>
      </section>

      <AuthVisual />
    </main>
  )
}

export default AuthPage
