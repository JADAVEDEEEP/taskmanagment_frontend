import { useState } from 'react'
import { FaApple, FaGoogle } from 'react-icons/fa'
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

      if (!data?.token) {
        setError('Server response me token missing hai. Backend check karo.')
        return
      }

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
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <section className="auth-panel">
        <div className="auth-card">
          <h1>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
          <p>{mode === 'login' ? 'Sign in to continue' : 'Get started for free'}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="floating-field">
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder=" "
                />
                <span>Name</span>
              </div>
            )}

            <div className="floating-field">
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder=" "
              />
              <span>Email</span>
            </div>

            <div className="floating-field">
              <input
                type="password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                placeholder=" "
              />
              <span>Password</span>
            </div>

            {mode === 'login' && (
              <div className="auth-row">
                <label className="check-line">
                  <input type="checkbox" /> Remember me
                </label>
                <button type="button" className="link-button">Forgot password?</button>
              </div>
            )}

            {error && <p className="form-error">{error}</p>}
            <Toast message={success} />

            <button className="primary-button" type="submit" disabled={loading}>
              {loading && <Spinner small />}
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="auth-divider">
            <span></span>
            <small>or continue with</small>
            <span></span>
          </div>

          <div className="social-actions">
            <button type="button" onClick={() => setError('Google login abhi configure nahi hai.')}>
              <FaGoogle /> Google
            </button>
            <button type="button" onClick={() => setError('Apple login abhi configure nahi hai.')}>
              <FaApple /> Apple
            </button>
          </div>

          <button className="switch-auth" type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? (
              <>Not a member? <span>Sign up</span></>
            ) : (
              <>Already have an account? <span>Sign in</span></>
            )}
          </button>
        </div>
      </section>

      <AuthVisual />
    </main>
  )
}

export default AuthPage
