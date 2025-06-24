<template>
  <q-page class="q-pa-md">
    <q-toolbar class="bg-primary text-white q-mb-md rounded-borders">
      <q-toolbar-title>
        <q-icon name="people" class="q-mr-sm" />
        Gestión de Clientes
      </q-toolbar-title>
    </q-toolbar>

    <q-splitter
      v-model="splitterModel"
      :limits="[30, 70]"
      class="full-height"
      style="min-height: 80vh"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <ClientesList
            @cliente-selected="onClienteSelected"
            @nuevo-cliente="showCreateModal = true"
          />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <ClienteDetails
            :cliente="selectedCliente"
            @edit-cliente="onEditCliente"
            @delete-cliente="onDeleteCliente"
          />
        </div>
      </template>
    </q-splitter>

    <!-- Modal para crear/editar cliente -->
    <ClienteForm
      v-model="showCreateModal"
      :cliente="clienteToEdit"
      :is-edit="isEditMode"
      @cliente-saved="onClienteSaved"
      @close="onCloseModal"
    />
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useClienteStore } from 'src/stores/useClienteStore'
import { useQuasar } from 'quasar'
import ClientesList from 'src/components/home/clientes/ClientesList.vue'
import ClienteDetails from 'src/components/home/clientes/ClienteDetails.vue'
import ClienteForm from 'src/components/home/clientes/ClienteForm.vue'

export default {
  name: 'IndexPage',
  components: {
    ClientesList,
    ClienteDetails,
    ClienteForm,
  },
  setup() {
    const $q = useQuasar()
    const clienteStore = useClienteStore()

    const splitterModel = ref(35)
    const selectedCliente = ref(null)
    const showCreateModal = ref(false)
    const clienteToEdit = ref(null)
    const isEditMode = ref(false)

    const onClienteSelected = (cliente) => {
      selectedCliente.value = cliente
    }

    const onEditCliente = (cliente) => {
      clienteToEdit.value = { ...cliente }
      isEditMode.value = true
      showCreateModal.value = true
    }

    const onDeleteCliente = async (cliente) => {
      try {
        $q.dialog({
          title: 'Confirmar eliminación',
          message: `¿Está seguro de eliminar al cliente ${cliente.nombre} ${cliente.apellidos}?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await clienteStore.delete(cliente.id)

          $q.notify({
            type: 'positive',
            message: 'Cliente eliminado exitosamente',
            position: 'top-right',
          })

          if (selectedCliente.value?.id === cliente.id) {
            selectedCliente.value = null
          }

          await clienteStore.getAll()
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: `Error al eliminar cliente: ${error.message}`,
          position: 'top-right',
        })
      }
    }

    const onClienteSaved = async () => {
      await clienteStore.getAll()

      $q.notify({
        type: 'positive',
        message: isEditMode.value
          ? 'Cliente actualizado exitosamente'
          : 'Cliente creado exitosamente',
        position: 'top-right',
      })
    }

    const onCloseModal = () => {
      showCreateModal.value = false
      clienteToEdit.value = null
      isEditMode.value = false
    }

    onMounted(async () => {
      try {
        await clienteStore.getAll()
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Error al cargar clientes: ' + error.message,
          position: 'top-right',
        })
      }
    })

    return {
      splitterModel,
      selectedCliente,
      showCreateModal,
      clienteToEdit,
      isEditMode,
      onClienteSelected,
      onEditCliente,
      onDeleteCliente,
      onClienteSaved,
      onCloseModal,
    }
  },
}
</script>

<style scoped>
.full-height {
  height: calc(100vh - 150px);
}
</style>
