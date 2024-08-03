import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
    console.log('Token added to request:', token)
  }
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/pages/login'
  }
  return Promise.reject(error)
})

export default api