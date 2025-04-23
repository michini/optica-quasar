import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useCategoriaStore = defineStore('categoriaStore', {
  state: () => ({
    categorias: [],
  }),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('categoria', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.categorias = response.data.map((categoria) => ({
          id: categoria.id,
          nombre: categoria.nombre,
          tipo_producto_id: categoria.tipo_producto_id,
          created_at: categoria.created_at,
          updated_at: categoria.updated_at,
        }))
        return response.data
      } catch (error) {
        console.error('Error fetching ajustes:', error)
        throw error
      }
    },
    async create(data) {
      try {
        const response = await api.post('categoria', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.categorias.push(response.data.tipo_producto)
        return response.data
      } catch (error) {
        console.error('Error creating ajuste:', error)
        throw error
      }
    },
    async update(data, id) {
      console.log('data', data)
      console.log('id', id)
      try {
        const response = await api.put(`categoria/${id}`, data, {
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
        const response = await api.delete(`categoria/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.categorias = this.categorias.filter((categoria) => categoria.id !== id)
        return response.data
      } catch (error) {
        console.error(`Error deleting ajuste with id ${id}:`, error)
        throw error
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoriaStore, import.meta.hot))
}
