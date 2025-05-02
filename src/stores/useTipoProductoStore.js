import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useTipoProductoStore = defineStore('tipoProductosStore', {
  state: () => ({
    tipoProductos: [],
    loading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('/tipo-producto', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.tipoProductos = response.data.map((tipoProducto) => ({
          id: tipoProducto.id,
          nombre: tipoProducto.nombre,
          created_at: tipoProducto.created_at,
          updated_at: tipoProducto.updated_at,
        }))

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
        this.tipoProductos.push(response.data.tipo_producto)
        //console.log('Ajuste creado:', this.tipoProductos)
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
        this.tipoProductos = this.tipoProductos.map((tipoProducto) =>
          tipoProducto.id === id ? { ...tipoProducto, ...data } : tipoProducto,
        )
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
        this.tipoProductos = this.tipoProductos.filter((tipoProducto) => tipoProducto.id !== id)
        //console.log('Ajuste eliminado:', this.tipoProductos)
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
