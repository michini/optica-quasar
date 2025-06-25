<template>
  <q-page class="q-pa-md">
    <q-toolbar class="bg-primary text-white q-mb-md rounded-borders">
      <q-toolbar-title>
        <q-icon name="visibility" class="q-mr-sm" />
        Gestión de Oftalmólogos
      </q-toolbar-title>
      <q-btn icon="refresh" flat round dense @click="loadOftalmologos" class="q-ml-auto">
        <q-tooltip>Recargar</q-tooltip>
      </q-btn>
      <q-btn icon="settings" flat round dense @click="$router.push('/settings')" class="q-ml-xs">
        <q-tooltip>Ajustes</q-tooltip>
      </q-btn>
    </q-toolbar>
    <!-- <div class="row q-mb-lg">
      <div class="col-12">
        <div class="text-h4 text-weight-bold q-mb-md">
          <q-icon name="visibility" class="q-mr-sm" />
          Gestión de Oftalmólogos
        </div>
        <q-breadcrumbs class="text-grey-7">
          <q-breadcrumbs-el label="Inicio" icon="home" />
          <q-breadcrumbs-el label="Oftalmólogos" />
        </q-breadcrumbs>
      </div>
    </div> -->

    <!-- Filtros y botón nuevo -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row q-mb-lg">
          <div class="col-12 col-md-6">
            <q-input v-model="search" placeholder="Buscar oftalmólogo..." outlined dense clearable>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3 q-mt-md-none">
            <q-select
              v-model="estadoFilter"
              :options="estadoOptions"
              label="Estado"
              outlined
              dense
              emit-value
              map-options
              clearable
            />
          </div>
          <div class="col-12 col-md-3 q-mt-md-none q-pl-md-sm">
            <q-btn
              color="primary"
              icon="add"
              label="Nuevo"
              @click="openCreateModal"
              class="full-width"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Lista de oftalmólogos -->
    <OftalmologosList
      :oftalmologos="filteredOftalmologos"
      :loading="loading"
      @edit="openEditModal"
      @delete="deleteOftalmologo"
      @refresh="loadOftalmologos"
    />

    <!-- Modal de formulario -->
    <OftalmologoForm
      v-model:show="showModal"
      :oftalmologo="selectedOftalmologo"
      :is-edit="isEdit"
      @save="handleSave"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useOftalmologoStore } from 'src/stores/useOftalmologoStore'
import OftalmologosList from 'src/components/home/oftalmologos/OftalmologosList.vue'
import OftalmologoForm from 'src/components/home/oftalmologos/OftalmologoForm.vue'

// Composables
const $q = useQuasar()
const oftalmologoStore = useOftalmologoStore()

// Estados reactivos
const loading = ref(false)
const showModal = ref(false)
const isEdit = ref(false)
const selectedOftalmologo = ref(null)
const search = ref('')
const estadoFilter = ref('')

// Opciones para filtros
const estadoOptions = [
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' },
]

// Computed
const filteredOftalmologos = computed(() => {
  let filtered = oftalmologoStore.oftalmologos

  // Filtro por búsqueda
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    filtered = filtered.filter(
      (oftalmologo) =>
        oftalmologo.nombre.toLowerCase().includes(searchLower) ||
        oftalmologo.apellidos.toLowerCase().includes(searchLower) ||
        oftalmologo.dni.includes(search.value) ||
        oftalmologo.email.toLowerCase().includes(searchLower) ||
        oftalmologo.especialidad.toLowerCase().includes(searchLower),
    )
  }

  // Filtro por estado
  if (estadoFilter.value) {
    filtered = filtered.filter((oftalmologo) => oftalmologo.estado === estadoFilter.value)
  }

  return filtered
})

// Métodos
const loadOftalmologos = async () => {
  loading.value = true
  try {
    await oftalmologoStore.getAll()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error al cargar oftalmólogos',
      caption: error.message,
    })
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  selectedOftalmologo.value = null
  isEdit.value = false
  showModal.value = true
}

const openEditModal = (oftalmologo) => {
  selectedOftalmologo.value = { ...oftalmologo }
  isEdit.value = true
  showModal.value = true
}

const handleSave = async (data) => {
  try {
    let response
    if (isEdit.value) {
      response = await oftalmologoStore.update(data, selectedOftalmologo.value.id)
      $q.notify({
        type: 'positive',
        message: 'Oftalmólogo actualizado exitosamente',
        caption: response.message || 'La información ha sido guardada',
      })
    } else {
      response = await oftalmologoStore.create(data)
      $q.notify({
        type: 'positive',
        message: 'Oftalmólogo creado exitosamente',
        caption: response.message || 'El registro ha sido guardado',
      })
    }

    showModal.value = false
    await loadOftalmologos()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: isEdit.value ? 'Error al actualizar oftalmólogo' : 'Error al crear oftalmólogo',
      caption: error.response?.data?.message || error.message,
    })
  }
}

const deleteOftalmologo = async (oftalmologo) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Está seguro que desea eliminar al oftalmólogo ${oftalmologo.nombre} ${oftalmologo.apellidos}?`,
    cancel: true,
    persistent: true,
    color: 'negative',
  }).onOk(async () => {
    try {
      const response = await oftalmologoStore.delete(oftalmologo.id)
      $q.notify({
        type: 'positive',
        message: 'Oftalmólogo eliminado exitosamente',
        caption: response.message || 'El registro ha sido eliminado',
      })
      await loadOftalmologos()
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error al eliminar oftalmólogo',
        caption: error.response?.data?.message || error.message,
      })
    }
  })
}

// Watchers
watch([search, estadoFilter], () => {
  // Los filtros se aplicarán automáticamente por el computed
})

// Lifecycle
onMounted(() => {
  loadOftalmologos()
})
</script>

<style scoped>
.q-page {
  min-height: calc(100vh - 50px);
}
</style>
