import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useProductoStore = defineStore('ProductoStore', {
  state: () => ({ productos: [] }),
  getters: {},
  actions: {
    async insertByPreCarga(request) {
      try {
        const response = await api.get(`producto/pre-carga/insert`, {
          params: request,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error fetching producto:`, error)
        throw error
      }
    },
    async getProductSummary() {
      try {
        const response = await api.get(`producto/summary/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error fetching producto:`, error)
        throw error
      }
    },
    async getProductoByCodigo(codigo) {
      try {
        const response = await api.get(`producto/summary/${codigo}`, {
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
  import.meta.hot.accept(acceptHMRUpdate(useProductoStore, import.meta.hot))
}
