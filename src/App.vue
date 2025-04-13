<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'

export default defineComponent({
  name: 'App',

  setup() {
    const authStore = useAuthStore()

    onMounted(() => {
      // Verificar si el usuario está autenticado al iniciar la aplicación
      if (authStore.token) {
        authStore.fetchUser()
      }
    })

    return {}
  },
})
</script>

<style>
/* Estilos globales aquí */
</style>
