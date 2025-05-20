import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const usePreCargaStore = defineStore('preCargaStore', {
  state: () => ({
    preCargas: [],
    loading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('pre-carga', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.preCargas = response.data.map((preCarga) => ({
          id: preCarga.id,
          cantidad: preCarga.cantidad,
          precio: preCarga.precion,
          color: preCarga.color,
          material: preCarga.material,
          descripcion: preCarga.descripcion,
          imagen: preCarga.imagen,
          barcode: preCarga.barcode,
          tipo_producto: preCarga.tipo_producto,
          marca: preCarga.marca,
          genero: preCarga.genero,
          categoria: preCarga.categoria,
          created_at: preCarga.created_at,
          updated_at: preCarga.updated_at,
        }))

        return response.data
      } catch (error) {
        console.error('Error fetching preCargas:', error)
        throw error
      }
    },
    async create(data) {
      try {
        const response = await api.post('pre-carga', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.preCargas.push(response.data.preCarga)
        return response.data
      } catch (error) {
        console.error('Error creating ajuste:', error)
        throw error
      }
    },
    async update(data, id) {
      try {
        const response = await api.put(`pre-carga/${id}`, data, {
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
        const response = await api.delete(`pre-carga/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.preCargas = this.preCargas.filter((preCarga) => preCarga.id !== id)
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
  import.meta.hot.accept(acceptHMRUpdate(usePreCargaStore, import.meta.hot))
}
