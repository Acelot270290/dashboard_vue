import api from './api'

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data
  } catch (error) {
    console.error('Login API error:', error)
    throw error
  }
}

const logout = () => {
  localStorage.removeItem('token')
}

const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

export { login, logout, isLoggedIn }
