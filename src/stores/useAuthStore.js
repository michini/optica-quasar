import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },

  actions: {
    async register(userData) {
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/register', userData)
        this.user = response.data.user
        this.token = response.data.access_token

        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.access_token)

        this.router.push({ name: 'dashboard' })
        return response
      } catch (error) {
        this.error = error.response?.data?.errors || 'Ocurrió un error durante el registro'
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null

      try {
        const response = await api.post('/login', credentials)
        this.user = response.data.user
        this.token = response.data.access_token

        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.access_token)

        this.router.push({ name: 'dashboard' })
        return response
      } catch (error) {
        this.error = error.response?.data?.errors || 'Credenciales incorrectas'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await api
          .post(
            '/logout',
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
          )
          .then(() => {
            this.user = null
            this.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            this.loading = false
            this.router.push({ name: 'auth.login' })
          })
      } catch (error) {
        console.error('Error durante el cierre de sesión:', error)
      } /*finally {
        this.user = null
        this.token = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.loading = false
        this.router.push({ name: 'auth.login' })
      }*/
    },

    async fetchUser() {
      if (!this.token) return

      this.loading = true

      try {
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
        return response
      } catch (error) {
        this.error = 'Error al obtener datos del usuario'
        this.logout()
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
