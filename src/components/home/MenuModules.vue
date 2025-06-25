<template>
  <q-item v-for="item in menuItems" :key="item.label" clickable v-ripple :to="item.route">
    <q-item-section avatar>
      <q-icon :name="item.icon" />
    </q-item-section>
    <q-item-section> {{ item.label }} </q-item-section>
  </q-item>

  <q-separator />

  <q-item clickable v-ripple @click="logout">
    <q-item-section avatar>
      <q-icon name="logout" />
    </q-item-section>
    <q-item-section> Cerrar Sesión </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'

export default defineComponent({
  name: 'MenuModules',
  setup() {
    const authStore = useAuthStore()
    const logout = () => {
      authStore.logout()
    }
    const menuItems = [
      {
        icon: 'home',
        label: 'Inicio',
        route: '/dashboard',
      },
      {
        icon: 'people',
        label: 'Clientes',
        route: '/clientes',
      },
      {
        icon: 'inventory',
        label: 'Inventario',
        route: '/inventario',
      },
      {
        icon: 'list_alt',
        label: 'Pedidos',
        route: '/pedidos',
      },
      {
        icon: 'visibility',
        label: 'Oftalmologos',
        route: '/oftalmologos',
      },
      {
        icon: 'event',
        label: 'Citas',
        route: '/profile',
      },
      {
        icon: 'qr_code',
        label: 'Ajustes',
        route: '/ajustes',
      },
      {
        icon: 'person',
        label: 'Usuarios',
        route: '/profile',
      },
    ]

    return {
      authStore,
      logout,
      menuItems,
    }
  },
})
</script>
