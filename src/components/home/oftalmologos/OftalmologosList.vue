<template>
  <div>
    <!-- Vista de tabla para desktop -->
    <div class="desktop-only">
      <q-table
        :rows="oftalmologos"
        :columns="columns"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        :rows-per-page-options="[10, 25, 50]"
        class="q-mt-md"
        flat
        bordered
      >
        <template v-slot:body-cell-estado="props">
          <q-td :props="props">
            <q-chip
              :color="props.value === 'activo' ? 'positive' : 'negative'"
              text-color="white"
              :label="props.value"
              size="sm"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn icon="edit" color="primary" flat round dense @click="$emit('edit', props.row)">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn
              icon="delete"
              color="negative"
              flat
              round
              dense
              @click="$emit('delete', props.row)"
              class="q-ml-xs"
            >
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
        </template>

        <template v-slot:no-data>
          <div class="full-width row flex-center text-grey-6 q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>No hay oftalmólogos registrados</span>
          </div>
        </template>
      </q-table>
    </div>

    <!-- Vista de cards para móvil -->
    <div class="mobile-only">
      <div v-if="loading" class="row justify-center q-mt-lg">
        <q-spinner color="primary" size="3em" />
      </div>

      <div v-else-if="oftalmologos.length === 0" class="text-center q-mt-lg">
        <q-icon name="sentiment_dissatisfied" size="3em" color="grey-6" />
        <div class="text-grey-6 q-mt-sm">No hay oftalmólogos registrados</div>
      </div>

      <div v-else class="row q-gutter-md">
        <div v-for="oftalmologo in oftalmologos" :key="oftalmologo.id" class="col-12">
          <OftalmologoCard
            :oftalmologo="oftalmologo"
            @edit="$emit('edit', oftalmologo)"
            @delete="$emit('delete', oftalmologo)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OftalmologoCard from './OftalmologoCard.vue'

// Props
defineProps({
  oftalmologos: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// Emits
defineEmits(['edit', 'delete', 'refresh'])

// Estados
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
})

// Columnas de la tabla
const columns = [
  {
    name: 'nombre',
    required: true,
    label: 'Nombre Completo',
    align: 'left',
    field: (row) => `${row.nombre} ${row.apellidos}`,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'dni',
    align: 'center',
    label: 'DNI',
    field: 'dni',
    sortable: true,
  },
  {
    name: 'cmp',
    align: 'center',
    label: 'CMP',
    field: 'cmp',
    sortable: true,
  },
  {
    name: 'rne',
    align: 'center',
    label: 'RNE',
    field: 'rne',
    sortable: true,
  },
  {
    name: 'telefono',
    align: 'center',
    label: 'Teléfono',
    field: 'telefono',
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    name: 'especialidad',
    align: 'left',
    label: 'Especialidad',
    field: 'especialidad',
    sortable: true,
  },
  {
    name: 'estado',
    align: 'center',
    label: 'Estado',
    field: 'estado',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones',
    field: 'actions',
  },
]
</script>

<style scoped>
.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

/* @media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
} */
</style>
