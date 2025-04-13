<template>
  <q-toolbar class="q-px-lg">
    <!-- Logo -->
    <q-btn flat no-caps no-wrap to="/">
      <q-icon
        name="img:data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><line x1='10' y1='10' x2='40' y2='40' stroke='black' stroke-width='2'/><line x1='10' y1='40' x2='40' y2='10' stroke='black' stroke-width='2'/></svg>"
        size="md"
      />
    </q-btn>

    <q-space />

    <!-- Navegación en desktop -->
    <div class="gt-sm">
      <q-toolbar-title class="q-pa-md q-mx-md">
        <q-btn-group flat>
          <q-btn flat no-caps label="Inicio" to="/" />
          <q-btn flat no-caps label="Servicios" to="/#servicios" />
          <q-btn flat no-caps label="Nosotros" to="/#nosotros" />
          <q-btn flat no-caps label="Contacto" to="/#contacto" />
          <q-btn flat no-caps label="Login" />
        </q-btn-group>
      </q-toolbar-title>
    </div>

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
          <q-item clickable>
            <q-item-section>Login</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderNav',
})
</script>
