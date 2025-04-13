<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title> Dashboard </q-toolbar-title>
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

    <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-1">
      <q-list>
        <q-item-label header>Navegación</q-item-label>

        <q-item clickable v-ripple to="/dashboard" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section> Dashboard </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/profile">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section> Perfil </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> Cerrar Sesión </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Bienvenido, {{ user?.name || 'Usuario' }}</div>
            <div class="text-subtitle2">¿Qué deseas hacer hoy?</div>
          </q-card-section>
        </q-card>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-card>
              <q-card-section>
                <div class="text-h6">Estadísticas</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="text-center text-h4 text-primary">24</div>
                <div class="text-center">Proyectos activos</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-4">
            <q-card>
              <q-card-section>
                <div class="text-h6">Tareas</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="text-center text-h4 text-accent">8</div>
                <div class="text-center">Tareas pendientes</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-4">
            <q-card>
              <q-card-section>
                <div class="text-h6">Mensajes</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="text-center text-h4 text-positive">12</div>
                <div class="text-center">Sin leer</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-card class="q-mt-md">
          <q-card-section>
            <div class="text-h6">Actividad reciente</div>
          </q-card-section>
          <q-separator />
          <q-list>
            <q-item v-for="(activity, index) in recentActivities" :key="index">
              <q-item-section avatar>
                <q-icon :name="activity.icon" :color="activity.color" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ activity.title }}</q-item-label>
                <q-item-label caption>{{ activity.description }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ activity.time }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'

export default defineComponent({
  name: 'DashboardPage',

  setup() {
    const authStore = useAuthStore()
    const leftDrawerOpen = ref(false)

    const user = computed(() => authStore.user)

    const recentActivities = ref([
      {
        icon: 'edit',
        color: 'primary',
        title: 'Proyecto actualizado',
        description: 'Has actualizado el proyecto "App de Ventas"',
        time: 'Hace 2 horas',
      },
      {
        icon: 'task_alt',
        color: 'positive',
        title: 'Tarea completada',
        description: 'Has completado la tarea "Diseño de UI"',
        time: 'Hace 5 horas',
      },
      {
        icon: 'chat',
        color: 'accent',
        title: 'Nuevo mensaje',
        description: 'Has recibido un mensaje de Juan Pérez',
        time: 'Hace 1 día',
      },
      {
        icon: 'group_add',
        color: 'info',
        title: 'Nuevo miembro',
        description: 'María López se ha unido al equipo',
        time: 'Hace 2 días',
      },
    ])

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
      recentActivities,
      logout,
    }
  },
})
</script>
