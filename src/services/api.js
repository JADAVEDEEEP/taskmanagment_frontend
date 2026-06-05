
const API_URL = import.meta.env.VITE_API_URL || 'https://taskmanagment-backend-96wl.onrender.com'

export async function apiRequest(path, options = {}, token = '') {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Network/CORS error. Backend URL or CORS settings check karo.')
  }

  const contentType = response.headers.get('content-type') || ''

  // Safe parsing
  let data = {}
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => ({}))
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`)
  }

  return data
}


