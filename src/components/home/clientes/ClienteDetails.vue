<template>
  <div class="cliente-details">
    <div v-if="!cliente" class="text-center q-pa-lg">
      <q-icon name="person" size="4rem" color="grey-4" />
      <div class="text-h6 text-grey-6 q-mt-md">Selecciona un cliente para ver su información</div>
    </div>

    <div v-else>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ cliente.nombre }} {{ cliente.apellidos }}
            <q-badge
              :color="cliente.estado === 'activo' ? 'green' : 'red'"
              :label="cliente.estado"
              class="q-ml-sm"
            />
          </div>
          <div class="text-subtitle2 text-grey-6">DNI: {{ cliente.dni }}</div>
        </q-card-section>

        <q-separator />

        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="info" label="Información" icon="person" />
          <q-tab name="pedidos" label="Pedidos" icon="shopping_cart" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="info" class="q-pa-none">
            <ClienteInfo
              :cliente="cliente"
              @edit-cliente="$emit('edit-cliente', cliente)"
              @delete-cliente="$emit('delete-cliente', cliente)"
            />
          </q-tab-panel>

          <q-tab-panel name="pedidos" class="q-pa-none">
            <ClientePedidos :cliente="cliente" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import ClienteInfo from './ClienteInfo.vue'
import ClientePedidos from './ClientePedidos.vue'

export default {
  name: 'ClienteDetails',
  components: {
    ClienteInfo,
    ClientePedidos,
  },
  props: {
    cliente: {
      type: Object,
      default: null,
    },
  },
  emits: ['edit-cliente', 'delete-cliente'],
  setup(props) {
    const activeTab = ref('info')

    // Reset tab when cliente changes
    watch(
      () => props.cliente,
      () => {
        activeTab.value = 'info'
      },
    )

    return {
      activeTab,
    }
  },
}
</script>

<style scoped>
.cliente-details {
  height: 100%;
}
</style>
