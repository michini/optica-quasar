<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title> Opticas Pa'ti </q-toolbar-title>
        <q-space />
        <q-btn-dropdown flat dense round icon="person">
          <q-list>
            <q-item clickable v-close-popup to="/profile">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cerrar Sesión</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-img src="~assets/logo_optica.jpg" alt="Logo" class="q-mb-md" height="160px">
          <template v-slot:caption>
            <div class="text-h6 text-center">Optica</div>
          </template>
        </q-img>
        <q-item-label header>Navegación</q-item-label>

        <MenuModules />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'
import MenuModules from 'src/components/home/MenuModules.vue'

export default defineComponent({
  name: 'HomeLayout',
  components: {
    MenuModules,
  },

  setup() {
    const authStore = useAuthStore()
    const leftDrawerOpen = ref(true)

    const user = computed(() => authStore.user)

    const logout = () => {
      authStore.logout()
    }

    onMounted(() => {
      // Fetch user data if not already loaded
      if (!authStore.user) {
        authStore.fetchUser()
      }
    })

    return {
      authStore,
      leftDrawerOpen,
      user,
      logout,
    }
  },
})
</script>
