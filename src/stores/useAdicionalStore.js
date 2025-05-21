import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useAdicionalStore = defineStore('adicionalStore', {
  state: () => ({
    adicionales: [],
  }),
  getters: {},
  actions: {
    async create(data) {
      try {
        const response = await api.post('adicional', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        return response.data
      } catch (error) {
        console.error('Error creating adicional:', error)
        throw error
      }
    },
    // async getById(){
    //   try{
    //     const response = await api.get('adicional/pre-carga/getbyid', {
    //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    //     })
    //   }catch(error){
    //     console.error('Error fetching adicionales:', error)
    //     throw error
    //   }
    // }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdicionalStore, import.meta.hot))
}
