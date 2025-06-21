import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useOftalmologoStore = defineStore('oftalmologoStore', {
  state: () => ({
    oftalmologos: [],
  }),
  getters: {},
  actions: {
    async getAll() {
      try {
        const response = await api.get('oftalmologo', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        this.oftalmologos = response.data.map((oftalmologo) => ({
          id: oftalmologo.id,
          nombre: oftalmologo.nombre,
          apellidos: oftalmologo.apellidos,
          dni: oftalmologo.dni,
          cmp: oftalmologo.cmp,
          rne: oftalmologo.rne,
          telefono: oftalmologo.telefono,
          email: oftalmologo.email,
          direccion: oftalmologo.direccion,
          estado: oftalmologo.estado,
          especialidad: oftalmologo.especialidad,
          created_at: oftalmologo.created_at,
          updated_at: oftalmologo.updated_at,
        }))
        return response.data
      } catch (error) {
        console.error('Error fetching oftalmólogos:', error)
        throw error
      }
    },
    async create(data) {
      try {
        const response = await api.post('oftalmologo', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error('Error creating oftalmólogo:', error)
        throw error
      }
    },
    async update(data, id) {
      try {
        const response = await api.put(`oftalmologo/${id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const index = this.oftalmologos.findIndex((oftalmologo) => oftalmologo.id === id)
        if (index !== -1) {
          this.oftalmologos[index] = { ...this.oftalmologos[index], ...data }
        }
        return response.data
      } catch (error) {
        console.error(`Error updating oftalmólogo with id ${id}:`, error)
        throw error
      }
    },
    async delete(id) {
      try {
        const response = await api.delete(`oftalmologo/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error deleting oftalmólogo with id ${id}:`, error)
        throw error
      }
    },
    async getById(id) {
      try {
        const response = await api.get(`oftalmologo/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error fetching oftalmólogo with id ${id}:`, error)
        throw error
      }
    },
    async getByEspecialidad(especialidad) {
      try {
        const response = await api.get(`oftalmologo/especialidad/${especialidad}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error fetching oftalmólogos by especialidad:`, error)
        throw error
      }
    },
    async getByEstado(estado) {
      try {
        const response = await api.get(`oftalmologo/estado/${estado}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return response.data
      } catch (error) {
        console.error(`Error fetching oftalmólogos by estado:`, error)
        throw error
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOftalmologoStore, import.meta.hot))
}
