<template>
  <q-toolbar class="q-px-lg">
    <!-- Logo -->
    <q-btn flat round no-wrap to="/" v-ripple="false" size="lg">
      <img src="~assets/logo_optica.jpg" alt="" height="75px" style="border-radius: 50%" />
    </q-btn>
    <q-toolbar-title class="q-mx-md q-my-none">
      <span class="text-h5 text-weight-bold text-red-7">Ópticas Pa'ti</span>
    </q-toolbar-title>
    <!-- <q-avatar size="md" class="q-mr-sm">
      <img src="~assets/logo_optica.jpg" alt="" />
    </q-avatar> -->
    <q-space />

    <!-- Navegación en desktop -->
    <div class="gt-sm">
      <q-toolbar-title class="q-pa-md q-mx-md">
        <q-btn-group flat class="text-red-7">
          <q-btn flat no-caps label="Inicio" to="/" />
          <q-btn flat no-caps label="Servicios" href="#servicios" />
          <q-btn flat no-caps label="Nosotros" href="#nosotros" />
          <q-btn flat no-caps label="Contacto" href="#contacto"></q-btn>
          <q-btn
            flat
            no-caps
            :label="authStore.isAuthenticated ? 'Dashboard' : 'Login'"
            :to="
              !authStore.isAuthenticated
                ? $router.resolve({ name: 'auth.login' }).path
                : $router.resolve({ name: 'dashboard' }).path
            "
          />
        </q-btn-group>
      </q-toolbar-title>
    </div>

    <!-- Icono del carrito -->
    <CartIcon />

    <!-- Menú móvil -->
    <q-btn flat dense round icon="menu" class="lt-md" aria-label="Menu">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item clickable to="/">
            <q-item-section>Inicio</q-item-section>
          </q-item>
          <q-item clickable to="/#servicios">
            <q-item-section>Servicios</q-item-section>
          </q-item>
          <q-item clickable to="/#nosotros">
            <q-item-section>Nosotros</q-item-section>
          </q-item>
          <q-item clickable to="/#contacto">
            <q-item-section>Contacto</q-item-section>
          </q-item>
          <q-item clickable :to="$router.resolve({ name: 'auth.login' }).path">
            <q-item-section>Login</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'
import CartIcon from './CartIcon.vue'

export default defineComponent({
  name: 'HeaderNav',
  components: { CartIcon },
  setup() {
    const authStore = useAuthStore()

    return {
      authStore,
      CartIcon,
    }
  },
})
</script>
