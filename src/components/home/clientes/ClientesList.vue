<template>
  <div class="clientes-list">
    <div class="row q-mb-md">
      <div class="col">
        <q-input
          v-model="searchText"
          outlined
          dense
          placeholder="Buscar por nombre o DNI..."
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col">
        <q-btn
          color="primary"
          icon="add"
          label="Nuevo Cliente"
          @click="$emit('nuevo-cliente')"
          class="full-width"
        />
      </div>
    </div>

    <q-card class="clientes-card">
      <q-card-section class="q-pa-none">
        <q-list separator>
          <q-item
            v-for="cliente in filteredClientes"
            :key="cliente.id"
            clickable
            v-ripple
            @click="selectCliente(cliente)"
            :class="{ none: selectedClienteId === cliente.id }"
          >
            <q-item-section>
              <q-item-label class="text-weight-medium">
                {{ cliente.dni }}
              </q-item-label>
              <q-item-label caption> {{ cliente.nombre }} {{ cliente.apellidos }} </q-item-label>
              <q-item-label caption class="text-grey-6">
                {{ formatDate(cliente.created_at) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-badge
                :color="cliente.estado === 'activo' ? 'green' : 'red'"
                :label="cliente.estado"
              />
            </q-item-section>
          </q-item>

          <q-item v-if="filteredClientes.length === 0">
            <q-item-section>
              <q-item-label class="text-center text-grey-6">
                No se encontraron clientes
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <div class="q-mt-md text-caption text-grey-6 text-center">
      Total: {{ filteredClientes.length }} cliente(s)
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useClienteStore } from 'src/stores/useClienteStore'
import { storeToRefs } from 'pinia'
import { date } from 'quasar'

export default {
  name: 'ClientesList',
  emits: ['cliente-selected', 'nuevo-cliente'],
  setup(props, { emit }) {
    const clienteStore = useClienteStore()
    const { clientes } = storeToRefs(clienteStore)

    const searchText = ref('')
    const selectedClienteId = ref(null)

    // Clientes ordenados por fecha de creación (más recientes primero)
    const sortedClientes = computed(() => {
      return [...clientes.value].sort((a, b) => {
        const dateA = new Date(a.created_at || 0)
        const dateB = new Date(b.created_at || 0)
        return dateB - dateA
      })
    })

    // Filtrar clientes por búsqueda
    const filteredClientes = computed(() => {
      if (!searchText.value) {
        return sortedClientes.value
      }

      const search = searchText.value.toLowerCase()
      return sortedClientes.value.filter((cliente) => {
        const nombre = `${cliente.nombre || ''} ${cliente.apellidos || ''}`.toLowerCase()
        const dni = (cliente.dni || '').toLowerCase()
        return nombre.includes(search) || dni.includes(search)
      })
    })

    const selectCliente = (cliente) => {
      selectedClienteId.value = cliente.id
      emit('cliente-selected', cliente)
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Sin fecha'
      try {
        return date.formatDate(dateString, 'DD/MM/YYYY')
      } catch (error) {
        return 'Fecha inválida: ' + error
      }
    }

    // Auto-seleccionar el primer cliente cuando cambia la lista filtrada
    watch(
      filteredClientes,
      (newClientes) => {
        if (newClientes.length > 0 && !selectedClienteId.value) {
          selectCliente(newClientes[0])
        }
      },
      { immediate: true },
    )

    return {
      searchText,
      selectedClienteId,
      filteredClientes,
      selectCliente,
      formatDate,
    }
  },
}
</script>

<style scoped>
.clientes-list {
  height: 100%;
}

.clientes-card {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

.q-item {
  min-height: 60px;
}
</style>
