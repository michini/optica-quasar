import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useTipoProductoStore = defineStore('tipoProductosStore', {
  state: () => ({}),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('/tipo-producto', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error('Error fetching ajustes:', error)
        throw error
      }
    },
    async create(data) {
      try {
        const response = await api.post('tipo-producto', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error('Error creating ajuste:', error)
        throw error
      }
    },
    async update(data, id) {
      try {
        const response = await api.put(`tipo-producto/${id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error updating ajuste with id ${id}:`, error)
        throw error
      }
    },
    async delete(id) {
      try {
        const response = await api.delete(`tipo-producto/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error deleting ajuste with id ${id}:`, error)
        throw error
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTipoProductoStore, import.meta.hot))
}
