import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useMarcaStore = defineStore('marcaStore', {
  state: () => ({
    marcas: [],
  }),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('marca', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.marcas = response.data.map((marca) => ({
          id: marca.id,
          nombre: marca.nombre,
          tipo_producto_id: marca.tipo_producto_id,
          created_at: marca.created_at,
          updated_at: marca.updated_at,
        }))
        return response.data
      } catch (error) {
        console.error('Error fetching ajustes:', error)
        throw error
      }
    },
    async create(data) {
      try {
        const response = await api.post('marca', data, {
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
        const response = await api.put(`marca/${id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const index = this.marcas.findIndex((marca) => marca.id === id)
        if (index !== -1) {
          this.marcas[index] = { ...this.marcas[index], ...data }
        }
        return response.data
      } catch (error) {
        console.error(`Error updating ajuste with id ${id}:`, error)
        throw error
      }
    },
    async delete(id) {
      try {
        const response = await api.delete(`marca/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error deleting ajuste with id ${id}:`, error)
        throw error
      }
    },
    async getByProductoId(request) {
      try {
        const response = await api.get(`marca/tipo-producto/getbyid`, {
          params: request,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error fetching producto:`, error)
        throw error
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMarcaStore, import.meta.hot))
}
