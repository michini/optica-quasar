import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useClienteStore = defineStore('clienteStore', {
  state: () => ({
    clientes: [],
  }),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('cliente', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.clientes = response.data.map((cliente) => ({
          id: cliente.id,
          nombre: cliente.nombre,
          apellidos: cliente.apellidos,
          edad: cliente.edad,
          email: cliente.email,
          telefono: cliente.telefono,
          direccion: cliente.direccion,
          ciudad: cliente.ciudad,
          ocupacion: cliente.ocupacion,
          pais: cliente.pais,
          estado: cliente.estado,
          dni: cliente.dni,
          fecha_nacimiento: cliente.fecha_nacimiento,
          genero: cliente.genero,
          notas: cliente.notas,
          created_at: cliente.created_at,
          updated_at: cliente.updated_at,
        }))
        return response.data
      } catch (error) {
        console.error('Error fetching clientes:', error)
        throw error
      }
    },
    async create(data) {
      try {
        const response = await api.post('cliente', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error('Error creating cliente:', error)
        throw error
      }
    },
    async update(data, id) {
      try {
        const response = await api.put(`cliente/${id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const index = this.clientes.findIndex((cliente) => cliente.id === id)
        if (index !== -1) {
          this.clientes[index] = { ...this.clientes[index], ...data }
        }
        return response.data
      } catch (error) {
        console.error(`Error updating cliente with id ${id}:`, error)
        throw error
      }
    },
    async delete(id) {
      try {
        const response = await api.delete(`cliente/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error deleting cliente with id ${id}:`, error)
        throw error
      }
    },
    async getByDni(dni) {
      try {
        const response = await api.get(`cliente/dni`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { dni },
        })
        return response.data
      } catch (error) {
        console.error(`Error fetching cliente by DNI:`, error)
        throw error
      }
    },
    async getByEmail(email) {
      try {
        const response = await api.get(`cliente/email`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { email },
        })
        return response.data
      } catch (error) {
        console.error(`Error fetching cliente by email:`, error)
        throw error
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClienteStore, import.meta.hot))
}
